import { Profile } from "./Account.js"

export class House {
  constructor(data) {
    this.id = data._id
    this.bedrooms = data.bedrooms || 0
    this.bathrooms = data.bathrooms || 0
    this.levels = data.levels || 1
    this.imgUrl = data.imgUrl || ''
    this.year = data.year || 1900
    this.price = data.price || 0
    this.description = data.description || ''
    this.seller = new Profile(data.seller)
    this.createdAt = new Date(data.createdAt)
  }
}