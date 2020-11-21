import React, {useState} from 'react';
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
      first: 100,
      assetType: 'Photos',
    })
      .then((r) => {
        console.log(r);
        setPhotos(r.edges);
      })
      .catch((err) => {
        console.err(err);
      });
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
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}>
        <Markers markers={markers} />
      </MapView>
      <View>
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
