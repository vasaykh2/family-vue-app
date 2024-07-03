//AddDeductButton.vue
<script setup lang="ts">
import { ref, watch, defineEmits, defineProps, withDefaults } from 'vue'
import spinner from '@/assets/images/Spinner.svg'

interface IProps {
  type: 'add' | 'deduct' | 'text',
  title: string,
  // subtitle: string,
  limit: number,
  loading: boolean
}

const emit = defineEmits(['click'])
const props = withDefaults(defineProps<IProps>(), {
  title: 'Прикрепить',
  // subtitle: '+'
})
const isLimit = ref(props.limit > 0)
const isLoading = ref(props.loading)
const type = ref(props.type)

watch(() => props.limit, (newVal) => {
  isLimit.value = newVal > 0
})

watch(() => props.loading, (newVal) => {
  isLoading.value = newVal
})

function handleClick() {
  if (isLimit.value && !isLoading.value) {
    emit('click')
  }
}
</script>

<template>
  <div v-if="type === 'add'" class="button-add" :class="isLimit ? '' : 'limited'" @click="handleClick">
    <div class="loader" v-if="isLoading"><img :src="spinner" alt="" /></div>
    <span class="button-add-inner-subtitle">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_31820_69)">
          <path d="M1.875 6H10.125" stroke="#366AF3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 1.875V10.125" stroke="#366AF3" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_31820_69">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
    <span class="button-add-inner-title">{{ title }}</span>
  </div>
  <div v-if="type === 'deduct'" class="button-deduct" :class="isLimit ? '' : 'limited'" @click="handleClick">
    <div class="loader" v-if="isLoading"><img :src="spinner" alt="" /></div>
    <span class="button-deduct-inner-subtitle">
      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_31502_83405)">
          <path d="M1.875 6.5H10.125" stroke="#FF8484" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_31502_83405">
            <rect width="12" height="12" fill="white" transform="translate(0 0.5)" />
          </clipPath>
        </defs>
      </svg>
    </span>
    <span class="button-deduct-inner-title">{{ title }}</span>
  </div>
  <div v-if="type === 'text'" class="button-text" :class="isLimit ? '' : 'limited'" @click="handleClick">
    <div class="loader" v-if="isLoading"><img :src="spinner" alt="" /></div>
    <span class="button-text-inner-title">{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
.button-add {
  padding: 6px;
  background-color: #E9F4FF;
  border-radius: 12px;
  color: #366AF3;
  font-size: 13px;
  font-family: 'PT Sans', sans-serif;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: relative;
  max-width: 255px;
  height: 25px;
  box-sizing: border-box;

  .button-add-inner-subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    color: #FF8484;
    padding: 0;
  }

  .button-add-inner-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:hover {
    .button-add-limit {
      display: block;
    }
  }

  .button-add-limit {
    display: none;
    color: #366AF3;
    background-color: #E9F4FF;
    padding: 8px;
    border-radius: 12px;
    position: absolute;
    left: calc(100% + 5px);
    top: 0;
    z-index: 999;

    &::before {
      width: 0;
      height: 0;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-right: 3px solid #2f2f2f;
      font-size: 0;
      line-height: 0;
      float: left;
      content: '';
      position: absolute;
      left: -3px;
      top: calc(50% - 3px);
    }
  }

  .loader {
    img {
      -webkit-animation: spin 4s infinite linear;
      animation: spin 4s infinite linear;
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }
}

.button-deduct {
  padding: 6px;
  background-color: #EBEBEB;
  border-radius: 12px;
  color: #000;
  font-size: 13px;
  font-family: 'PT Sans', sans-serif;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: relative;
  max-width: 255px;
  height: 25px;
  box-sizing: border-box;

  .button-deduct-inner-subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    color: #FF8484;
    padding: 0;
  }

  .button-deduct-inner-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:hover {
    .button-deduct-limit {
      display: block;
    }
  }

  .button-deduct-limit {
    display: none;
    color: #366AF3;
    background-color: #E9F4FF;
    padding: 8px;
    border-radius: 12px;
    position: absolute;
    left: calc(100% + 5px);
    top: 0;
    z-index: 999;

    &::before {
      width: 0;
      height: 0;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-right: 3px solid #2f2f2f;
      font-size: 0;
      line-height: 0;
      float: left;
      content: '';
      position: absolute;
      left: -3px;
      top: calc(50% - 3px);
    }
  }

  .loader {
    img {
      -webkit-animation: spin 4s infinite linear;
      animation: spin 4s infinite linear;
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>
