import { View, Text, Dimensions, FlatList, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../../components/viewScreens/TopBar';
import MsgBox from '../../components/chat/MsgBox';
import FontAws from  'react-native-vector-icons/FontAwesome';
import { scaleHeight, scaleWidth } from '../../Scaling';

const { width, height } = Dimensions.get('window')

const Inbox = ({ navigation }) => {
    // Mock chat data with sender and receiver info
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hey, how are you ?', sender: false }, // receiver message
        { id: '2', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '3', text: 'Doing well! Let’s catch up soon.', sender: false }, // receiver message
        { id: '4', text: 'Sure, I will let you know.', sender: true }, // sender message
        { id: '5', text: 'Hey, how are you?', sender: false }, // receiver message
        { id: '6', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '7', text: 'Doing well! Let’s catch up soon and ad f  gf as g asg a sdg jaiasdhhguiasdfgasddg asdbgasd dg as dg asd dgasdf asdgas.', sender: false }, // receiver message
        { id: '8', text: 'Sure, I will let you know.', sender: true }, // sender message
        { id: '9', text: 'Hey, how are you?', sender: false }, // receiver message
        { id: '10', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '11', text: 'Doing well! Let’s catch up soon.', sender: false }, // receiver message
        { id: '12', text: 'Sure, I will let you know.', sender: true }, // sender message
        { id: '13', text: 'Hey, how are you?', sender: false }, // receiver message
        { id: '14', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '15', text: 'Doing well! Let’s catch up soon.', sender: false }, // receiver message
        { id: '16', text: 'Sure, I will let you know.', sender: true }, // sender message
        { id: '17', text: 'Hey, how are you?', sender: false }, // receiver message
        { id: '18', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '19', text: 'Doing well! Let’s catch up soon.', sender: false }, // receiver message
        { id: '20', text: 'Sure, I will let you know.', sender: true }, // sender message
    ]);
    // reverse the List of message here
    // messages.reverse();

    // Rendering each chat message
    const renderItem = ({ item }) => (<MsgBox item={item} />);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark' />
            <TopBar navigation={navigation} top_title='Inbox' />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.msg_input}>
                    <View style={{ flex: 1,backgroundColor:'#F0F4F8' }}>
                        <FlatList
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            inverted // Makes the latest messages appear at the bottom
                            contentContainerStyle={{ paddingBottom: scaleHeight(20), paddingHorizontal: scaleWidth(10) }}
                        />

                        {/* Input and Send button section */}
                        <View style={styles.input_send}>
                            <View style={{ width: '80%', maxHeight: scaleHeight(100), backgroundColor: 'white', borderRadius: scaleWidth(10), borderColor: '#e0e0e0', borderWidth: scaleWidth(1), padding: scaleWidth(5) }}>
                                <ScrollView>
                                    <TextInput
                                        style={{
                                            backgroundColor: 'white',
                                            fontSize: scaleWidth(18),
                                            color: 'black',
                                            paddingHorizontal: scaleHeight(10),
                                            maxHeight: scaleHeight(100),
                                            lineHeight: scaleHeight(22),
                                            marginTop: scaleHeight(5),
                                        }}
                                        selectionColor="grey"
                                        multiline
                                        scrollEnabled
                                        placeholder="Your message"
                                    />
                                </ScrollView>
                            </View>

                            <View style={{ height: scaleHeight(50), width: '15%', backgroundColor: '#333333', borderRadius: scaleWidth(10), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAws name='send' style={{color:'#ffffff'}} size={scaleWidth(24)}/>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default Inbox;

const styles = StyleSheet.create({
    msg_input:{
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderTopRightRadius: scaleHeight(15),
        borderTopLeftRadius: scaleHeight(15),
    },
    input_send:{
        width: '100%', 
        flexDirection: 'row', 
        gap: scaleWidth(5), 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
        padding: scaleWidth(10),

    }

});
