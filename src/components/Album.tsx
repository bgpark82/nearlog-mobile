import React from 'react';
import {Button, Image, Pressable, ScrollView, View} from 'react-native';

const Album = ({onPressButton, onPressPhoto, photos}) => {
  return (
    <View style={{flex: 0.5}}>
      <Button title="사진 불러오기" onPress={onPressButton} />
      <ScrollView>
        {photos.map((p, i) => (
          <Pressable onPress={() => onPressPhoto(p)}>
            <Image
              key={i}
              style={{width: 100, height: 100}}
              source={{uri: p.node.image.uri}}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Album;
