import { StyleSheet, TextInput, View,Text,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import IconIon from 'react-native-vector-icons/Ionicons'

const UserInput = ({value,onChangeText,inputBoxStyle,inputTopic,authBox,isEyeNeeded,passwordVisible,togglePasswordVisibility}) => {

  return (
    <>
        <View style={authBox}>
        <Text style={{color:'#757575',fontWeight:'bold'}}>{inputTopic}</Text>
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
        <TextInput value={value} onChangeText={onChangeText} selectionColor="#BDBDBD" style={[inputBoxStyle,{width:isEyeNeeded?'80%':'100%'}]}  placeholderTextColor='#adb5bd' secureTextEntry={isEyeNeeded?passwordVisible:false}  />
        {
            isEyeNeeded?(
              <TouchableOpacity onPress={togglePasswordVisibility}>
             <IconIon style={{marginLeft:10}} name={passwordVisible?'eye-off-outline':'eye-outline'} size={40}/>
             </TouchableOpacity>
          ):null
         }
        </View>
        </View>

    </>
  )
}

export default UserInput

