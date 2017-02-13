import { ReduceStore } from 'flux/utils';

import Dispatcher from '../dispatcher/dispatcher.jsx';
import { REFRESH_SURGE } from '../actions/action-types.jsx';

class SurgeStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {};
  }

  reduce(state, action) {
    switch (action.type) {
      case REFRESH_SURGE:
        return action.data;
      default:
        return state;
    }
  }
}

export default new SurgeStore();
