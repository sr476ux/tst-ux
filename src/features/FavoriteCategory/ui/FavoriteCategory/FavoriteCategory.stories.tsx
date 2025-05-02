import { ComponentStory, ComponentMeta } from '@storybook/react';
import StoreDecorator from '@/shared/config/storybook/StoreDecorator';
import { FavoriteCategory } from './FavoriteCategory';
import { Category } from '@/entities/Category';

export default {
    title: 'features/FavoriteCategory/FavoriteCategory',
    component: FavoriteCategory,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof FavoriteCategory>;

const Template: ComponentStory<typeof FavoriteCategory> = (args) => (
    <FavoriteCategory {...args} />
);

const response: Category[] = [
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
];

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/favorite-category`,
            method: 'GET',
            status: 200,
            response,
        },
    ],
};

export const WithoutFavorite = Template.bind({});
WithoutFavorite.args = {};
WithoutFavorite.parameters = {
    mockData: [
        {
            url: `${__API__}/favorite-category`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};
