import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import NavBar from '../../components/home/NavBar'
import { styles } from '../../style/style'
import { Feather } from '@expo/vector-icons';
import RecentSearchBar from '../../components/viewScreens/RecentSearchBar'

const SearchScreen = ({ navigation }) => {
    const handleBackButton = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <View style={styles.home_screen}>
                <NavBar handleSearchScreen={undefined} isTextInput={true} isBack={true} handleBackButton={handleBackButton}></NavBar>
                <View>
                    <Text style={{ fontFamily: 'poppins_bold', fontSize: 18 }}>Your Recent Searches</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',width:'100%',height:100,justifyContent:'flex-start',gap:10}}>
                       <RecentSearchBar search_pharse={'Jhol momo'}/>
                       <RecentSearchBar search_pharse={'Chicken Curry'}/>
                       <RecentSearchBar search_pharse={'Chatepate with different spices'}/>
                       <RecentSearchBar search_pharse={'Sprite and fanta pack'}/>
                       <RecentSearchBar search_pharse={'Keema Noodles'}/>
                       <RecentSearchBar search_pharse={'Jhol momo'}/>
                       <RecentSearchBar search_pharse={'Jhol momo'}/> 
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default SearchScreen