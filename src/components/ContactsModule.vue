//ContactsModule.vue
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import AddDeductButton from './ui/AddDeductButton.vue'
import AttachFamilyModal from './ui/AttachFamilyModal.vue'
import familiesData from '../assets/families.json'
import CreateFamilyModal from './ui/CreateFamilyModal.vue'
import { Member, Family } from '../assets/interfaces/interfaces'

interface IProps {
  newFamilyId: string,
  chosenFamilyId: string,
}

const props = defineProps<IProps>();

const families = ref<Family[]>(familiesData.families);
const newFamilyId = ref(props.newFamilyId);
const chosenFamilyId = ref(props.chosenFamilyId);

const isOpenAttachFamilyModal = ref(false);
const isOpenCreateFamilyModal = ref(false);
const isOpenEditFamilyModal = ref(false);

const attachFamily = ref<Family>({
  idFamily: '', members: []

})

function onClickAddFamilyButton(familyId: string) {
  isOpenAttachFamilyModal.value = true;
}

function onClickEditFamilyButton(familyId: string) {
  isOpenEditFamilyModal.value = true;
}

function onAttachFamily(updatedFamily: Family) {
  isOpenCreateFamilyModal.value = false;
  isOpenAttachFamilyModal.value = false;
  chosenFamilyId.value = updatedFamily.idFamily;
  attachFamily.value = updatedFamily
  console.log('Family attach', updatedFamily);
}

function onDeductFamily(idFamily: string) {
  isOpenCreateFamilyModal.value = false;
  isOpenAttachFamilyModal.value = false;
  console.log('Family deduct', idFamily);
}

function onViewContacts(memberId: string) {
  console.log('View contacts for member:', memberId);
}

function onCreateFamily(idFamily: string) {
  // console.log('Create family with id:', idFamily);
  isOpenCreateFamilyModal.value = true;
}

function onModalClose(typeModal: string) {
  if (typeModal === 'AttachFamilyModal') {
    isOpenAttachFamilyModal.value = false;
  }
  if (typeModal === 'CreateFamilyModal') {
    isOpenCreateFamilyModal.value = false;
  }
  if (typeModal === 'EditFamilyModal') {
    isOpenEditFamilyModal.value = false;
  }
}
</script>

<template>
  <div class="wrapper-buttons">
    <AddDeductButton @click="onClickAddFamilyButton" type='add' title="Прикрепить семью" :limit="1200"
      :loading="false" />
    <AddDeductButton @click="onClickEditFamilyButton" type='edit' title="Редактировать семью" :limit="1200"
      :loading="false" />
  </div>

  <AttachFamilyModal v-if="isOpenAttachFamilyModal" title="+ Добавить семью" :families="families"
    :newFamilyId="newFamilyId" @attachFamily="onAttachFamily" @viewContacts="onViewContacts"
    @createFamily="onCreateFamily" @modal-close="onModalClose('AttachFamilyModal')" />
  <CreateFamilyModal v-if="isOpenCreateFamilyModal" title="Новая семья" :families="families" :idFamily="newFamilyId"
    @attachFamily="onAttachFamily" @modal-close="onModalClose('CreateFamilyModal')" />
  <CreateFamilyModal v-if="isOpenEditFamilyModal" title="Редактирование семьи" :families="families"
    :idFamily="chosenFamilyId" @attachFamily="onAttachFamily" @deductFamily="onDeductFamily"
    @modal-close="onModalClose('EditFamilyModal')" />
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

.wrapper-buttons {
  display: flex;
  flex-direction: column;
  width: 171px;
  gap: 15px;
}
</style>