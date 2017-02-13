import {
  TOGGLE_STATE,
  REFRESH_SURGE,
  REFRESH_OFFER,
  GET_DISPATCH,
} from './action-types.jsx';
import Dispatcher from '../dispatcher/dispatcher.jsx';

/*
 * Mock API.
 */

const mockSurgeAPI = {
  _randomSurge() {
    const surge = {};
    for (let i = 0; i <= 6; ++i) {
      surge[i] = Number((Math.random() * 3 + 1.1).toFixed(1));
    }
    return surge;
  },

  update({next}) {
    setTimeout(() => next(this._randomSurge()), 500);
  }
};

const mockOfferAPI = {
  _offer: null,

  _keptCnt: 0,

  _randomOffer() {
    return Math.random() >= 0.7 ? {} : { target: Math.floor(Math.random() * 6) + 1 };
  },

  update({next}) {
    if (!this._offer || this._keptCnt >= 2) {
      this._offer = this._randomOffer();
      this._keptCnt = 0;
    } else {
      this._keptCnt++;
    }
    setTimeout(() => next(this._offer), 500);
  }
};

const mockDispatchAPI = {
  _ontrip: false,

  request({next}) {
    setTimeout(() => {
      this._ontrip = !this._ontrip;
      next({ontrip: this._ontrip});
    }, 1000);
  }
};

/*
 * Actions.
 */

const Actions = {
  toggleState(newState) {
    Dispatcher.dispatch({
      type: TOGGLE_STATE,
      data: newState
    })
  },

  fetchSurge() {
    // Mock fetching surge from server.
    mockSurgeAPI.update({next: Actions.refreshSurge});
  },

  refreshSurge(newSurge) {
    Dispatcher.dispatch({
      type: REFRESH_SURGE,
      data: newSurge
    })
  },

  fetchOffer() {
    // Mock fetching offer from server. May not have offer.
    mockOfferAPI.update({next: Actions.refreshOffer});
  },

  refreshOffer(newOffer) {
    Dispatcher.dispatch({
      type: REFRESH_OFFER,
      data: newOffer
    })
  },

  requestDispatch() {
    mockDispatchAPI.request({next: Actions.getDispatch});
  },

  getDispatch(dispatchState) {
    Dispatcher.dispatch({
      type: GET_DISPATCH,
      data: dispatchState
    })
  }
};

export default Actions;
