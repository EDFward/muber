import React from 'react'

const DispatchStateText = ({dispatchState}) => {
  let state;
  if (!dispatchState) {
    state = <p>OFFLINE</p>;
  } else {
    if (dispatchState.ontrip) {
      state = <p style={{color: 'green'}}>ON TRIP</p>;
    } else {
      state = <p style={{color: 'blue'}}>REQUESTING</p>;
    }
  }

  return (
    <div>
      <h2>Dispatch</h2>
      {state}
    </div>
  );
}

export default DispatchStateText;
