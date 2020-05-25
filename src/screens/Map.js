import React, {useState} from 'react';
import {Container, Content, Header} from 'native-base';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

const Map = (props) =>{    
    return(
        <Container>                     
                <MapView
                    style={styles.map}
                    // provider={PROVIDER_GOOGLE}                    
                    initialRegion={{
                        latitude: props.locations.address[0].latlng.latitude,
                        longitude: props.locations.address[0].latlng.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                >                                            
                    {props.locations.address.map((location)=>{
                        console.log(location);
                        return(
                        <Marker
                            coordinate={location.latlng}
                            title = "Location"
                            description={location.address}
                        />)
                    })}
                </MapView>            
        </Container>
    )
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',        
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
})

const mapStateToProps = (state) =>{
    return{
        locations: state.locations
    }
}

export default connect(mapStateToProps)(Map);

