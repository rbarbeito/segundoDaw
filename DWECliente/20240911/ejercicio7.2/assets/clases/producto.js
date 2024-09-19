export default class Producto {
  constructor({
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta,
    images,
    thumbnail,
  }) {
    this.id = id
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.discountPercentage = discountPercentage
    this.rating = rating
    this.stock = stock
    this.tags = tags
    this.brand = brand
    this.sku = sku
    this.weight = weight
    this.dimensions = dimensions
    this.warrantyInformation = warrantyInformation
    this.shippingInformation = shippingInformation
    this.availabilityStatus = availabilityStatus
    this.reviews = reviews
    this.returnPolicy = returnPolicy
    this.minimumOrderQuantity = minimumOrderQuantity
    this.meta = meta
    this.images = images
    this.thumbnail = thumbnail
  }

  /**
   * Método para obtener el precio final después del descuento
   * @returns
   */
  getFinalPrice() {
    return this.price - (this.price * this.discountPercentage) / 100
  }

  /**
   * Método para agregar una nueva reseña
   * @param {*} review
   */
  addReview(review) {
    this.reviews.push(review)
  }

  /**
   * Método para actualizar la información de stock
   * @param {*} newStock
   */
  updateStock(newStock) {
    this.stock = newStock
    this.availabilityStatus = newStock > 0 ? 'In Stock' : 'Out of Stock'
  }

  /**
   *Método para obtener el promedio de la calificación
   * @returns
   */
  getAverageRating() {
    const totalRating = this.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    )
    return totalRating / this.reviews.length
  }

  /**
   * Método para imprimir la información del producto
   */
  printProductInfo() {
    console.log(
      `Product: ${this.title}\nPrice: $${this.getFinalPrice()}\nRating: ${
        this.rating
      }`
    )
  }
}

