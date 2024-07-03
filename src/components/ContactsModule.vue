//ContactsModule.vue
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import AddDeductButton from './ui/AddDeductButton.vue'
import AttachFamilyModal from './ui/AttachFamilyModal.vue'
import familiesData from '../assets/families.json'
import CreateFamilyModal from './ui/CreateFamilyModal.vue'

interface IProps {
  newFamilyId: string,
}

const props = defineProps<IProps>();
// const emit = defineEmits(['attachFamily', 'viewContacts', 'createFamily']);

const families = ref(familiesData.families);
const newFamilyId = ref(props.newFamilyId);
const isOpenAttachFamilyModal = ref(false);
const isOpenCreateFamilyModal = ref(false);

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
  isOpenCreateFamilyModal.value = true;
}

function onModalClos(typeModal: string) {
  if (typeModal === 'CreateFamilyModal') {
    isOpenCreateFamilyModal.value = false;
  }
  if (typeModal === 'AttachFamilyModal') {
    isOpenAttachFamilyModal.value = false;
  }
}
</script>

<template>
  <AddDeductButton @click="onClickAddFamilyButton" type='add' title="Прикрепить семью" :limit="1200" :loading="false" />
  <AttachFamilyModal v-if="isOpenAttachFamilyModal" title="+ Добавить семью" :families="families"
    :newFamilyId="newFamilyId" @attachFamily="onAttachFamily" @viewContacts="onViewContacts"
    @createFamily="onCreateFamily" @modal-close="onModalClos('AttachFamilyModal')" />
  <CreateFamilyModal v-if="isOpenCreateFamilyModal" title="+ Добавить семью" :families="families"
    :newFamilyId="newFamilyId" @attachFamily="onAttachFamily" @modal-close="onModalClos('CreateFamilyModal')" />
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
</style>