import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { styles } from '../../style/style'
import Ant from 'react-native-vector-icons/AntDesign'
import Icons from '../../components/viewScreens/Icons'
import { ScrollView } from 'react-native-gesture-handler'
import Button from '../../components/auth/Button'


const FoodList = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor='#dc2f02' style='light' />
            <View style={[styles.home_screen, { alignItems: 'center', backgroundColor: '#F0F0F0' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', marginTop: 10 }}>
                    <Icons
                        name={'chevron-left'}
                    />
                    <Text style={{ fontFamily: 'jakarta_bold', fontSize: 25 }}>My List</Text>
                    <Icons
                        name={'close'}
                    />
                </View>
                <View style={{ height: '52%', width: '100%', marginTop: 10, paddingVertical: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>
                            <View style={{ height: 150, width: '95%', backgroundColor: '#ffffff', borderRadius: 20 }}>
                            </View>

                        </View>

                    </ScrollView>
                </View>
                <View style={{ height: '38%', width: '95%', backgroundColor: '#ffffff', borderRadius: 20, flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ height: '75%' }}>

                    </View>
                    <Button
                        btnText={'Checkout'}
                        style={[styles.loginButton, { backgroundColor: '#4CAF50', width: '80%', marginTop: 10 }
                        ]}
                        handleAuthBtn={() => { navigation.navigate('FoodList') }}
                    />

                </View>




            </View>
        </SafeAreaView>
    )
}

export default FoodList

