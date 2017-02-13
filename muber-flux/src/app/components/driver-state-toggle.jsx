import React from 'react'

class DriverStateToggle extends React.Component {

  _onClickSwitch() {
    const {onToggleState, onlineState, requestDispatch} = this.props;
    onToggleState(!onlineState);
    if (onlineState) {
      // Go offline, cancel dispatch request.
      if (this._dispatchInterval) {
        console.log('Cancel dispatch request.');
        clearInterval(this._dispatchInterval);
      }
    } else {
      // Go online.
      console.log('Send dispatch request.');
      requestDispatch();
      this._dispatchInterval = setInterval(requestDispatch, 5000);
    }
  }

  render() {
    const {onlineState} = this.props;
    const {ontrip} = this.props.dispatchState || {};
    return (
      <div>
        <h2>{onlineState && 'Online' || 'Offline'}</h2>
        <label className="switch">
          <input
            type="checkbox"
            onChange={this._onClickSwitch.bind(this)}
            disabled={ontrip} />
          <div className="slider round"></div>
        </label>
      </div>
    );
  }
}

export default DriverStateToggle;
