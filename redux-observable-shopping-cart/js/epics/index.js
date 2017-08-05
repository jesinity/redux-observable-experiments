import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';
import { getCart } from '../reducers';
import { api } from '../services';
import * as actions from '../actions';

/**
 * search products epic
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */
const searchProducts = (action$,store) => {
  return action$
    .ofType(actions.GET_ALL_PRODUCTS).switchMap(q => {
      const cart = getCart(store.getState());
      return Observable.fromPromise(api.getProducts())
        .map(actions.receiveProducts)
    });
};

/**
 * checkout epic.
 * @param action$
 * @param store
 * @returns {any|*|Observable}
 */
const checkout = (action$,store) => {
  return action$
    .ofType(actions.CHECKOUT_REQUEST).switchMap(q => {
      const cart = getCart(store.getState());
      return Observable
        .fromPromise(api.buyProducts(cart))
        .map(cart => actions.checkoutSuccess(cart))
        .catch(error => Observable.of(actions.checkoutFailure(error)))
    });
};

export const rootEpic = combineEpics(
  searchProducts,
  checkout
);



