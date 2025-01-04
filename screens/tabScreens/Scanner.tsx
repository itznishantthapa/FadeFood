import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopText from '../../components/scanner/TopText';
const { width, height } = Dimensions.get('window');

export default function Scanner({ navigation }) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setscanned] = useState(false)

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused');
      setscanned(false)

      return () => {
        console.log('Screen is unfocused');
        setscanned(true)
      };
    }, [])
  );

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
      setscanned(true);
    }, 3000);


  }


  return (

    <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={false} backgroundColor='black' style='light' />
      <View style={styles.container}>
        {!scanned && (
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={scanned ? undefined : handleScanned}
          >
            <View style={styles.overlayContainer}>
              <TopText />
              <View style={styles.overlay} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleScannedAgain}>
                  <Text style={styles.text}>Scan Again</Text>
                </TouchableOpacity>
              </View>

            </View>
          </CameraView>
        )}

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
  },
  overlay: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },

});
