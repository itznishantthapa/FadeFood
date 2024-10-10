import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');

export default function Search({ navigation }) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setscanned] = useState(false)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function handleScannedAgain() {
    setscanned(false);
  }

  const handleScanned = (data: any) => {
    setTimeout(() => {
      navigation.navigate('FoodList')
      console.log('Navigation Success')
    }, 3000);
    setscanned(true);
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <CameraView style={styles.camera} facing={facing} onBarcodeScanned={scanned ? undefined : handleScanned}>
          <View style={styles.overlayContainer}>
            <View style={styles.intro} >
              <Image style={{ height: 100, width: 100 }} source={require('../../assets/fadefood_logo.png')}></Image>
              <View>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Scan FadeFood to</Text>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Pre-order & Payment</Text>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>from anywhere</Text>
              </View>
            </View>
            
            <View style={styles.overlay} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleScannedAgain}>
                <Text style={styles.text}>Scan Again</Text>
              </TouchableOpacity>
            </View>

          </View>
        </CameraView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    // marginTop: '40%'

  },
  overlay: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  intro: {
    height: height * 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10
  }
});
