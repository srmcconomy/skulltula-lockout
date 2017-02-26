// @flow

import { applyMiddleware } from 'redux';

import type { Action } from '../actions';

export default function (createStore: StoreCreator): StoreCreator {
  return (reducer: Reducer, preloadedState: ?State): Store => {
    const listeners = {};
    let currentID = 0;
    const store = createStore(reducer, preloadedState, applyMiddleware(
      store => next => action => {
        const prevState = store.getState();
        const ret = next(action);
        Object.values(listeners).forEach(listener => listener(action, prevState));
        return ret;
      },
    ));
    store.actionSubscribe = listener => {
      const id = currentID++;
      listeners[id] = listener;
      return () => {
        delete listeners[id];
      };
    };
    return store;
  };
}
