import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

import FormField from '../../components/FormField'

import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    email: ''
  })
  const [isSubmitting, setIsSubmittion] = useState(false)
  const submit = () => {

  }
  return (
    <SafeAreaView className="bg-gray-100 h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-2">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[120px] h-[120px]"
          />
          <Text className="text-2xl text-gray-900 text-semibold font-psemibold">Create Account</Text>
          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles="mt-7"
          />
          <FormField
            title="NickName"
            value={form.nickname}
            handleChangeText={(e) => setForm({ ...form, nickname: e})}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <View className="justify-center h-[120px] bg-white p-8 rounded-xl w-full mt-7">
            <Text className="text-lg text-black-100 font-pregular "> Do you agree for the terms and conditions!</Text>
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-2"
              isLoading={isSubmitting}
            />
          </View>
          <View className="justify-center pt-2 flex-row gap-2">
            <Text className="text-lg text-gray-800 font-pregular">Have an account allready?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-orange-400">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp