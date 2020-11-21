import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Styled from 'styled-components/native';
import Markers from './components/Markers';
import CameraRoll from '@react-native-community/cameraroll';
import Album from './components/Album';

const Container = Styled.View`
  flex: 1;
`;

const App = () => {
  const [markers, setMarkers] = useState([
    {
      latitude: 37.506892,
      longitude: 127.020445,
      image: 'https://nearlog.s3.ap-northeast-2.amazonaws.com/static/home.png',
    },
    {
      latitude: 37.505973,
      longitude: 127.022733,
      image: 'https://nearlog.s3.ap-northeast-2.amazonaws.com/static/bien.png',
    },
    {
      latitude: 37.506214,
      longitude: 127.021748,
      image: 'https://nearlog.s3.ap-northeast-2.amazonaws.com/static/dopio.png',
    },
  ]);

  const [photos, setPhotos] = useState([]);

  const onPressButton = () => {
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    })
      .then((r) => {
        setPhotos(r.edges);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onPressPhoto = (photo) => {
    const {latitude, longitude} = photo.node.location
      ? photo.node.location
      : {latitude: 0, longitude: 0};
    const image = photo.node.image.uri;
    setMarkers([...markers, {latitude, longitude, image}]);
  };

  return (
    <Container>
      <MapView
        initialRegion={{
          latitude: 37.506892,
          longitude: 127.020445,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 0.5}}
        provider={PROVIDER_GOOGLE}>
        <Markers markers={markers} />
      </MapView>
      <Album
        onPressButton={onPressButton}
        onPressPhoto={onPressPhoto}
        photos={photos}
      />
    </Container>
  );
};

export default App;
