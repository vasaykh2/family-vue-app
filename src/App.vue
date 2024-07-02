//App.vue
<template>
  <div class="wrapper" v-if="isAddButton">
    <AddFamilyButton @click="onClickToContactsCard" title="Открыть Контакта Карточку" :limit="1200" :loading="false" />
  </div>
  <div class="wrapper" v-if="isAddButton">
    <AddFamilyButton @click="onClickToSettings" title="Открыть Настройки Виджета" :limit="1200" :loading="false" />
  </div>
  <SettingsModule v-if="isSettings" :newFamilyId="newFamilyId" />
  <ContactsModule v-if="isContactsModule" :newFamilyId="newFamilyId" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddFamilyButton from './components/ui/AddFamilyButton.vue'
import SettingsModule from './components/SettingsModule.vue'
import ContactsModule from './components/ContactsModule.vue'

const newFamilyId = ref('10');
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
