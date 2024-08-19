import { View, Text, SafeAreaView, FlatList, ScrollView, Image } from 'react-native'
import React from 'react'
import EmptyVehicleListView from '../../components/EmptyVehicleListView'

import {images} from '../../constants'

const Home = () => {
  posts = [{id: 1}, {id: 2}]
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView >
      <View className="w-full justify-center items-center h-full px-5 my-10">
        <Image
          source={images.logo}
          resizeMode='contain'
          className="w-[40px] h-[40px]"
        />
        <Text className="font-pbold text-3xl text-secondary-600 mt-8">Hi, Snack Muncher</Text>
        {
          posts.length == 0 ? (
            <Text></Text>
          ) : (
            <View className="w-full justify-center items-center mt-8">
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