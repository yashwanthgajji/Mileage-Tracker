import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import CustomButton from '../../components/CustomButton'

const SignIn = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4">
          <CustomButton
              title="Go to Home"
              handlePress={ () => {router.push('/home')} }
              containerStyles="w-full mt-4"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn