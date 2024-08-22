import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

import {images} from '../constants'

const SplashScreenComponent = () => {
  return (
    <View className="h-full w-full bg-secondary justify-center items-center">
        <View className="rounded-full bg-white w-12 h-12">
            <Image 
                source={images.logo}
                className="w-full h-full p-2"
            />
        </View>
    </View>
  )
}

export default SplashScreenComponent