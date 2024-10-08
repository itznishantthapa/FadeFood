import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { styles } from '../../style/style'
import Icons from '../../components/viewScreens/Icons'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '../../components/auth/Button'
import List from '../../components/viewScreens/List'
import TopBar from '../../components/viewScreens/TopBar'
import chatpate from '../../assets/chatapate.jpeg'


const FoodList = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor='#ff6b35' style='light' />
            <View style={[styles.home_screen, { alignItems: 'center', backgroundColor: '#F0F0F0' }]}>
                <TopBar navigation={navigation} top_title='My List' />
                <View style={{ height: '52%', width: '100%', paddingVertical: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                            <List
                                price='50'
                                foodName='Chatpaate'
                                restaurantName='Delicious Restaurant'
                                image={chatpate}
                                isLoveNeeded={false}
                                navigation={navigation}
                            />
                        
                            <List
                                price='50'
                                foodName='Chatpaate'
                                restaurantName='Delicious Restaurant'
                                image={chatpate}
                                isLoveNeeded={false}
                                navigation={navigation}
                            />
                        
                            <List
                                price='50'
                                foodName='Chatpaate'
                                restaurantName='Delicious Restaurant'
                                image={chatpate}
                                isLoveNeeded={false}
                                navigation={navigation}
                            />
                        
                            <List
                                price='50'
                                foodName='Chatpaate'
                                restaurantName='Delicious Restaurant'
                                image={chatpate}
                                isLoveNeeded={false}
                                navigation={navigation}
                            />
                        
                          
                        </View>
                    </ScrollView>
                </View>
                <View style={{ height: '30%', width: '95%', backgroundColor: '#ffffff', borderRadius: 20, flexDirection: 'column', alignItems: 'center' }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
                        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                                <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>Chatapate x3</Text>
                                <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>150.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                                <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>Chatapate</Text>
                                <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>50.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                                <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>Chatapate</Text>
                                <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>50.00</Text>
                            </View>



                        </View>
                    </ScrollView>
                    <Text style={{ height: '5%', color: 'grey' }}>-------------------------------------------------------------</Text>
                    <View style={{ width: '95%', height: '25%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ color: 'grey', fontSize: 30, fontFamily: 'inter_semibold' }}>Total</Text>
                        <Text style={{ color: 'grey', fontSize: 18, fontFamily: 'inter_semibold' }}>Rs. 250.00</Text>
                    </View>

                </View>
                <Button
                    btnText={'Checkout'}
                    style={[styles.loginButton, { backgroundColor: '#4CAF50', width: '95%', marginTop: 10 }]}
                    handleAuthBtn={() => { navigation.navigate('FoodList') }}
                />

            </View>
        </SafeAreaView>
    )
}
export default FoodList

