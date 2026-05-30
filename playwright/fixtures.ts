import { test as base } from '@playwright/test';

import { AvatarComponent } from './components/avatar';
import { BadgeComponent } from './components/badge';
import { ButtonComponent } from './components/button';
import { CheckboxComponent } from './components/checkbox';
import { DividerComponent } from './components/divider';
import { FlexComponent } from './components/flex';
import { IconComponent } from './components/icon';
import { InputComponent } from './components/input';
import { LinkComponent } from './components/link';
import { MessageComponent } from './components/message';
import { OptionComponent } from './components/option';
import { RadioComponent } from './components/radio';
import { SpinnerComponent } from './components/spinner';
import { TagComponent } from './components/tag';
import { ToggleComponent } from './components/toggle';
import { ToggleButtonComponent } from './components/toggle-button';
import { TooltipComponent } from './components/tooltip';
import { TypographyComponent } from './components/typography';

type TFixtures = {
    Avatar: AvatarComponent;
    Badge: BadgeComponent;
    Button: ButtonComponent;
    Checkbox: CheckboxComponent;
    Divider: DividerComponent;
    Flex: FlexComponent;
    Icon: IconComponent;
    Input: InputComponent;
    Link: LinkComponent;
    Message: MessageComponent;
    Option: OptionComponent;
    Radio: RadioComponent;
    Spinner: SpinnerComponent;
    Tag: TagComponent;
    Toggle: ToggleComponent;
    ToggleButton: ToggleButtonComponent;
    Tooltip: TooltipComponent;
    Typography: TypographyComponent;
};

export const test = base.extend<TFixtures>({
    Avatar: async ({ page }, use) => {
        const avatar = new AvatarComponent(page);
        await avatar.navigate();
        await use(avatar);
    },
    Badge: async ({ page }, use) => {
        const badge = new BadgeComponent(page);
        await badge.navigate();
        await use(badge);
    },
    Button: async ({ page }, use) => {
        const button = new ButtonComponent(page);
        await button.navigate();
        await use(button);
    },
    Checkbox: async ({ page }, use) => {
        const checkbox = new CheckboxComponent(page);
        await checkbox.navigate();
        await use(checkbox);
    },
    Divider: async ({ page }, use) => {
        const divider = new DividerComponent(page);
        await divider.navigate();
        await use(divider);
    },
    Flex: async ({ page }, use) => {
        const flex = new FlexComponent(page);
        await flex.navigate();
        await use(flex);
    },
    Icon: async ({ page }, use) => {
        const icon = new IconComponent(page);
        await icon.navigate();
        await use(icon);
    },
    Input: async ({ page }, use) => {
        const input = new InputComponent(page);
        await input.navigate();
        await use(input);
    },
    Link: async ({ page }, use) => {
        const link = new LinkComponent(page);
        await link.navigate();
        await use(link);
    },
    Message: async ({ page }, use) => {
        const message = new MessageComponent(page);
        await message.navigate();
        await use(message);
    },
    Option: async ({ page }, use) => {
        const option = new OptionComponent(page);
        await option.navigate();
        await use(option);
    },
    Radio: async ({ page }, use) => {
        const radio = new RadioComponent(page);
        await radio.navigate();
        await use(radio);
    },
    Spinner: async ({ page }, use) => {
        const spinner = new SpinnerComponent(page);
        await spinner.navigate();
        await use(spinner);
    },
    Tag: async ({ page }, use) => {
        const tag = new TagComponent(page);
        await tag.navigate();
        await use(tag);
    },
    Toggle: async ({ page }, use) => {
        const toggle = new ToggleComponent(page);
        await toggle.navigate();
        await use(toggle);
    },
    ToggleButton: async ({ page }, use) => {
        const toggleButton = new ToggleButtonComponent(page);
        await toggleButton.navigate();
        await use(toggleButton);
    },
    Tooltip: async ({ page }, use) => {
        const tooltip = new TooltipComponent(page);
        await tooltip.navigate();
        await use(tooltip);
    },
    Typography: async ({ page }, use) => {
        const typography = new TypographyComponent(page);
        await typography.navigate();
        await use(typography);
    },
});

export { expect } from '@playwright/test';
