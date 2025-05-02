import { lazy, Suspense } from 'react';
import { FavoriteCategoryProps } from './FavoriteCategory';
import { FavoriteCategoryLoader } from '../FavoriteCategoryLoader/FavoriteCategoryLoader';

const FavoriteCategoryLazy = lazy(() =>
    import('./FavoriteCategory').then((module) => ({
        default: module.FavoriteCategory,
    })),
);

export const FavoriteCategoryAsync = (props: FavoriteCategoryProps) => {
    return (
        <Suspense fallback={<FavoriteCategoryLoader />}>
            <FavoriteCategoryLazy {...props} />
        </Suspense>
    );
};
