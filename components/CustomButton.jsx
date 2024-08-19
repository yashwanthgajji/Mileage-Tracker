import { TouchableOpacity, Text, Image, View } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading, isRightShown}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-primary-800 rounded-xl min-h-[48px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
      <View className="flex-row items-center justify-center space-x-1">
        <Text className={`text-gray-50 font-pse text-lg ${textStyles}`}>
          {title}
        </Text>
        {isRightShown && (
          <Image 
            source={icons.right}
            className="w-[24px] h-[24px]"
            resizeMode='contain'
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton