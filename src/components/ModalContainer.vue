<template>
  <Modal
      v-for="modal in visibleModals"
      :key="modal.id"
      :is-visible="modal.isVisible"
      :options="modal.options"
      @close="handleClose(modal.id)"
  >
    <template #content="{ close }">
      <component
          :is="modal.options.content"
          v-if="typeof modal.options.content !== 'string'"
          :close="close"
      />
      <div v-else>{{ modal.options.content }}</div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModal } from '../composables/useModal';
import Modal from './Modal.vue';

const { modals, hide } = useModal();

const visibleModals = computed(() =>
    modals.value.filter(modal => modal.isVisible)
);

const handleClose = (id: string) => {
  hide(id);
};
</script>