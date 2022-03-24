import {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    render(){
        return(
            <div className='container_map'>
                <Map
                google={this.props.google}
                style = {{width:"25%", height:"25%"}}
                zoom = {5}
                initialCenter={
                    {
                        lat: 28.704060,
                        lng: 77.102493
                    }
                }
                />
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey:"AIzaSyAbFavSHHKpuTZorWhnAr4UN7WLKDCRWt4"
})(MapContainer);