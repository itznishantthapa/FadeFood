import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth } from '../../Scaling';

const Greeting = ({name}) => {
  return (
    <View style={styles.container}>
      <View style={styles.greet_name}>
      <Text style={styles.greeting}>Good Afternoon, </Text>
      <Text style={styles.name}>{name || 'Foodie'}</Text>

      </View>
      <Text style={styles.subText}>What would you like to have today?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: scaleWidth(10),
        width:'100%',
        justifyContent: 'center',
      },
      greeting: {
        fontSize: scaleWidth(20),
        fontFamily: 'poppins_semibold',
        color: '#014f86',
        textShadowColor: 'rgba(0, 0, 0, 0.05)',
        textShadowOffset: { width: 0, height: scaleHeight(1) },
        textShadowRadius: scaleWidth(2),
      },
      name:{
        fontFamily:'poppins_regular',
        fontSize:scaleWidth(16)
      },
      subText: {
        fontSize: scaleWidth(14),
        color: '#666',
        fontFamily: 'poppins_semibold',
        letterSpacing:scaleWidth(0.3),
        marginTop:scaleHeight(-5)
      },
      greet_name: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
});

export default Greeting;