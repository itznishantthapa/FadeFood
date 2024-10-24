import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Greeting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Afternoon, Nishant</Text>
      <Text style={styles.subText}>What would you like to have today?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        // backgroundColor: '#fff',
        width:'100%',
        justifyContent: 'center',
      },
      greeting: {
        fontSize: 25,
        // fontWeight: '700',
        fontFamily: 'poppins_bold',
        color: '#1A1A1A',
        // marginBottom: 8,
        // Add text shadow for subtle depth
        textShadowColor: 'rgba(0, 0, 0, 0.05)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      },
      subText: {
        fontSize: 16,
        color: '#666',
        fontFamily: 'poppins_semibold',
        letterSpacing: 0.3,
        marginTop:-5
      },
    
});

export default Greeting;