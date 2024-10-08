import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const Time_FeedBack = () => {
  return (
    <View style={styles1.time_and_feedback}>
    <View style={styles1.time}>
      <Text style={styles1.timeText}>Ready in </Text>
      <Text style={[styles1.timeText, { fontSize: 18 }]}>( 20 mins </Text>
      <MaterialCommunity name='clock-time-eight-outline' style={{ marginTop: 5 }} size={20} color="grey" />
    </View>
    <Text style={styles1.separator}>|</Text>
    <View style={styles1.feedback}>
      <FontAwesome name='star' size={20} style={{ marginTop: 5 }} color="#FFD700" />
      <Text style={styles1.feedbackText}>4.5 ) Feedback</Text>

    </View>
  </View>
  )
}

export default Time_FeedBack

const styles1 = StyleSheet.create({
    time_and_feedback: {
        height: '7%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      time: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '49%',
        padding: 3,
        // gap: 5,
      },
      timeText: {
        color: 'grey',
        fontFamily: 'jakarta_bold',
        fontSize: 18,
      },
      separator: {
        fontSize: 40,
        color: 'grey',
      },
      feedback: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '49%',
        gap: 5,
      },
      feedbackText: {
        color: 'grey',
        fontFamily: 'jakarta_bold',
        fontSize: 18,
      },
})