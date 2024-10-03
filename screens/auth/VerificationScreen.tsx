import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Text } from 'react-native';
import { styles } from '../../style/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';
import Button from '../../components/auth/Button';

const VerificationScreen = () => {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputRefs = useRef([]); // Refs to control focus of each TextInput

    const handleChange = (text: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);

        // Move to the next input box if the current one is filled
        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace functionality
        if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // Move to the previous input
        }
    };

    return (
        <SafeAreaView>
            <StatusBar hidden={false} backgroundColor='#F5F5F5' style='dark' />
            <View style={styles.mainViewStyle}>
                <IntroText
                    headingText='Verification,'
                    line1='Enter the code sent to'
                    line2='your email'
                    style={[styles.BigText_for_login, { marginBottom: 0 }]}
                />

                <View style={styles.verifyBoxContainer}>
                    {pin.map((p, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={styles.verifyInputBox}
                            keyboardType="numeric"
                            maxLength={1}
                            value={p}
                            selectionColor="#BDBDBD"
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)} // Backspace handling
                        />
                    ))}
                </View>

                <Button
                    style={styles.loginButton}
                    btnText='Verify'
                    handleAuthBtn={() => console.log('verify btn is pressed')}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', marginTop: 10, fontSize: 15 }}>Didn&#39;t receive code ?</Text>
                    <TouchableWithoutFeedback onPress={() => console.log('resending code')}>
                        <Text style={{ color: '#4CAF50', marginTop: 10, fontSize: 18 }}> resend</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VerificationScreen;
