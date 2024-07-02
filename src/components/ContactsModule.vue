//ContactsModule.vue
<template>
  <AddFamilyButton @click="onClickAddFamilyButton" title="+ Прикрепить семью" :limit="1200" :loading="false" />
  <AttachFamilyModal v-if="isOpenAttachFamilyModal" title="+ Добавить семью" :families="families"
    :newFamilyId="newFamilyId" @attachFamily="onAttachFamily" @viewContacts="onViewContacts"
    @createFamily="onCreateFamily" />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import AddFamilyButton from './ui/AddFamilyButton.vue'
import AttachFamilyModal from './ui/AttachFamilyModal.vue'
import familiesData from '../assets/families.json'

interface IProps {
  newFamilyId: string,
}

const props = defineProps<IProps>();
// const emit = defineEmits(['attachFamily', 'viewContacts', 'createFamily']);

const families = ref(familiesData.families);
const newFamilyId = ref(props.newFamilyId);
const isOpenAttachFamilyModal = ref(false);

function onClickAddFamilyButton(familyId: string) {
  isOpenAttachFamilyModal.value = true;
}

function onAttachFamily(familyId: string) {
  console.log('Family attached:', familyId);
  // логика для прикрепления семьи
}

function onViewContacts(memberId: string) {
  console.log('View contacts for member:', memberId);
  // логика для просмотра контактов члена семьи
}

function onCreateFamily(idFamily: string) {
  console.log('Create family with id:', idFamily);
  // логика для создания новой семьи
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
</style>