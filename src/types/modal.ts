import type { Component } from 'vue';

export interface ModalOptions {
    id?: string;
    title: string;
    content: string | Component;
    footer?: {
        buttons: ModalButton[];
    };
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    scrollable?: boolean;
    width?: string;
    maxWidth?: string;
    allowBackgroundScroll?: boolean;
}

export interface ModalButton {
    label: string;
    type?: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
    disabled?: boolean;
}

export interface ModalInstance {
    id: string;
    options: ModalOptions;
    isVisible: boolean;
}
