import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

import CustomButton from '../components/CustomButton'

const EmptyRefuellingView = ({ containerStyles }) => {
  return (
    <View className={`justify-center items-center w-full h-[320px] flex-col space-y-4 ${containerStyles}`}>
      <Image
        source={images.cloud}
        className="w-24 h-24"
        resizeMode='contain'
      />
      <Text className="text-xl font-pregular text-primary-800 text-center px-4">It's time to add the refuelling details to get more insights</Text>
      <CustomButton
        title="Add Refuelling"
        handlePress={() => {}}
        containerStyles="mt-7 w-[216px]"
        isRightShown = {true}
      />
    </View>
  )
}

export default EmptyRefuellingView