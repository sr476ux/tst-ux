import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Page } from './Page';
import StoreDecorator from '@/shared/config/storybook/StoreDecorator';
import RouterDecorator from '@/shared/config/storybook/RouterDecorator';
import StyledDecorator from '@/shared/config/storybook/StyledDecorator';

export default {
    title: 'widgets/Page/Page',
    component: Page,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({}),
        RouterDecorator,
        StyledDecorator({ minHeight: 300 }),
    ],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
