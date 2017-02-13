import React from 'react'

class OfferJSON extends React.Component {

  componentDidMount() {
    setInterval(this.props.fetchOffer, 2000);
  }

  render() {
    const {offer} = this.props;
    const offerJSON = {
      __html: JSON.stringify(offer, undefined, 4)
    };
    return (
      <div>
        <h2>Offer</h2>
        <pre dangerouslySetInnerHTML={offerJSON} />
      </div>
    );
  }
}

export default OfferJSON;
