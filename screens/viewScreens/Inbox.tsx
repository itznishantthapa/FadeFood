import { View, Text, Dimensions, FlatList, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../../components/viewScreens/TopBar';
import MsgBox from '../../components/chat/MsgBox';

const { width, height } = Dimensions.get('window')

const Inbox = ({ navigation }) => {
    // Mock chat data with sender and receiver info
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hey, how are you?', sender: false }, // receiver message
        { id: '2', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '3', text: 'Doing well! Let’s catch up soon.', sender: false }, // receiver message
        { id: '4', text: 'Sure, I will let you know.', sender: true }, // sender message
        { id: '5', text: 'Hey, how are you?', sender: false }, // receiver message
        { id: '6', text: 'I am good, what about you?', sender: true }, // sender message
        { id: '7', text: 'Doing well! Let’s catch up soon.', sender: false }, // receiver message
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
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            inverted // Makes the latest messages appear at the bottom
                            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
                        />

                        {/* Input and Send button section */}
                        <View style={styles.input_send}>
                            <View style={{ width: '80%', maxHeight: 100, backgroundColor: 'white', borderRadius: 10, borderColor: '#e0e0e0', borderWidth: 1, padding: 5 }}>
                                <ScrollView>
                                    <TextInput
                                        style={{
                                            backgroundColor: 'white',
                                            fontSize: 18,
                                            color: 'black',
                                            paddingHorizontal: 10,
                                            maxHeight: 100,
                                            lineHeight: 22,
                                            marginTop: 6
                                        }}
                                        selectionColor="grey"
                                        multiline
                                        scrollEnabled
                                    />
                                </ScrollView>
                            </View>

                            <View style={{ height: 50, width: '15%', backgroundColor: 'red', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                {/* Send Button (icon or text can be added here) */}
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Styles for sender and receiver messages


export default Inbox;

// stylesheet here
const styles = StyleSheet.create({
    msg_input:{
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    input_send:{
        width: '100%', 
        flexDirection: 'row', 
        gap: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 10 

    }

});
