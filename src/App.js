import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Styled from 'styled-components/native';
import Markers from './components/Markers';
import CameraRoll from '@react-native-community/cameraroll';
import {View, Button, ScrollView, Image} from 'react-native';

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
        r.edges.map((p) => {
          const {latitude, longitude} =
            p.node.location != null
              ? p.node.location
              : {latitude: 0, longitude: 0};
          const image = p.node.image.uri;
          setMarkers([...markers, {latitude, longitude, image}]);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    console.log(markers);
  }, [markers, photos]);

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
      <View style={{flex: 0.5}}>
        <Button title="사진 불러오기" onPress={onPressButton} />
        <ScrollView>
          {photos.map((p, i) => (
            <Image
              key={i}
              style={{width: 100, height: 100}}
              source={{uri: p.node.image.uri}}
            />
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default App;
