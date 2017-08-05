/**
 * Mocking client-server processing
 */
import _products from './products'

const TIMEOUT = 100;
const MAX_CHECKOUT = 2; // max different items

export const api = {
  getProducts() {
    return new Promise( resolve => {
      setTimeout(() => resolve(_products), TIMEOUT)
    })
  },

  buyProducts(cart) {
    return new Promise( (resolve, reject) =>
        setTimeout(() => {
          if(Object.keys(cart.quantityById).length <= MAX_CHECKOUT)
            resolve(cart)
          else
            reject(`You can buy ${MAX_CHECKOUT} items at maximum in a checkout`)
        }, TIMEOUT)
    )
  }

/*
  buyProducts(cart) {
    return fetch('/flowers.jpg').then( response => {
        if(response.ok) {
          return cart;
        }
        throw new Error('Network response was not ok.')
    }).catch(error => {
        console.log("network error");
        return Promise.reject("network error");
    });
  }
*/
}
