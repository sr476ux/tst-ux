import { memo } from 'react';
import classNames from '@/shared/lib/helpers/classNames';

export interface DelimiterProps {
    className?: string;
    height: number;
}

export const Delimiter = memo((props: DelimiterProps) => {
    const { className, height } = props;
    return (
        <div style={{ height }} className={classNames('', {}, [className])} />
    );
});
