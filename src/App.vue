<template>
  <div class="app">
    <div class="container">
      <h1>Система модальных окон</h1>

      <div class="button-group">
        <Button @click="openSimpleModal" label="Простое окно" />
        <Button @click="openScrollableModal" label="Со скроллом" type="secondary" />
        <Button @click="openTallModal" label="Высокое окно" type="secondary" />
        <Button @click="() => openNestedModal(1)" label="Вложенные окна" type="danger" />
      </div>

      <div class="content">
        <h2>Основной контент</h2>
        <p>Нажмите на кнопки выше, чтобы открыть модальные окна.</p>

        <div v-for="i in 10" :key="i" class="dummy-content">
          <p>Блок контента {{ i }}</p>
        </div>
      </div>
    </div>

    <ModalContainer />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { useModal } from './composables/useModal';
import Button from './components/Button.vue';
import ModalContainer from './components/ModalContainer.vue';

const { show, hide, hideAll } = useModal();

const openSimpleModal = () => {
  const modalId = show({
    title: 'Простое окно',
    content: h('div', [
      h('p', 'Это базовое модальное окно.'),
      h('p', 'Закрывается крестиком, кликом на фон или Esc.'),
    ]),
    footer: {
      buttons: [
        {
          label: 'Закрыть',
          type: 'secondary',
          onClick: () => hide(modalId),
        },
      ],
    },
  });
};

const openScrollableModal = () => {
  const longContent = h('div', [
    h('p', 'Окно с прокручиваемым содержимым.'),
    ...Array.from({ length: 20 }, (_, i) =>
        h('p', { style: 'margin: 12px 0;' }, `Строка ${i + 1}`)
    ),
  ]);

  const modalId = show({
    title: 'Прокручиваемое окно',
    content: longContent,
    scrollable: true,
    width: '500px',
    footer: {
      buttons: [
        {
          label: 'Закрыть',
          type: 'secondary',
          onClick: () => hide(modalId),
        },
      ],
    },
  });
};

const openTallModal = () => {
  const veryLongContent = h('div', [
    h('p', 'Высокое окно. Страница сзади скроллится.'),
    ...Array.from({ length: 30 }, (_, i) =>
        h('p', { style: 'margin: 10px 0;' }, `Блок ${i + 1}`)
    ),
  ]);

  const modalId = show({
    title: 'Высокое окно',
    content: veryLongContent,
    width: '500px',
    allowBackgroundScroll: true,
    footer: {
      buttons: [
        {
          label: 'Закрыть',
          type: 'secondary',
          onClick: () => hide(modalId),
        },
      ],
    },
  });
};

const openNestedModal = (number: number) => {
  const modalId = show({
    title: `Окно №${number}`,
    content: h('div', [
      h('p', `Это окно №${number}`),
      h('p', 'Можно открывать новые окна.'),
    ]),
    closeOnOutsideClick: false,
    width: '500px',
    footer: {
      buttons: [
        {
          label: 'Открыть ещё',
          type: 'primary',
          onClick: () => openNestedModal(number + 1),
        },
        {
          label: 'Закрыть',
          type: 'secondary',
          onClick: () => hide(modalId),
        },
        {
          label: 'Закрыть всё',
          type: 'danger',
          onClick: () => hideAll(),
        },
      ],
    },
  });
};
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.content h2 {
  color: #7f1a1a;
  margin-bottom: 16px;
}

.content p {
  color: #4b5563;
  margin-bottom: 20px;
}

.dummy-content {
  margin-top: 16px;
  padding: 12px;
  background: #fef2f2;
  border-radius: 8px;
  border-left: 3px solid #dc2626;
}

.dummy-content p {
  margin: 0;
  color: #4b5563;
}
</style>