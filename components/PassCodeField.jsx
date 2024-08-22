import { View, Text, TextInput } from 'react-native'
import React from 'react'
import OTPTextView from 'react-native-otp-textinput'

const PassCodeField = ({otherStyles, value, placeholder, handleChangeText}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <OTPTextView
          handleTextChange={handleChangeText}
          placeholder='X'
          inputCount={4}
          tintColor='#ea580c'
          offTintColor='#1e40af'
          textInputStyle={{
            backgroundColor: "#e5e7eb",
            borderWidth: 4,
            borderRadius: 20,
            width: 80,
            height: 80,
            textAlign: 'center',
            fontSize: 24,
          }}
      />
    </View>
  )
}

export default PassCodeField