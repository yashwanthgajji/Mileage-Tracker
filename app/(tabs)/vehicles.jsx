import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import VehicleCard from '../../components/VehicleCard'

const Vehicles = () => {
  const vehicles = [{id: 1}, {id: 2}, {id: 3}]
  return (
    <SafeAreaView className="bg-background h-full">
      <View className="w-full justify-center items-center px-5 my-10">
        <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Vehicles</Text>
        <FlatList
          className="mt-7"
          data={vehicles}
          keyExtractor={(item) => {item.$id}}
          renderItem={({item}) => (
              <View className="w-full">
                <VehicleCard />
              </View>
          )}
        />
    </View>
    </SafeAreaView>
  )
}

export default Vehicles