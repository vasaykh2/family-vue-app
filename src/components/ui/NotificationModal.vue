//NotificationModal.vue
<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref } from 'vue';

interface IProps {
  type: 'attach' | 'deduct',
  role: string;
  title: string;
  name: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'attach',
  title: 'Новый контакт',
  role: 'Ребёнок',
  name: 'Иван Иванов',
});
const emit = defineEmits(['handle-act', 'notification-close']);
const inputValue = ref(props.name);
const name = ref(props.name.split("FROM DEDUCT ON EDIT MODAL")[0]);

function handleInput(event: any) {
  // console.log('event.target.value', event.target.value)
  inputValue.value = event.target.value;
}

function handleAct() {
  // console.log('NotificationModal', inputValue.value)
  if (inputValue.value.length) {
    const message = { type: props.type, role: props.role, inputValue: inputValue.value }
    // console.log('in NotificationModal message:', message)
    emit('handle-act', message)
  }
}

function closeModal(e: any) {
  e.stopPropagation();
  const closeButton = e.target.closest('[data-close="true"]');
  const pushCloseButton = e.target.closest('[data-push-close="true"]');
  if (pushCloseButton || closeButton || e.target === e.currentTarget) {
    emit('notification-close');
  }
}
</script>

<template>
  <div id="notification-modal" class="modal-overlay" @click="closeModal">
    <div class="modal-content">
      <div class="title-wrapper">
        <div>
          <h1 class="title">{{ title }}</h1>
        </div>
        <div id="close-modal-button" class="close-modal-container" data-close="true" @mousedown="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#A0ADBD" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div v-if="props.type === 'attach'" class="text-wrapper">
        <p class="text">
          Будет создан новый контакт с установленной ролью:
          <span>{{ props.role === 'Ребёнок' ? '«Ребёнок»' : '«Родитель»' }}</span>
        </p>
      </div>
      <div v-if="props.type === 'deduct'" class="text-wrapper">
        <p class="text">
          Вы уверены, что хотите открепить контакт <span>{{ name }}</span> от семьи?
        </p>
      </div>
      <div v-if="props.type === 'attach'" class="wrapper-search-wrapper">
        <div class="search-wrapper">
          <div class="search-input" :class="inputValue.length > 0 ? '' : 'red'">
            <input type="text" :value="inputValue" @input="handleInput" name="member-search"
              placeholder="Имя Фамилия" />
          </div>
        </div>
        <span v-if="!(inputValue.length > 0)" class="error">Введите значение</span>
      </div>
      <div v-if="props.type === 'attach'" class="wrapper-attach-family">
        <button id="attach-family" class="attach-family" @click="handleAct">
          <span>Создать</span>
        </button>
      </div>
      <div v-if="props.type === 'deduct'" class="wrapper-deduct-family">
        <button id="no-deduct-family" class="no-deduct-family" data-push-close="true" @click="closeModal">
          <span>Нет</span>
        </button>
        <button id="yes-deduct-family" class="yes-deduct-family" @click="handleAct">
          <span>Да</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(242, 242, 242, 0.7);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.close-modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  cursor: pointer;
  z-index: 1
}

.modal-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  gap: 24px;
  box-sizing: border-box;
}

.title-wrapper {
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    font-family: 'PT Sans', sans-serif;
    color: #000;
    margin: 0;
  }
}

.text-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 40px;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  font-family: 'PT Sans', sans-serif;
  color: #000;
  margin: 0;

  .text {
    text-align: start;
    margin: 0;

    span {
      font-size: 15px;
      font-weight: 700;
      line-height: 20px;
      padding-left: 0px;
    }
  }
}

.wrapper-search-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-starts;

  .error {
    font-family: 'PT Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: #FF8484;
    text-align: start;
    padding-top: 3px;
  }
}

.search-wrapper {
  display: flex;
}

.search-input {
  display: flex;
  justify-content: flex-starts;
  width: 413px;
  height: 36px;
  padding: 8px 12px 8px 10px;
  font-family: 'PT Sans', sans-serif;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #F5F5F5;
  border: none;
  margin-right: 12px;
}

.search-input.red {
  border: 1px solid #FF8484;
}

.search-input input {
  width: 100%;
  border: none;
  background-color: transparent;
  padding-left: 10px;
  appearance: none;
  box-shadow: none;
  color: #A6AAB5;

  &:focus {
    border: none;
    outline: none;
    outline: none;
    background-color: transparent;
  }

  &:not(:placeholder-shown) {
    border: none;
    background-color: transparent;
    color: #000;
  }
}

.wrapper-attach-family {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  .attach-family {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #366AF3;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    width: 100%;
    height: 36px;
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    font-family: 'PT Sans', sans-serif;
    padding: 8px 24px;
    gap: 6px;

    span {
      padding-left: 0px;
    }
  }

  .attach-family:hover {
    background-color: #0069d9;
  }

  .attach-family.deduct {
    background-color: #EBEBEB;
    color: #000;

  }

  .attach-family.deduct:hover {
    background-color: #E5E5E5;
  }
}

.wrapper-deduct-family {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;

  .no-deduct-family {
    width: 130px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EBEBEB;
    border-radius: 3px;
    border: none;

    span {
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      font-family: 'PT Sans', sans-serif;
      color: #000;
      padding: 0;
    }
  }

  .yes-deduct-family {
    width: 130px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #366AF3;
    border-radius: 3px;
    border: none;

    span {
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      font-family: 'PT Sans', sans-serif;
      color: #fff;
      padding: 0;
    }
  }
}
</style>
