<template>
  <router-link :to="{ name: 'HouseDetails', params: { houseId: house.id } }">
    <div class="elevation-3 rounded bg-light border border-1 border-dark">
      <img :src="house.imgUrl" :title="house.description" class="img-fluid rounded-top">
      <div class="text-center p-3">
        <h3 class="fs-4">{{ 'Beds: ' + house.bedrooms + ' | Baths: ' + house.bathrooms + ' | Levels: ' + house.levels }}
        </h3>
      </div>
      <!-- NOTE only show these details if you're on the HouseDetails Page -->
      <div v-if="route.name == 'HouseDetails'" class="p-4">
        <div class="d-flex justify-content-around">
          <h2>Year Built: {{ house.year }}</h2>
          <h2>Price: ${{ house.price.toLocaleString() }}</h2>
        </div>
        <p class="fw-bold fs-3">{{ house.description }}</p>
        <div v-if="house.seller.id == account.id" class="d-flex justify-content-around">
          <button class="btn btn-danger" @click.stop="deleteHouse()">Delete House!</button>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info">🖊️ Edit House</button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    house: {
      type: House,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      account: computed(() => AppState.account),
      async deleteHouse() {
        try {
          if (await Pop.confirm()) {
            const houseId = props.house.id
            await housesService.deleteHouse(houseId)
            router.push({ name: "Houses" })
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>