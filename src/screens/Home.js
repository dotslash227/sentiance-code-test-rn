import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  addLocation,
  removeLocation,
  removeAllLocations,
} from '../actions/locations';
import {
  Container,
  Content,
  Header,
  Card,
  CardItem,
  Button,
  Left,
  Body,
  Right,
} from 'native-base';

const Home = (props) => {
  const [latlng, setlatlng] = useState('');
  const [currentLoc, setCurrentLoc] = useState('');

  useEffect(() => {
    if (props.locations.address.length < 30) {
      Geolocation.watchPosition(
        (info) => {
          const {latitude, longitude} = info.coords;
          const latlngtmp = {latitude: latitude, longitude: longitude};
          setlatlng(latlngtmp);
          axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=<enter google geocoding key>`,
          })
            .then((response) => {
              setCurrentLoc(response.data.results[0].formatted_address);
              props.addLocation({
                latlng: latlng,
                address: currentLoc,
              });
            })
            .catch((error) => console.log(error));
        },
        (e) => console.log(e),
      );
    }
  });

  return (
    <Container>
      <Header>
        <Text>Location Services</Text>
      </Header>
      <Content padder>
        {props.locations.address.map((location) => {
          return (
            <Card>
              <CardItem>
                <Left>
                  <Text>{location.address}</Text>
                </Left>
                <Right>
                  <Button
                    rounded
                    success
                    full
                    small
                    onPress={() => props.removeLocation(location)}>
                    <Text style={{color: 'white'}}>Remove</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          );
        })}
      </Content>
      <Button full primary onPress={() => props.removeAllLocations()}>
        <Text style={{color: 'white'}}>Clear All Locations</Text>
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation: (address) => {
      dispatch(addLocation(address));
    },
    removeLocation: (address) => {
      dispatch(removeLocation(address));
    },
    removeAllLocations: () => {
      dispatch(removeAllLocations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
