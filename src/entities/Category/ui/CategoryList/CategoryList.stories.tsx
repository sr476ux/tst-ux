import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CategoryList } from './CategoryList';
import RouterDecorator from '@/shared/config/storybook/RouterDecorator';

export default {
    title: 'entities/Category/CategoryList',
    component: CategoryList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [RouterDecorator],
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args) => (
    <CategoryList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    items: [
        {
            id: 'item1',
            title: 'item1',
            img: 'tests/assets/category-item.webp',
            href: 'about:blank',
        },
        {
            id: 'item2',
            title: 'item2',
            img: 'tests/assets/category-item.webp',
            href: 'about:blank',
        },
        {
            id: 'item3',
            title: 'item3',
            img: 'tests/assets/category-item.webp',
            href: 'about:blank',
        },
    ],
};
