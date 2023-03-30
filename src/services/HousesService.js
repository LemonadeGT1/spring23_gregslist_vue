import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class HousesService {
  async getHouses() {
    const res = await api.get('auth/api/houses')
    logger.log('<]Getting Houses[>', res.data)
    AppState.houses = res.data.map(h => new House(h))
  }

  async getHouseById(houseId) {
    AppState.house = null
    const res = await api.get(`auth/api/houses/` + houseId)
    logger.log('<]Getting House[>')
    AppState.house = new House(res.data)
  }

  async createHouse(houseData) {
    const res = await api.post('auth/api/houses', houseData)
    logger.log('createHouse on HousesService', res.data)
    const newHouse = new House(res.data)
    AppState.houses.push(newHouse)
    return newHouse
  }

  async editHouse(houseData) {
    const res = await api.put('auth/api/houses/' + houseData.id, houseData)
    logger.log('Edit House: ', res.data)
    AppState.house = new House(res.data)
  }

  async deleteHouse(houseId) {
    const res = await api.delete('auth/api/houses/' + houseId)
    logger.log('Deleting House', res.data)
  }

}

export const housesService = new HousesService()