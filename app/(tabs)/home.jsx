import { View, Text, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import EmptyVehicleListView from '../../components/EmptyVehicleListView'
import {icons, images} from '../../constants'
import { Dropdown } from 'react-native-element-dropdown'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'

const Home = () => {
  posts = [{id: 1}, {id: 2}]
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView >
      <View className="w-full justify-center items-center h-full px-5 my-10">
        <TouchableOpacity
          className="w-full items-start"
          onPress={() => {}}
        >
          <Image
            source={icons.profile}
            className="w-6 h-6"
            resizeMode='contain'
          />
        </TouchableOpacity>
        <Image
          source={images.logo}
          resizeMode='contain'
          className="w-[48px] h-[48px]"
        />
        <Text className="font-pbold text-3xl text-secondary-600 mt-4">Hi, Snack Muncher</Text>
        {
          posts.length != 0 ? (
            <View className="w-full justify-center items-center mt-2">
              <Text className="text-xl font-pregular text-primary-800 text-center px-6">Here is everything about your</Text>
              <EmptyRefuellingView
                containerStyles = "mt-4"
              />
            </View>
          ) : (
            <View className="w-full justify-center items-center mt-2">
              <Text className="text-xl font-pregular text-primary-800 text-center px-6">Track your miles towards a prosperous financial journey!</Text>
              <EmptyVehicleListView
                containerStyles = "mt-4"
              />
            </View>
          )
        }
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home