import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import CustomButton from '../components/CustomButton'

const index = () => {
  return (
    <SafeAreaView className="bg-gray-100 h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <CustomButton
            title="Continue with Email"
            handlePress={ () => {router.push('/sign-up')} }
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index