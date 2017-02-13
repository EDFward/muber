import React from 'react'

class SurgeJSON extends React.Component {

  componentDidMount() {
    setInterval(this.props.fetchSurge, 2000);
  }

  render() {
    const {surgeMap} = this.props;
    const surgeMapJSON = {
      __html: JSON.stringify(surgeMap, undefined, 4)
    };
    return (
      <div>
        <h2>Surge</h2>
        <pre dangerouslySetInnerHTML={surgeMapJSON} />
      </div>
    );
  }
}

export default SurgeJSON;
