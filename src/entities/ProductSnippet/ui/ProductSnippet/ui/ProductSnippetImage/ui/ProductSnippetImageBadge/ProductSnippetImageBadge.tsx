import classNames from '@/shared/lib/helpers/classNames';
import cls from './ProductSnippetImageBadge.module.scss';
import { Product } from '../../../../../../../Product/model/types/product';

export interface ProductSnippetImageBadgeProps {
    cost: NonNullable<Product['cost']>;
}

export const ProductSnippetImageBadge = (
    props: ProductSnippetImageBadgeProps,
) => {
    const {
        cost: {
            discount: { percent: discountPercent, forYou, isSuperPrice } = {},
            sale: { percent: salePercent } = {},
        },
    } = props;

    if (!discountPercent && !salePercent) return null;

    const badgeClassName = salePercent
        ? 'ds-badge_bgColor_badge-red-normal'
        : 'ds-badge_bgColor_badge-green-normal';

    return (
        <div className={cls.wrapper}>
            <div className={cls.container}>
                <div data-auto="discount-badge" data-zone-name="discount-badge">
                    <div
                        className={classNames(cls.badge, {}, [
                            'ds-badge',
                            badgeClassName,
                        ])}
                    >
                        <span className="ds-valueLine ds-valueLine_gap_1 ds-badge__textContent">
                            <span className={cls.text}>
                                {discountPercent || salePercent}
                            </span>
                            <span className={cls.textPercent}>%</span>
                        </span>
                        {forYou && <div className={cls.textUp}>ДЛЯ ВАС</div>}
                    </div>
                </div>
                {isSuperPrice && (
                    <div
                        data-auto="superPrice-badge"
                        data-zone-name="superPrice-badge"
                        className={classNames(cls.superPriceBadge, {}, [
                            'ds-badge',
                        ])}
                    >
                        <span className={cls.textUp}>ДЕШЕВЛЕ НЕТ</span>
                    </div>
                )}
            </div>
        </div>
    );
};
