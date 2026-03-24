<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import type { ModalOptions } from '../types/modal';
import Button from './Button.vue';

interface Props {
  isVisible: boolean;
  options: ModalOptions;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const modalRef = ref<HTMLElement | null>(null);

const handleClose = () => {
  emit('close');
};

const handleOutsideClick = () => {
  if (props.options.closeOnOutsideClick !== false) {
    handleClose();
  }
};

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.options.closeOnEscape !== false) {
    handleClose();
  }
};

watch(
    () => props.isVisible,
    (visible) => {
      if (visible) {
        nextTick(() => {
          modalRef.value?.focus();
        });
      }
    }
);

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <div
        v-if="isVisible"
        class="modal-overlay"
        @click.self="handleOutsideClick"
    >
      <div
          ref="modalRef"
          class="modal"
          tabindex="-1"
          :style="{
          width: options.width || '500px',
          maxWidth: options.maxWidth || '90vw',
        }"
      >
        <div class="modal-header">
          <h3 class="modal-title">{{ options.title }}</h3>
          <button class="modal-close" @click="handleClose">×</button>
        </div>

        <div
            class="modal-body"
            :class="{ 'modal-body-scrollable': options.scrollable }"
        >
          <slot name="content" :close="handleClose"></slot>
        </div>

        <div v-if="options.footer?.buttons?.length" class="modal-footer">
          <Button
              v-for="(button, index) in options.footer.buttons"
              :key="index"
              :label="button.label"
              :type="button.type || 'secondary'"
              :disabled="button.disabled"
              @click="button.onClick"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped src="src/style/Modal.css"></style>