import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';
import * as reactDocgen from 'react-docgen-typescript';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── Конфигурация ────────────────────────────────────────────────────────────

const SOURCES: Array<{
    subdir: string;
    mode: 'component' | 'function' | 'styles';
    recursive?: boolean;
}> = [
    { subdir: 'ui', mode: 'component', recursive: true },
    { subdir: 'providers', mode: 'component' },
    { subdir: 'hooks', mode: 'function' },
    { subdir: 'utils', mode: 'function' },
    { subdir: 'styles', mode: 'styles', recursive: true },
];

// Кандидаты входного файла модуля, перебираются по порядку.
const ENTRY_FILE_CANDIDATES = ['src/index.tsx', 'src/index.ts', 'index.tsx', 'index.ts'];

// Папки внутри src/styles, которые не документируем (сторибук-истории и шрифтовые файлы).
const STYLES_EXCLUDED_DIRS = new Set(['story', 'fonts']);

// Типы возвращаемого значения, которые НЕ разворачиваем в таблицу свойств.
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

// Строки типов длиннее этого значения заменяются на `ReactNode` в таблице пропсов.
const COMPLEX_TYPE_MAX_LENGTH = 60;

// ── TypeScript program ────────────────────────────────────────────────────────
// Общий для всех файлов — переиспользует tsconfig проекта (с алиасами путей).

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

// ── Карта enum'ов ──────────────────────────────────────────────────────────────

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

// ── Типы пропсов компонента через TS checker ──────────────────────────────────
// react-docgen иногда схлопывает алиасы из других модулей до локального имени
// (например TMessageProviderProps → TProps). Берём точные строки напрямую
// из TypeScript type checker'а.

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

    // `forwardRef((props, ref) => ...)` — разворачиваем до внутренней render-функции,
    // чтобы читать её сигнатуру напрямую, а не тип ForwardRefExoticComponent
    // (его синтетическая call-сигнатура теряет valueDeclaration параметра).
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

                // Простой TypeReference (TMessageProviderProps, ReactNode) — берём текст
                // из синтаксического дерева, чтобы сохранить имя алиаса как в исходнике.
                // Остальное (шаблонные литералы, indexed access, юнионы…) — через checker,
                // который корректно разворачивает enum'ы и сложные типы.
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

// ── Markdown компонента (таблица пропсов) ─────────────────────────────────────

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

// ── Markdown функции (сигнатура + таблица возврата) ───────────────────────────

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

// ── Markdown стилей (CSS-переменные + SCSS-миксины) ───────────────────────────

function extractCssVariables(text: string): Array<{ name: string; value: string }> {
    const rootMatch = text.match(/:root\s*{([^}]*)}/);
    if (!rootMatch) return [];

    const result: Array<{ name: string; value: string }> = [];
    const re = /--([\w-]+)\s*:\s*([^;]+);/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(rootMatch[1]))) result.push({ name: m[1], value: m[2].trim() });
    return result;
}

function findMatchingBraceEnd(text: string, openBraceIndex: number): number {
    let depth = 0;
    for (let i = openBraceIndex; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') {
            depth--;
            if (depth === 0) return i;
        }
    }
    return text.length - 1;
}

function extractMixinBlocks(text: string): string[] {
    const results: string[] = [];
    const re = /@mixin\s+[\w-]+\s*(\([^)]*\))?\s*{/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(text))) {
        const openBraceIndex = match.index + match[0].length - 1;
        const endIndex = findMatchingBraceEnd(text, openBraceIndex);
        results.push(text.slice(match.index, endIndex + 1).trim());
        re.lastIndex = endIndex + 1;
    }
    return results;
}

function generateStylesMarkdown(name: string, entryFile: string): string {
    const text = fs.readFileSync(entryFile, 'utf-8');
    const variables = extractCssVariables(text);
    const mixins = extractMixinBlocks(text);
    if (!variables.length && !mixins.length) return '';

    const lines: string[] = [`# ${name}`, ''];

    if (variables.length) {
        lines.push('| Variable | Value |', '|---|---|');
        for (const v of variables) lines.push(`| \`--${v.name}\` | \`${v.value}\` |`);
        lines.push('');
    }

    for (const mixin of mixins) lines.push('```scss', mixin, '```', '');

    return lines.join('\n');
}

// ── Поиск модулей ──────────────────────────────────────────────────────────────

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

function findScssModuleDirs(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory() || STYLES_EXCLUDED_DIRS.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (fs.existsSync(path.join(full, '_index.scss'))) results.push(full);
        results.push(...findScssModuleDirs(full));
    }
    return results;
}

function findEntryFile(dir: string): string | null {
    for (const candidate of ENTRY_FILE_CANDIDATES) {
        const full = path.join(dir, candidate);
        if (fs.existsSync(full)) return full;
    }
    return null;
}

function categoryFor(dir: string, subdir: string): string {
    if (subdir === 'styles') return 'Styles';
    if (subdir !== 'ui') return subdir[0].toUpperCase() + subdir.slice(1);
    const uiDir = path.join(ROOT, 'src', 'ui');
    const group = path.relative(uiDir, dir).split(path.sep)[0];
    return `UI / ${group[0].toUpperCase() + group.slice(1)}`;
}

// ── Корневой индекс (llms.txt) ──────────────────────────────────────────────────

function generateRootIndex(entries: Array<{ category: string; name: string; relPath: string }>) {
    const byCategory = new Map<string, Array<{ name: string; relPath: string }>>();
    for (const { category, name, relPath } of entries) {
        if (!byCategory.has(category)) byCategory.set(category, []);
        byCategory.get(category)!.push({ name, relPath });
    }

    const lines: string[] = [
        '# @emingy/core',
        '',
        "> Personal UI-kit — context index for LLM agents. Each linked file documents one module's props/signature/variables. Run `pnpm llms:gen` to regenerate.",
        '',
    ];

    for (const [category, items] of [...byCategory.entries()].sort(([a], [b]) =>
        a.localeCompare(b)
    )) {
        lines.push(`## ${category}`, '');
        for (const { name, relPath } of items.sort((a, b) => a.name.localeCompare(b.name))) {
            lines.push(`- [${name}](${relPath})`);
        }
        lines.push('');
    }

    return lines.join('\n').trimEnd() + '\n';
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

type TModule = {
    dir: string;
    mode: 'component' | 'function' | 'styles';
    subdir: string;
    entryFile: string;
};

const modules: TModule[] = SOURCES.flatMap(({ subdir, mode, recursive }) => {
    const dir = path.join(srcDir, subdir);

    if (mode === 'styles') {
        return findScssModuleDirs(dir).map((d) => ({
            dir: d,
            mode,
            subdir,
            entryFile: path.join(d, '_index.scss'),
        }));
    }

    const dirs = recursive ? findStoryDirs(dir) : findModuleDirs(dir);
    return dirs
        .map((d) => ({ dir: d, mode, subdir, entryFile: findEntryFile(d) }))
        .filter((m): m is TModule => m.entryFile !== null);
});

let count = 0;
const stale: string[] = [];
const indexEntries: Array<{ category: string; name: string; relPath: string }> = [];

for (const { dir, mode, subdir, entryFile } of modules) {
    let raw = '';

    if (mode === 'component') {
        const docs = parser.parse(entryFile);
        const tsTypes = getComponentPropTypes(entryFile);
        const props = docs[0]?.props ?? {};
        raw = generatePropsMarkdown(path.basename(dir), props, enumMap, tsTypes);
    } else if (mode === 'function') {
        const sigs = extractFunctionSigs(entryFile);
        raw = generateFunctionMarkdown(path.basename(dir), sigs);
    } else {
        raw = generateStylesMarkdown(path.basename(dir), entryFile);
    }

    if (!raw) continue;

    // embeddedLanguageFormatting: 'off' — форматирование scss внутри код-блоков
    // резолвит css-парсер лениво и нестабильно между процессами, из-за чего --check
    // время от времени считает файл устаревшим без реальных изменений.
    const markdown = await format(raw, {
        parser: 'markdown',
        embeddedLanguageFormatting: 'off',
    });
    const out = path.join(dir, 'llms.md');
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

    indexEntries.push({
        category: categoryFor(dir, subdir),
        name: path.basename(dir),
        relPath: rel,
    });
    count++;
}

const rootIndex = generateRootIndex(indexEntries);
const rootOut = path.join(ROOT, 'llms.txt');

if (CHECK_MODE) {
    const existing = fs.existsSync(rootOut) ? fs.readFileSync(rootOut, 'utf-8') : null;
    if (existing !== rootIndex) {
        stale.push('llms.txt');
        console.error(`✗  llms.txt is outdated`);
    } else {
        console.log(`✓  llms.txt`);
    }
} else {
    fs.writeFileSync(rootOut, rootIndex, 'utf-8');
    console.log(`✓  llms.txt`);
}

if (CHECK_MODE) {
    if (stale.length > 0) {
        console.error(`\n${stale.length} file(s) outdated. Run "pnpm llms:gen" to update.`);
        process.exit(1);
    }
    console.log(`\nAll ${count} module file(s) + root index are up to date.`);
} else {
    console.log(`\n${count} module file(s) generated + root index.`);
}
