//App.vue
<script setup lang="ts">
import { ref } from 'vue'
import AddDeductButton from './components/ui/AddDeductButton.vue'
import ContactsModule from './components/ContactsModule.vue'

const newFamilyId = ref('123456');
const chosenFamilyId = ref('654321');
const isAddButton = ref(true)
const isContactsModule = ref(false)
const isSettings = ref(false)

function onClickToContactsCard() {
  isContactsModule.value = true;
  isAddButton.value = false;
}
function onClickToSettings() {
  isSettings.value = true;
  isAddButton.value = false;
}
</script>

<template>
  <div class="wrapper" v-if="isAddButton">
    <AddDeductButton @click="onClickToContactsCard" type='add' title="Открыть Контакта Карточку" :limit="1200"
      :loading="false" />
  </div>
  <div class="wrapper" v-if="isAddButton">
    <AddDeductButton @click="onClickToSettings" type='add' title="Открыть Настройки Виджета" :limit="1200"
      :loading="false" />
  </div>
  <!-- <SettingsModule v-if="isSettings" :newFamilyId="newFamilyId" /> -->
  <ContactsModule v-if="isContactsModule" :newFamilyId="newFamilyId" :chosenFamilyId="chosenFamilyId" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  width: 188px;
  margin-bottom: 10px;
}
</style>
