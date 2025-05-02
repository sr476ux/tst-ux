import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CaruselList } from './CaruselList';
import RouterDecorator from '@/shared/config/storybook/RouterDecorator';

export default {
    title: 'entities/Carusel/CaruselList',
    component: CaruselList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [RouterDecorator],
} as ComponentMeta<typeof CaruselList>;

const Template: ComponentStory<typeof CaruselList> = (args) => (
    <CaruselList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    items: [
        {
            id: 'item1',
            title: 'item1',
            images: [],
            imgTest: 'tests/assets/carusel-item.webp',
            href: 'about:blank',
        },
        {
            id: 'item2',
            title: 'item2',
            images: [],
            imgTest: 'tests/assets/carusel-item.webp',
            href: 'about:blank',
        },
        {
            id: 'item3',
            title: 'item3',
            images: [],
            imgTest: 'tests/assets/carusel-item.webp',
            href: 'about:blank',
        },
    ],
};
