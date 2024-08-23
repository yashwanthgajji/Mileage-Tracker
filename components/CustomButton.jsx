import { TouchableOpacity, Text, Image, View } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isDisabled, isRightShown, isAddShown}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-primary-800 rounded-xl min-h-[48px] justify-center items-center ${containerStyles} ${isDisabled ? 'opacity-50' : ''}`}
        disabled={isDisabled}
    >
      <View className="flex-row items-center justify-center space-x-1">
        <Text className={`text-gray-50 font-pse text-lg ${textStyles}`}>
          {title}
        </Text>
        {
          isRightShown && (
            <Image 
              source={icons.right}
              className="w-6 h-6"
              resizeMode='contain'
            />
          )
        }
        {
          isAddShown && (
            <Image 
              source={icons.plus}
              className="w-4 h-4"
              resizeMode='contain'
            />
          )
        }
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton