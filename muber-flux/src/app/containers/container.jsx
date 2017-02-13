import React from 'react';
import { Container } from 'flux/utils';

import Actions from '../actions/actions.jsx';

import DriverStateStore from '../stores/driver-state.jsx';
import SurgeStore from '../stores/surge.jsx';
import OfferStore from '../stores/offer.jsx';
import DispatchStateStore from '../stores/dispatch-state.jsx';

import DriverStateToggle from '../components/driver-state-toggle.jsx';
import SurgeJSON from '../components/surge-json.jsx';
import OfferJSON from '../components/offer-json.jsx';
import DispatchStateText from '../components/dispatch-state-text.jsx';

function getStores() {
  return [
    DriverStateStore,
    SurgeStore,
    OfferStore,
    DispatchStateStore,
  ];
}

function getState() {
  return {
    onlineState: DriverStateStore.getState(),
    onToggleState: Actions.toggleState,

    surgeMap: SurgeStore.getState(),
    fetchSurge: Actions.fetchSurge,

    offer: OfferStore.getState(),
    fetchOffer: Actions.fetchOffer,

    dispatchState: DispatchStateStore.getState(),
    requestDispatch: Actions.requestDispatch,
  };
}

const AppView = (props) => (
  <div>
    <DriverStateToggle {...props} />
    <SurgeJSON {...props} />
    <OfferJSON {...props} />
    <DispatchStateText {...props} />
  </div>
);

export default Container.createFunctional(AppView, getStores, getState);
