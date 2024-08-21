import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import CustomButton from '../../components/CustomButton'
import PassCodeField from '../../components/PassCodeField'
import { getAllUsers } from '../data/UserStorage'
import { images } from '../../constants'
import { useUserStore } from '../../context/GlobalContext'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useUserStore();
  const [isPasscodeScreen, setIsPasscodeScreen] = useState(false)
  const [form, setForm] = useState({
    userSelected: '',
    passcode: '',
  })
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users)
    };
    fetchUsers();
  }, []);

  const selectUser = (userId) => {
    setForm({ ...form,  userSelected: userId })
    setIsPasscodeScreen(true)
  }
  const login = () => {
    if (!form.passcode) {
      Alert.alert('Error', 'Please enter a passcode')
    } else {
      const user = users.find(user => user.id === form.userSelected)
      if (user && user.passcode === form.passcode) {
        setUser(userData)
        setIsLoggedIn(true)
        router.replace('/home')
      } else {
        Alert.alert('Error', 'Invalid passcode')
      }
    }
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
          {
            isPasscodeScreen ? (
              <View className="w-full justify-center items-start h-full px-7 my-6">
                <Text className="text-2xl text-primary-800 font-psemibold mt-4">Welcome back!</Text>
                <Text className="text-xl text-primary-800 font-pmedium mt-8">
                  Enter your 4-Digit Passcode
                  <Text className=" text-lg text-red-600 font-pmedium justify-center">*</Text>
                </Text>
                <Text className="text-base text-gray-500 font-pregular mt-2">Just checking it's really you!</Text>
                <PassCodeField
                  value={form.passcode}
                  placeholder={'X X X X'}
                  handleChangeText={(e) => setForm({ ...form, passcode: e})}
                  otherStyles="mt-4"
                />
                <CustomButton
                  title="Continue"
                  handlePress={login}
                  containerStyles="mt-6 w-full"
                />
              </View>
            ) : (
              <View className="w-full justify-center items-center h-full px-5 my-6">
                <Image
                  source={images.logo}
                  resizeMode='contain'
                  className="w-[80px] h-[80px]"
                />
                <Text className="text-xl text-primary-800 text-semibold font-psemibold mt-10">Who are you?</Text>
                <View className="w-full px-4 justify-center items-center flex-col">
                  {users.map((user, index) => (
                    <CustomButton
                      title={user.nickname}
                      containerStyles="w-full mt-4"
                      handlePress={() => selectUser(user.id)}
                    />
                  ))}
                </View>
                <CustomButton
                  title="Sign in"
                  handlePress={ selectUser }
                  containerStyles="w-full mt-4"
                />
                <Link href="/sign-up" className="text-lg font-psemibold text-secondary mt-4">Sign Up</Link>
              </View>
            )
          }
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn