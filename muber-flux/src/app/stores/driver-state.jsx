import { ReduceStore } from 'flux/utils';

import Dispatcher from '../dispatcher/dispatcher.jsx';
import { TOGGLE_STATE } from '../actions/action-types.jsx';

class DriverStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch (action.type) {
      case TOGGLE_STATE:
        return action.data;
      default:
        return state;
    }
  }
}

export default new DriverStateStore();
