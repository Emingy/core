# Dropdown

| Prop           | Type                                                                     | Default                | Description |
| -------------- | ------------------------------------------------------------------------ | ---------------------- | ----------- |
| `className`    | `string`                                                                 | —                      | —           |
| `direction`    | `"top" \| "bottom" \| "left" \| "right"`                                 | `'bottom'`             | —           |
| `triggerMode`  | `("click" \| "hover")[]`                                                 | `[ETriggerMode.Click]` | —           |
| `containerRef` | `RefObject`                                                              | —                      | —           |
| `maxHeight`    | `MaxHeight<string \| number>`                                            | —                      | —           |
| `widthMode`    | `"content" \| "trigger"`                                                 | `'trigger'`            | —           |
| `width`        | `Width<string \| number>`                                                | —                      | —           |
| `content`      | `ReactNode \| ((panelRef: RefObject<HTMLElement \| null>) => ReactNode)` | —                      | —           |
| `isOpen`       | `boolean`                                                                | —                      | —           |
| `onOpenChange` | `((isOpen: boolean) => void)`                                            | —                      | —           |
