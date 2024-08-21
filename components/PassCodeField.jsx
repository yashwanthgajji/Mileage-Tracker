import { View, Text, TextInput } from 'react-native'
import React from 'react'

const PassCodeField = ({otherStyles, value, placeholder, handleChangeText}) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
        className="border-2 border-black w-full h-16 px-4 bg-background-200 rounded-2xl focus:border-secondary items-center flex-row"
      >
        <TextInput
            className="flex-1 text-black font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            keyboardType="number-pad"
            maxLength={4}
        />
      </View>
    </View>
  )
}

export default PassCodeField