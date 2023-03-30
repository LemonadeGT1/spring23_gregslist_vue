<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row my-3">
      <div class="col-12  g-5">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger fs-1">Add House
          🏠</button>
      </div>
    </div>
    <div class="row mt-3">
      <div v-for="houseFromVFor in houses" :key="houseFromVFor.id" class="col-12 col-md-4 mb-3">
        <HouseCard :house="houseFromVFor" />
      </div>
    </div>
  </div>
  <!-- NOTE - ModalComponent goes here -->
  <ModalComponent>
    <!-- NOTE slots this HouseForm inside the ModalComponent where I have my <slot> tag -->
    <HouseForm />
  </ModalComponent>
</template>


<script>
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
import { onMounted, computed } from "vue";
import ModalComponent from "../components/ModalComponent.vue";
import HouseCard from "../components/HouseCard.vue";
import HouseForm from "../components/HouseForm.vue";

export default {
  setup() {
    async function getHouses() {
      try {
        await housesService.getHouses();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getHouses();
    });
    return {
      houses: computed(() => AppState.houses),
      account: computed(() => AppState.account)
    };
  },
  components: { ModalComponent, HouseCard, HouseForm }
}
</script>


<style lang="scss" scoped></style>