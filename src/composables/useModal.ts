import { ref } from 'vue';
import type { ModalOptions, ModalInstance } from '../types/modal';

const modals = ref<ModalInstance[]>([]);
let idCounter = 0;

function generateId(): string {
    idCounter++;
    return `modal-${idCounter}`;
}

export function useModal() {

    const show = (options: ModalOptions): string => {
        const id = options.id || generateId();


        const current = modals.value.find(m => m.isVisible);
        if (current) {
            current.isVisible = false;
        }

        modals.value.push({
            id,
            options,
            isVisible: true,
        });

        if (!options.allowBackgroundScroll) {
            document.body.style.overflow = 'hidden';
        }

        return id;
    };

    const hide = (id: string) => {
        const index = modals.value.findIndex(m => m.id === id);
        if (index === -1) return;

        modals.value.splice(index, 1);


        const last = modals.value[modals.value.length - 1];
        if (last) {
            last.isVisible = true;
        }

        if (modals.value.length === 0) {
            document.body.style.overflow = '';
        }
    };

    const hideAll = () => {
        modals.value = [];
        document.body.style.overflow = '';
    };

    return {
        modals,
        show,
        hide,
        hideAll,
    };
}