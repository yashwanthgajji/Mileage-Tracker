import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import FormField from '../../components/FormField'

import { icons, images, avatars } from '../../constants'
import CustomButton from '../../components/CustomButton'
import PassCodeField from '../../components/PassCodeField'
import { addUser } from '../data/UserStorage';
import { useUserStore } from '../../context/GlobalContext'
import { TouchableOpacity } from 'react-native'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useUserStore();
  const [form, setForm] = useState({
    avatar: '',
    name: '',
    nickname: '',
    email: '',
    passcode: '',
    confirmPasscode:  '',
  })
  const [isPasscodeScreen, setIsPasscodeScreen] = useState(false)
  const [isAvatarSelectionScreen, setIsAvatarSelectionScreen] = useState(false)
  
  const submit = () => {
    if (!form.name &&  !form.nickname && !form.email) {
      return Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsPasscodeScreen(true)
  }

  const createUser = () => {
    if(!form.passcode && !form.confirmPasscode) {
      Alert.alert('Error', 'Enter a passcode')
    }
    else if (form.passcode !== form.confirmPasscode) {
      Alert.alert('Error', 'Passcodes do not match')
    } else {
      const userData = {
        id: new Date().getTime(),
        ...form,
      };
      addUser(userData)
      setIsPasscodeScreen(false)
      setUser(userData)
      setIsLoggedIn(true)
      router.replace('/home')
    }
  }

  const avatarArray = Object.values(avatars);
  const onAvatarSelected = (index) => {
    setForm({ ...form, avatar: index})
    setIsAvatarSelectionScreen(false)
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        {
          isPasscodeScreen ? (
            <View className="w-full justify-center items-start h-full px-7 my-6">
              <Text className="text-2xl text-primary-800 font-psemibold mt-4">Set a Passcode</Text>
              <Text className="text-xl text-primary-800 font-pmedium mt-8">
                Enter a 4-Digit Passcode
                <Text className=" text-lg text-red-600 font-pmedium justify-center">*</Text>
              </Text>
              <Text className="text-base text-gray-500 font-pregular mt-2">You will need to enter at every app launch</Text>
              <PassCodeField
                value={form.passcode}
                placeholder={'X X X X'}
                handleChangeText={(e) => setForm({ ...form, passcode: e})}
                otherStyles="mt-4"
              />
              <Text className="text-xl text-primary-800 font-pmedium mt-8">
                Confirm Passcode
                <Text className=" text-lg text-red-600 font-pmedium justify-center">*</Text>
              </Text>
              <PassCodeField
                value={form.confirmPasscode}
                placeholder={'X X X X'}
                handleChangeText={(e) => setForm({ ...form, confirmPasscode: e})}
                otherStyles="mt-4"
              />
              <CustomButton
                title="Continue"
                handlePress={createUser}
                containerStyles="mt-6 w-full"
              />
            </View>
          ) : (
            isAvatarSelectionScreen ? (
              <View className="w-full justify-center items-start h-full px-7 my-6">
                <Text className="text-2xl text-primary-800 font-psemibold mt-7">Select an Avatar</Text>
                <View className=" mt-10 flex-wrap justify-center flex-row w-full py-4 px-4">
                  {avatarArray.map((avatar, index) => (
                    <TouchableOpacity
                      className="w-20 h-20 p-2 justify-center items-center"
                      onPress={() => onAvatarSelected(index)}
                    >
                      <Image
                        source={avatars[`avatar${index}`]}
                        resizeMode='contain'
                        className="w-full h-full"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
                <View className="w-full justify-start items-center h-full px-5 my-7">
                  <Image
                    source={images.logo}
                    resizeMode='contain'
                    className="w-[80px] h-[80px]"
                  />
                  <Text className="text-2xl text-primary-800 text-semibold font-psemibold mt-4">Create Account</Text>
                  <TouchableOpacity
                    className="mt-7"
                    onPress={() => {setIsAvatarSelectionScreen(true)}}
                  >
                    {form.avatar ? (
                    <View className="w-28 h-28 p-1 bg-white rounded-full justify-center items-center">
                      <Image 
                        source={avatars[`avatar${form.avatar}`]}
                        className="w-full h-full"
                        resizeMode='contain'
                      />
                    </View>
                    ) : (
                      <View className="w-28 h-28 px-4 bg-gray-400 rounded-full justify-center items-center">
                        <View className="w-14 h-14 justify-center items-center">
                          <Image 
                            source={icons.upload}
                            className="w-1/2 h-1/2"
                            resizeMode='contain'
                          />
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                  <FormField
                    title="Name"
                    value={form.name}
                    isRequired={true}
                    handleChangeText={(e) => setForm({ ...form, name: e})}
                    otherStyles="mt-4"
                  />
                  <FormField
                    title="NickName"
                    value={form.nickname}
                    isRequired={true}
                    handleChangeText={(e) => setForm({ ...form, nickname: e})}
                    otherStyles="mt-4"
                  />
                  <FormField
                    title="Email"
                    value={form.email}
                    isRequired={true}
                    handleChangeText={(e) => setForm({ ...form, email: e})}
                    otherStyles="mt-4"
                    keyboardType="email-address"
                  />
                  <View className="justify-center h-[120px] bg-white px-6 rounded-xl w-full mt-7">
                    <Text className="text-lg text-black-100 font-pregular "> Do you agree for the terms and conditions!</Text>
                    <CustomButton
                      title="Sign Up"
                      handlePress={submit}
                      containerStyles="mt-2"
                    />
                  </View>
                  <View className="justify-center pt-2 flex-row gap-2">
                    <Text className="text-lg text-gray-800 font-pregular">Have an account allready?</Text>
                    <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
                  </View>
                </View>
              )
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp