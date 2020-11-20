import React from 'react';
import {Marker} from 'react-native-maps';
import Styled from 'styled-components/native';

const Profile = Styled.Image`
    height: 70px;
    width: 70px;
    borderRadius: 75px;
    borderWidth: 3px;
    borderColor: rgb(255,255,255);
`;

const Markers = ({markers}) => {
  return (
    <>
      {markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <Profile source={{url: marker.image}} />
          </Marker>
        );
      })}
    </>
  );
};

export default Markers;
