import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../components/viewScreens/TopBar';

const RestaurantNotification = ({navigation}) => {
  const notifications = [
    {
      id: 1,
      title: 'New Promotion',
      message: 'Get 20% off your next order!',
      date: 'Nov 10, 2023',
    },
    {
      id: 2,
      title: 'Order Delivered',
      message: 'Your order #123 has been delivered.',
      date: 'Nov 8, 2023',
    },
    {
      id: 3,
      title: 'Flash Sale',
      message: 'Don\'t miss our limited-time flash sale!',
      date: 'Nov 5, 2023',
    },
    {
      id: 4,
      title: 'New Menu Item',
      message: 'Check out our new vegetarian option!',
      date: 'Nov 2, 2023',
    },
  ];

  // const handleSettingIcon = () => {
  //   navigation.navigate('SellerSetting');
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F8" }}>
    <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
    <TopBar navigation={navigation} top_title='Notifications' withSettingIcons={false} handleSettingIcon={undefined}/>
    <View style={styles.container}>

      {notifications.map((notification) => (
        <View key={notification.id} style={styles.notificationItem}>
          <View style={styles.notificationIcon}>
            <Text style={styles.notificationIconText}>🔔</Text>
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
          </View>
        </View>
      ))}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  headerActionText: {
    fontSize: 14,
    color: '#666',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  notificationIcon: {
    marginRight: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIconText: {
    color: '#fff',
    fontSize: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default RestaurantNotification; 