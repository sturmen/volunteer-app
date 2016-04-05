import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import GoogleMapMessage from '../../components/GoogleMap/GoogleMapMessage'
var geocoder = new google.maps.Geocoder();

class GoogleMapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: <GoogleMapMessage message={"Waiting for Map View"}/>
        };
    }

    componentDidMount() {
        geocoder.geocode({"address": this.props.address}, function(results) {
            if (results[0]) {
                this.setState({
                    display: <GoogleMap
                        lat={results[0].geometry.location.lat()}
                        lng={results[0].geometry.location.lng()}/>
                });
            } else {
                this.setState({
                    display: <GoogleMapMessage message={"No Available Map View"}/>
                });
            }
        }.bind(this));
    }

    render() {
        return (this.state.display)
    }
}

GoogleMapContainer.propTypes = {
    address: PropTypes.string
};

GoogleMapContainer.defaultProps = {
    address: ""
};

export default connect()(GoogleMapContainer)
