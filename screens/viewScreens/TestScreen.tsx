import React, { useRef } from 'react';
import { View, Text, Animated, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const navbarTranslate = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  const tabbarTranslate = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 80],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
        <Text style={styles.navbarText}>Navbar</Text>
      </Animated.View>
      <Animated.FlatList
        data={[...Array(30).keys()]}
        renderItem={({ item }) => <View style={styles.card}><Text>Card {item}</Text></View>}
        keyExtractor={(item) => item.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
      <Animated.View style={[styles.tabbar, { transform: [{ translateY: tabbarTranslate }] }]}>
        <Text style={styles.tabbarText}>Tabbar</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

// const App = () => (
//   <NavigationContainer>
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//     </Tab.Navigator>
//   </NavigationContainer>
// );

const styles = StyleSheet.create({
  container: { flex: 1 },
  navbar: { height: 80, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
  navbarText: { fontSize: 20, color: 'white' },
  tabbar: { height: 80, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 },
  tabbarText: { fontSize: 20, color: 'white' },
  card: { height: 100, margin: 10, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
