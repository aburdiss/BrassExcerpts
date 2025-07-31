import React from 'react';
import { Image } from 'react-native';

/**
 * @description A replacement for the package 'react-native-auto-height-image'
 * @see * https://github.com/vivaxy/react-native-auto-height-image/issues/123#issuecomment-1159725435
 */
const AutoHeightImage = React.memo(
  ({ width, style, ...props }: { width: number; style: Object }) => {
    const [height, setHeight] = React.useState(1);
    return (
      <Image
        {...props}
        style={{ width, height, ...style }}
        onLoad={({ nativeEvent }) => {
          setHeight(
            (nativeEvent.source.height / nativeEvent.source.width) * width,
          );
        }}
      />
    );
  },
);

export default AutoHeightImage;
