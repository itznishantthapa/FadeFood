import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions, 
  Image,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopText from '../../components/scanner/TopText';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Scanner({ navigation }) {
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  // Request camera permission immediately when component mounts
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    // This will trigger the system permission popup directly
    if (!permission?.granted) {
      await requestPermission();
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused');
      setScanned(false);
      
      return () => {
        console.log('Screen is unfocused');
        setScanned(true);
      };
    }, [])
  );

  const handleScanned = (data) => {
    if (scanned) return;
    
    setScanned(true);
    setLoading(true);
    
    // Show loading indicator before navigation
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('FoodList');
      console.log('Navigation Success');
    }, 2000);
  };

  const toggleCameraType = () => {
    setCameraType(current => current === 'back' ? 'front' : 'back');
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  // If permission status is still loading
  if (!permission) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </SafeAreaView>
    );
  }

  // If permission is denied
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <MaterialIcons name="camera-alt" size={64} color="#757575" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionMessage}>
          This feature needs camera access to scan items. Please enable camera permissions in your device settings.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestCameraPermission}
        >
          <Text style={styles.permissionButtonText}>Request Access</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TopText />
      
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={cameraType}
          onBarcodeScanned={scanned ? undefined : handleScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "code128"],
          }}
        >
          <View style={styles.overlayContainer}>
            <View style={styles.overlay}>
              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={styles.loadingText}>Processing...</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.controlsContainer}>
            {scanned && (
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={handleScanAgain}
              >
                <MaterialIcons name="refresh" size={24} color="#FFFFFF" />
                <Text style={styles.scanAgainText}>Scan Again</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.cameraToggleButton}
              onPress={toggleCameraType}
            >
              <MaterialIcons name="flip-camera-ios" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#212121',
  },
  permissionMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#757575',
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAgainButton: {
    backgroundColor: 'rgba(66, 133, 244, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cameraToggleButton: {
    position: 'absolute',
    right: 30,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 30,
  },
});