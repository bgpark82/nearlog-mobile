import React, {useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Styled from 'styled-components/native';
import Markers from './components/Markers';

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
    </Container>
  );
};

export default App;
