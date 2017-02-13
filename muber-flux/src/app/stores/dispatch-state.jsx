import { ReduceStore } from 'flux/utils';

import Dispatcher from '../dispatcher/dispatcher.jsx';
import {
  TOGGLE_STATE,
  GET_DISPATCH,
} from '../actions/action-types.jsx';
 import DriverStateStore from '../stores/driver-state.jsx';

class DispatchStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return null;
  }

  reduce(state, action) {
    switch (action.type) {
      case GET_DISPATCH:
        // Only update dispatch state if online.
        return DriverStateStore.getState() && action.data || null;
      case TOGGLE_STATE:
        // Clear dispatch state if go offline.
        return action.data && {ontrip: false} || null;
      default:
        return state;
    }
  }
}

export default new DispatchStateStore();
