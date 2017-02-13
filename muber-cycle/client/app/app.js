import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import {
  makeDOMDriver, div, input, p, h2, label, pre
} from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';


function main(sources) {

  /* Surge. */
  const getSurge$ = xs.periodic(2000).map(() => ({
    url: 'http://localhost:5000/surge',
    category: 'surge',
    method: 'GET'
  }));
  const surge$ = sources.HTTP.select('surge')
    .flatten()
    .map(res => res.body)
    .startWith({});

  /* Driver online state. */
  const driverState$ = sources.DOM.select('input#online-toggle').events('click')
    .map(ev => ev.target.checked)
    .startWith(false);

  /* Offer. */
  const getOffer$ = xs.periodic(2000).map(() => ({
    url: 'http://localhost:5000/offer',
    category: 'offer',
    method: 'GET'
  }));
  const offer$ = sources.HTTP.select('offer')
    .flatten()
    .map(res => res.body)
    .startWith({});

  /* Dispatch. */
  const getDispatch$ = xs.combine(driverState$, xs.periodic(5000))
    .filter(([onlineState, _]) => onlineState)
    .map(() => ({
      url: 'http://localhost:5000/dispatch',
      category: 'dispatch',
      method: 'GET'
    }));
  const dispatch$ = sources.HTTP.select('dispatch')
    .flatten()
    .map(res => res.body)
    .startWith({ontrip: false});

  const vdom$ = xs.combine(surge$, driverState$, offer$, dispatch$)
    .map(([surgeMap, onlineState, offer, dispatch]) => {
      const {ontrip} = dispatch || {};
      let dispatchState;
      if (!onlineState) {
        dispatchState = p('OFFLINE');
      } else if (ontrip) {
        dispatchState = p({ style: { color: 'green' } }, 'ON TRIP');
      } else {
        dispatchState = p({ style: { color: 'blue' } }, 'REQUESTING');
      }
      return div([
        div([
          h2(onlineState && 'Online' || 'Offline'),
          label('.switch', [
            input({
              attrs: {
                type: 'checkbox',
                id: 'online-toggle',
                disabled: onlineState && ontrip
              }
            }),
            div('.slider round')
          ]),
        ]),
        div([
          h2('Surge'),
          pre(JSON.stringify(surgeMap, undefined, 4))
        ]),
        div([
          h2('Offer'),
          pre(JSON.stringify(onlineState && !ontrip && offer || null, undefined, 4))
        ]),
        div([
          h2('Dispatch'),
          dispatchState
        ]),
      ])
    });

  return {
    DOM: vdom$,
    HTTP: xs.merge(getSurge$, getOffer$, getDispatch$)
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
};

run(main, drivers);
