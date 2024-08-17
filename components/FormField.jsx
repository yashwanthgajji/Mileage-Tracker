import { View, Text, TextInput,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg text-gray-900 font-pregular">{title}</Text>
      <View
        className="border-2 border-black w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-orange-500 items-center flex-row"
      >
        <TextInput
            className="flex-1 text-black font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
        />
      </View>
    </View>
  )
}

export default FormField