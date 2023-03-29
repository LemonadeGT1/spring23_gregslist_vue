<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div v-if="house" class="col-10 m-auto">
        <!-- NOTE reuseable components! -->
        <HouseCard :house="house" />
      </div>
    </div>
  </div>
  <ModalComponent v-if="house">
    <HouseForm :house="house" />
  </ModalComponent>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import HouseCard from '../components/HouseCard.vue';
import HouseForm from '../components/HouseForm.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    return {
      house: computed(() => AppState.house)
    };
    components: { HouseCard, ModalComponent, HouseForm }
  },
};
</script>

<style></style>