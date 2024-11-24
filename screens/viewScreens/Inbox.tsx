import { View, Text, Dimensions, FlatList, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TopBar from '../../components/viewScreens/TopBar';
import MsgBox from '../../components/chat/MsgBox';
import FontAws from 'react-native-vector-icons/FontAwesome';
import { scaleHeight, scaleWidth } from '../../Scaling';

const { width, height } = Dimensions.get('window')

const Inbox = ({ navigation }) => {
    // Mock chat data with sender and receiver info
    const [messages, setMessages] = useState([
        {id: '3', text: 'mee too ?', sender: false},
        {id: '2', text: 'I am fine, whats about you ?', sender: true},
        { id: '1', text: 'Hey, how are you ?', sender: false },

    ]);


    const [inputMessage, setInputMessage] = useState('');

    const handleMessageSend = () => {
        if (inputMessage.trim().length > 0) {
            const newMessage = {
                id: (messages.length + 1).toString(),
                text: inputMessage,
                sender: messages.length%2? true:false,
            }
            setMessages([newMessage,...messages]);
            setInputMessage('');
        }
    }


        // Rendering each chat message
        const renderItem = ({ item }) => (<MsgBox item={item} />);

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar hidden={false} backgroundColor='#F0F4F8' style='dark'  />
                <TopBar navigation={navigation} top_title='Inbox' withSettingIcons={undefined} handleSettingIcon={undefined} />
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'flex-end',paddingTop:scaleHeight(60) }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View >
                        <FlatList
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            inverted 
                            contentContainerStyle={{ paddingBottom: scaleHeight(20), paddingHorizontal: scaleWidth(10) }}
                        />
                    </View>



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
                                    value={inputMessage}
                                    onChangeText={(text) => setInputMessage(text)}
                                    selectionColor="grey"
                                    multiline
                                    scrollEnabled
                                    placeholder="Your message"
                                />
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={{ height: scaleHeight(50), width: '15%', backgroundColor: '#333333', borderRadius: scaleWidth(10), justifyContent: 'center', alignItems: 'center' }} onPress={handleMessageSend} >
                            <FontAws name='send' style={{ color: '#ffffff' }} size={scaleWidth(24)} />
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    };

    export default Inbox;

    const styles = StyleSheet.create({
        msg_input: {
            justifyContent: 'flex-start',
            flex: 1,
            backgroundColor: '#F5F5F5',
            borderTopRightRadius: scaleHeight(15),
            borderTopLeftRadius: scaleHeight(15),
        },
        input_send: {
            width: '100%',
            flexDirection: 'row',
            gap: scaleWidth(5),
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: scaleWidth(10),

        }

    });

