import { makeObservable, computed, action, observable, toJS } from "mobx";
import uniqueId from "lodash.uniqueid";

class CartStore {
  products = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      productsCount: computed,
      productsList: computed,
      addProduct: action,
      removeProduct: action,
      clearCart: action,
    });
  }

  get productsList() {
    return this.products;
  }

  get productsCount() {
    return this.products.length;
  }

  addProduct(product) {
    this.products.push({
      color: product.color,
      image: product.image,
      name: product.name,
      price: product.price,
      size: product.size,
      id: Number(uniqueId()),
    });
  }

  removeProduct(productId) {
    const updatedProductsList = this.products.filter((product) => {
      return product.id !== productId
    });
    this.products = updatedProductsList;
  }

  clearCart() {
    this.products = [];
  }
}

const cartStore = new CartStore();
export default cartStore;
