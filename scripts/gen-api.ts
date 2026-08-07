import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';
import * as reactDocgen from 'react-docgen-typescript';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── Config ────────────────────────────────────────────────────────────────────

const SOURCES: Array<{ subdir: string; mode: 'component' | 'function'; recursive?: boolean }> = [
    { subdir: 'ui', mode: 'component', recursive: true },
    { subdir: 'providers', mode: 'component' },
    { subdir: 'hooks', mode: 'function' },
    { subdir: 'utils', mode: 'function' },
];

// Candidates tried in order when resolving a module's entry file.
const ENTRY_FILE_CANDIDATES = ['src/index.tsx', 'src/index.ts', 'index.tsx', 'index.ts'];

// Return types that should NOT be expanded into a properties table.
const PRIMITIVE_RETURN_TYPES = new Set([
    'boolean',
    'string',
    'number',
    'bigint',
    'symbol',
    'void',
    'null',
    'undefined',
    'never',
    'any',
    'unknown',
]);

// Type strings longer than this are replaced with `ReactNode` in props tables.
const COMPLEX_TYPE_MAX_LENGTH = 60;

// ── TypeScript program factory ────────────────────────────────────────────────
// Shared across all files — reuses the project tsconfig (with path aliases).

const tsconfigPath = ts.findConfigFile(ROOT, ts.sys.fileExists, 'tsconfig.json')!;
const { config } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
const { options: tsOptions } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    path.dirname(tsconfigPath)
);

function createChecker(files: string[]) {
    const program = ts.createProgram(files, { ...tsOptions, skipLibCheck: true });
    return { program, checker: program.getTypeChecker() };
}

// ── Enum map ──────────────────────────────────────────────────────────────────

function buildEnumMap(sourceDir: string): Map<string, string> {
    const map = new Map<string, string>();
    const constantsFiles = findFiles(sourceDir, 'constants.ts');
    const { checker, program } = createChecker(constantsFiles);

    for (const sf of program.getSourceFiles()) {
        if (!constantsFiles.includes(sf.fileName)) continue;
        ts.forEachChild(sf, (node) => {
            if (!ts.isEnumDeclaration(node)) return;
            const enumName = node.name.text;
            for (const member of node.members) {
                const key = (member.name as ts.Identifier).text;
                const value = checker.getConstantValue(member);
                if (typeof value === 'string') map.set(`${enumName}.${key}`, `'${value}'`);
            }
        });
    }

    return map;
}

function findFiles(dir: string, filename: string): string[] {
    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...findFiles(full, filename));
        else if (entry.name === filename) results.push(full);
    }
    return results;
}

// ── Component prop types via TS checker ───────────────────────────────────────
// react-docgen sometimes collapses cross-module aliases to their local name
// (e.g. TMessageProviderProps → TProps). We get accurate strings directly from
// the TypeScript type checker.

function getComponentPropTypes(entryFile: string): Map<string, string> {
    const { checker, program } = createChecker([entryFile]);
    const source = program.getSourceFile(entryFile);
    if (!source) return new Map();

    const result = new Map<string, string>();

    const isExportedVar = (node: ts.Node): node is ts.VariableStatement =>
        ts.isVariableStatement(node) &&
        !!(
            ts.canHaveModifiers(node) &&
            ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
        );

    // `forwardRef((props, ref) => ...)` — unwrap to the inner render function so we
    // read its signature directly instead of the exported symbol's type
    // (ForwardRefExoticComponent, whose synthetic call signature loses the
    // parameter's valueDeclaration and breaks the lookups below).
    const findRenderFunctionNode = (
        decl: ts.VariableDeclaration
    ): ts.FunctionLikeDeclaration | undefined => {
        const init = decl.initializer;
        if (!init) return undefined;

        const isForwardRefCall =
            ts.isCallExpression(init) &&
            (ts.isIdentifier(init.expression)
                ? init.expression.text === 'forwardRef'
                : ts.isPropertyAccessExpression(init.expression) &&
                  init.expression.name.text === 'forwardRef');

        if (isForwardRefCall) {
            const renderFn = (init as ts.CallExpression).arguments[0];
            return ts.isArrowFunction(renderFn) || ts.isFunctionExpression(renderFn)
                ? renderFn
                : undefined;
        }

        return ts.isArrowFunction(init) || ts.isFunctionExpression(init) ? init : undefined;
    };

    ts.forEachChild(source, (node) => {
        if (!isExportedVar(node)) return;
        for (const decl of node.declarationList.declarations) {
            if (!ts.isIdentifier(decl.name)) continue;

            const renderFn = findRenderFunctionNode(decl);

            let propsParam: ts.Symbol | undefined;

            if (renderFn) {
                const renderSig = checker.getSignatureFromDeclaration(renderFn);
                propsParam = renderSig?.parameters[0];
            } else {
                const sym = checker.getSymbolAtLocation(decl.name);
                if (!sym) continue;
                const type = checker.getTypeOfSymbolAtLocation(sym, decl);
                const [sig] = type.getCallSignatures();
                propsParam = sig?.parameters[0];
            }

            if (!propsParam || !propsParam.valueDeclaration) continue;
            const propsType = checker.getTypeOfSymbolAtLocation(
                propsParam,
                propsParam.valueDeclaration
            );

            for (const prop of propsType.getProperties()) {
                if (!prop.valueDeclaration) continue;
                const decl = prop.valueDeclaration;
                const typeNode =
                    ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)
                        ? decl.type
                        : undefined;

                // Simple TypeReference (e.g. TMessageProviderProps, ReactNode) — read from
                // syntax tree to preserve the alias name as written in source.
                // Everything else (template literals, indexed access, unions…) — use
                // the type checker which properly expands enums and resolves complex types.
                const typeStr =
                    typeNode && ts.isTypeReferenceNode(typeNode)
                        ? typeNode.typeName.getText()
                        : checker.typeToString(
                              checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration)
                          );

                const isOptional = !!(prop.flags & ts.SymbolFlags.Optional);
                result.set(
                    prop.name,
                    isOptional ? typeStr.replace(/\s*\|\s*undefined$/, '') : typeStr
                );
            }
        }
    });

    return result;
}

// ── Component markdown (props table) ─────────────────────────────────────────

function formatDefault(prop: reactDocgen.PropItem, enumMap: Map<string, string>): string {
    const raw = prop.defaultValue?.value;
    if (!raw) return '—';
    return `\`${enumMap.get(raw) ?? raw}\``;
}

function formatDescription(desc: string): string {
    return (
        desc
            .replace(/@description\s*/g, '')
            .replace(/@example\s+/g, 'e.g. ')
            .replace(/@default\s+\S+/g, '')
            .replace(/\n/g, ' ')
            .trim() || '—'
    );
}

function generatePropsMarkdown(
    name: string,
    props: reactDocgen.Props,
    enumMap: Map<string, string>,
    tsTypes: Map<string, string>
): string {
    const rows = Object.entries(props).map(([propName, prop]) => {
        const tsType = tsTypes.get(propName);
        const type = tsType
            ? `\`${tsType.replace(/\|/g, '\\|')}\``
            : prop.type.name === 'enum' && Array.isArray(prop.type.value)
              ? prop.type.value.map((v: { value: string }) => v.value).join(' \\| ')
              : `\`${prop.type.name.length > COMPLEX_TYPE_MAX_LENGTH ? 'ReactNode' : prop.type.name.replace(/\|/g, '\\|').trim()}\``;
        const def = formatDefault(prop, enumMap);
        const desc = formatDescription(prop.description);
        return `| \`${propName}\` | ${type} | ${def} | ${desc} |`;
    });

    const header = [`# ${name}`, ''];

    if (!rows.length) return [...header, '_No props._', ''].join('\n');

    return [
        ...header,
        '| Prop | Type | Default | Description |',
        '|---|---|---|---|',
        ...rows,
        '',
    ].join('\n');
}

// ── Function markdown (signature + return table) ──────────────────────────────

type TFunctionSig = {
    name: string;
    params: Array<{ name: string; type: string; optional: boolean }>;
    returnProps: Array<{ name: string; type: string }> | null;
    returnType: string;
};

function extractFunctionSigs(entryFile: string): TFunctionSig[] {
    const { checker, program } = createChecker([entryFile]);
    const source = program.getSourceFile(entryFile);
    if (!source) return [];

    const results: TFunctionSig[] = [];

    const isExported = (node: ts.Node) =>
        ts.canHaveModifiers(node) &&
        ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

    const processSig = (fnName: string, nameNode: ts.Node, declNode: ts.Node) => {
        const sym = checker.getSymbolAtLocation(nameNode);
        if (!sym) return;
        const type = checker.getTypeOfSymbolAtLocation(sym, declNode);
        const [sig] = type.getCallSignatures();
        if (!sig) return;

        const params = sig.parameters.map((p) => ({
            name: p.name,
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration!)),
            optional: !!(p.flags & ts.SymbolFlags.Optional),
        }));

        const returnType = sig.getReturnType();
        const returnTypeStr = checker.typeToString(returnType);

        // Expand return type if it's a plain object with named properties
        const returnProps = (() => {
            const props = returnType.getProperties();
            if (!props.length) return null;
            if (
                PRIMITIVE_RETURN_TYPES.has(returnTypeStr) ||
                returnTypeStr.startsWith('Promise<') ||
                returnTypeStr.endsWith('[]')
            )
                return null;
            return props
                .filter((p) => p.valueDeclaration)
                .map((p) => ({
                    name: p.name,
                    type: checker.typeToString(
                        checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration!)
                    ),
                }));
        })();

        results.push({ name: fnName, params, returnProps, returnType: returnTypeStr });
    };

    ts.forEachChild(source, (node) => {
        if (ts.isVariableStatement(node) && isExported(node)) {
            for (const decl of node.declarationList.declarations) {
                if (ts.isIdentifier(decl.name)) processSig(decl.name.text, decl.name, decl);
            }
        } else if (ts.isFunctionDeclaration(node) && isExported(node) && node.name) {
            processSig(node.name.text, node.name, node);
        }
    });

    return results;
}

function generateFunctionMarkdown(name: string, sigs: TFunctionSig[]): string {
    if (!sigs.length) return '';

    const lines: string[] = [`# ${name}`, ''];

    for (const sig of sigs) {
        const paramStr = sig.params
            .map((p) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`)
            .join(', ');
        lines.push('```ts', `${sig.name}(${paramStr}): ${sig.returnType}`, '```', '');

        if (sig.params.length) {
            lines.push('| Parameter | Type |', '|---|---|');
            for (const p of sig.params) {
                lines.push(
                    `| \`${p.name}${p.optional ? '?' : ''}\` | \`${p.type.replace(/\|/g, '\\|')}\` |`
                );
            }
            lines.push('');
        }

        if (sig.returnProps) {
            lines.push('**Returns**', '', '| Property | Type |', '|---|---|');
            for (const p of sig.returnProps) {
                lines.push(`| \`${p.name}\` | \`${p.type.replace(/\|/g, '\\|')}\` |`);
            }
            lines.push('');
        }
    }

    return lines.join('\n');
}

// ── Discovery ─────────────────────────────────────────────────────────────────

function findStoryDirs(dir: string): string[] {
    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...findStoryDirs(full));
        else if (entry.name === 'index.stories.tsx') results.push(path.dirname(full));
    }
    return results;
}

function findModuleDirs(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => path.join(dir, e.name));
}

function findEntryFile(dir: string): string | null {
    for (const candidate of ENTRY_FILE_CANDIDATES) {
        const full = path.join(dir, candidate);
        if (fs.existsSync(full)) return full;
    }
    return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const CHECK_MODE = process.argv.includes('--check');

const parser = reactDocgen.withCustomConfig(tsconfigPath, {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => !prop.parent?.fileName.includes('node_modules'),
});

const srcDir = path.join(ROOT, 'src');
const enumMap = buildEnumMap(srcDir);

type TModule = { dir: string; mode: 'component' | 'function' };

const modules: TModule[] = SOURCES.flatMap(({ subdir, mode, recursive }) => {
    const dir = path.join(srcDir, subdir);
    const dirs = recursive ? findStoryDirs(dir) : findModuleDirs(dir);
    return dirs.map((d) => ({ dir: d, mode }));
});

let count = 0;
const stale: string[] = [];

for (const { dir, mode } of modules) {
    const entryFile = findEntryFile(dir);
    if (!entryFile) continue;

    let raw = '';

    if (mode === 'component') {
        const docs = parser.parse(entryFile);
        const tsTypes = getComponentPropTypes(entryFile);
        const props = docs[0]?.props ?? {};
        raw = generatePropsMarkdown(path.basename(dir), props, enumMap, tsTypes);
    } else {
        const sigs = extractFunctionSigs(entryFile);
        raw = generateFunctionMarkdown(path.basename(dir), sigs);
    }

    if (!raw) continue;

    const markdown = await format(raw, { parser: 'markdown' });
    const out = path.join(dir, 'api.md');
    const rel = path.relative(ROOT, out);

    if (CHECK_MODE) {
        const existing = fs.existsSync(out) ? fs.readFileSync(out, 'utf-8') : null;
        if (existing !== markdown) {
            stale.push(rel);
            console.error(`✗  ${rel} is outdated`);
        } else {
            console.log(`✓  ${rel}`);
        }
    } else {
        fs.writeFileSync(out, markdown, 'utf-8');
        console.log(`✓  ${rel}`);
    }

    count++;
}

if (CHECK_MODE) {
    if (stale.length > 0) {
        console.error(`\n${stale.length} file(s) outdated. Run "pnpm api:gen" to update.`);
        process.exit(1);
    }
    console.log(`\nAll ${count} API files are up to date.`);
} else {
    console.log(`\n${count} files generated.`);
}
