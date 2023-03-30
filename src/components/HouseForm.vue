<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create House</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>

  <form @submit.prevent="handleSubmit()">

    <div class="modal-body">

      <div class="mb-3">
        <label for="bedrooms" class="form-label">Bedrooms</label>
        <input v-model="editable.bedrooms" type="number" min="0" required class="form-control" id="bedrooms">
      </div>
      <div class="mb-3">
        <label for="bathrooms" class="form-label">Bathrooms</label>
        <input v-model="editable.bathrooms" type="number" min="0" required class="form-control" id="bathrooms">
      </div>
      <div class="mb-3">
        <label for="levels" class="form-label">Levels</label>
        <input v-model="editable.levels" type="number" min="1" required class="form-control" id="levels">
      </div>
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input v-model="editable.year" type="number" min="1000" required class="form-control" id="year">
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input v-model="editable.price" type="number" min="5" required class="form-control" id="price">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input v-model="editable.description" type="text" required class="form-control" id="description">
      </div>
      <div class="mb-3">
        <label for="imgUrl" class="form-label">ImgUrl</label>
        <input v-model="editable.imgUrl" type="url" required class="form-control" id="imgUrl">
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="Submit" class="btn btn-primary" data-bs-dismiss="modal">
        {{ house.id ? 'Edit House' : 'Create House' }}
      </button>
    </div>

  </form>
</template>

<script>
import { House } from "../models/House.js";
import { logger } from "../utils/Logger.js";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";

export default {
  props: {
    house: {
      type: House,
      default: {}
    }
  },
  setup(props) {
    const editable = ref({ ...props.house })
    const router = useRouter()
    return {
      editable,

      async createHouse() {
        try {
          logger.log('Create House from HouseForm')
          const houseData = editable.value
          const house = await housesService.createHouse(houseData)
          router.push({ name: 'HouseDetails', params: { houseId: house.id } })
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async editHouse() {
        try {
          logger.log('Edit House from HouseForm')
          const houseData = editable.value
          await housesService.editHouse(houseData)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      handleSubmit() {
        if (props.house.id) {
          this.editHouse()
        }
        else {
          this.createHouse()
        }
      }
    };
  },
};
</script>

<style></style>