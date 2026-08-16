# Textarea

| Prop        | Type                                                  | Default  | Description                                                                                                                         |
| ----------- | ----------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`  | `((event: ChangeEvent<HTMLTextAreaElement>) => void)` | —        | —                                                                                                                                   |
| `value`     | `string`                                              | —        | —                                                                                                                                   |
| `maxLength` | `number`                                              | —        | Maximum number of characters. Also renders a "current/max" counter in the bottom-right corner of the field.                         |
| `disabled`  | `boolean`                                             | `false`  | Flag indicating the disabled state of the field. The field cannot receive input and has specific disabled styles.                   |
| `title`     | `string`                                              | —        | Title or label displayed above the textarea field. Recommended for accessibility (should be associated with the field's 'id').      |
| `prefix`    | `ReactNode`                                           | —        | Prefix (icon, text, or ReactNode) displayed before the textarea field.                                                              |
| `postfix`   | `ReactNode`                                           | —        | Postfix (icon, text, or ReactNode) displayed after the textarea field.                                                              |
| `error`     | `string`                                              | —        | Validation error message. Applies error-specific styling and is shown in a tooltip over the field (via 'FormErrorTooltipProvider'). |
| `resize`    | `"none" \| "vertical" \| "horizontal" \| "both"`      | `'none'` | Controls whether and in which direction the field can be resized by the user.                                                       |
| `minWidth`  | `string \| number`                                    | `100%`   | Minimum width of the field. A number is treated as pixels, a string is used as-is.                                                  |
| `maxWidth`  | `string \| number`                                    | `100%`   | Maximum width of the field. A number is treated as pixels, a string is used as-is.                                                  |
| `minHeight` | `string \| number`                                    | `100`    | Minimum height of the field. A number is treated as pixels, a string is used as-is.                                                 |
| `maxHeight` | `string \| number`                                    | `400`    | Maximum height of the field. A number is treated as pixels, a string is used as-is.                                                 |
| `validate`  | `((value: string) => boolean)`                        | —        | —                                                                                                                                   |
