import { MouseEvent, ReactNode, useCallback } from 'react';
import { Portal } from '../Portal';
import { useModal, useTheme } from '@/shared/lib/hooks';
import classNames, { Mods } from '@/shared/lib/helpers/classNames';
import cls from './Modal.module.scss';
import { ModalContent } from './Modal.Content';
import { ModalOverlay } from './Modal.Overlay';

export interface ModalProps {
    className?: string;
    exclusive?: boolean;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    onContentClickDisableClose?: boolean;
    lazy?: boolean;
}

const ANIMATION_DELAY = 180;

const portalElement = document.getElementById('app') ?? document.body;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
        exclusive,
        onContentClickDisableClose,
    } = props;

    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });

    const { theme } = useTheme();

    const onClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            const target = e.target as HTMLDivElement;
            if (target.dataset?.modalRole === 'close-on-click') {
                if (!onContentClickDisableClose) close();
            }
        },
        [close, onContentClickDisableClose],
    );

    if (lazy && !isMounted) {
        return null;
    }

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        modalExclusive: exclusive,
    };

    return (
        <Portal element={portalElement}>
            <div
                className={classNames('', mods, [className, theme])}
                onClick={onClick}
            >
                {children}
            </div>
        </Portal>
    );
};
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
