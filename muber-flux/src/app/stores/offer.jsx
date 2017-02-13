import { ReduceStore } from 'flux/utils';

import Dispatcher from '../dispatcher/dispatcher.jsx';
import {
  REFRESH_OFFER,
  TOGGLE_STATE,
  GET_DISPATCH,
 } from '../actions/action-types.jsx';
 import DriverStateStore from '../stores/driver-state.jsx';
 import DispatchStateStore from '../stores/dispatch-state.jsx';

class OfferStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case REFRESH_OFFER:
        // Only set state if in online state and not on trip.
        const online = DriverStateStore.getState();
        const {ontrip} = DispatchStateStore.getState() || {};
        return online && !ontrip && action.data || null;
      case TOGGLE_STATE:
        // Clear offer if go offline.
        return action.data && state || null;
      case GET_DISPATCH:
        return !action.data.ontrip && state || null;
      default:
        return state;
    }
  }
}

export default new OfferStore();
