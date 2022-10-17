/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import toBase64 from './src/function/toBase64';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = React.useRef<Camera>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      {device ? (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          enableDepthData={true}
          isActive={true}
          photo={true}
        />
      ) : null}
      <Button
        title={'Take photo'}
        onPress={async () => {
          const photo = await camera.current?.takePhoto();
          if (photo) {
            console.log(photo);
            console.log(photo.path);

            setPhotoURL(await toBase64(photo.path, true));
          }
        }}
      />
      {photoURL ? (
        <Image
          style={{width: 300, height: 300}}
          source={{
            uri: photoURL,
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default App;
