import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import { styles } from '../../style/style';
import { scaleWidth } from '../../Scaling';

const { width, height } = Dimensions.get('window');

const Map = ({ location }) => {
  if (!location) {
    // Return a loading indicator or a placeholder if location is not available
    return (
      <View style={[styles.homeMap, { width: width }]}>
        <View style={styles.map_box}>
          <ActivityIndicator size="large" color="#b3b3b3" />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.homeMap, { width: width }]}>
      <View style={styles.map_box}>
        <Image
          style={{ height: '100%', width: '100%', borderRadius: scaleWidth(20) }}
          resizeMode='cover'
          source={{
            uri: `https://maps.gomaps.pro/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${location.latitude},${location.longitude}&key=AlzaSyEVS1Xym6dfUAcdxBZQaKis7oO_zf_D7GZ`,
          }}
        />
      </View>
    </View>
  );
};

export default Map;