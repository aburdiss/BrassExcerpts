import React from 'react';
import {Pressable, Linking, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';

const YoutubeLink = ({video}) => {
  return (
    <Pressable
      onPress={function openYouTubeLink() {
        const url = video[1];
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(`https://youtu.be/${url}`);
          } else {
            console.log("Can't open url: " + url);
          }
          return false;
        });
      }}
      style={({pressed}) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: pressed ? 0.7 : 1,
        backgroundColor: colors.greenLight,
        marginVertical: 4,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderBottomColor: colors.blueLight,
        borderBottomWidth: 1,
      })}>
      <Text style={{fontWeight: 'bold', flex: 1, paddingRight: 10}}>
        {video[0]}
      </Text>
      <Ionicons name="open-outline" size={20} color={colors.black} />
    </Pressable>
  );
};

export default YoutubeLink;
