import {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%'
}

class MapContainer extends Component {
    
    render(){
        return(
            <Map containerStyle={containerStyle} google={this.props.google} zoom={14}>
    
        </Map>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey:"AIzaSyAbFavSHHKpuTZorWhnAr4UN7WLKDCRWt4"
})(MapContainer);