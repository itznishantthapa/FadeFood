import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { styles } from '../../style/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import IntroText from '../../components/auth/IntroText';

const VerificationScreen = () => {
    const [pin, setPin] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (text: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);
        // Move to the next input box if the current one is filled
        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
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
                            onChangeText={(text) => handleChange(text, index)}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>

    );
};
export default VerificationScreen;