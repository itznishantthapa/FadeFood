import { StyleSheet, Text, View,TextInput } from 'react-native'
import React,{useEffect,useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import NavBar from '../../components/home/NavBar'
import { styles } from '../../style/style'
import RecentSearchBar from '../../components/viewScreens/RecentSearchBar'
import { scaleWidth } from '../../Scaling'

const SearchScreen = ({ navigation }) => {



    
    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <View style={styles.home_screen}>
                <NavBar   handleSearchScreen={undefined} isTextInput={true} isBack={true} navigation={navigation}></NavBar>
                <View style={{paddingHorizontal:scaleWidth(8)}}>
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