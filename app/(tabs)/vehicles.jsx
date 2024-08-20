import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import VehicleCard from '../../components/VehicleCard'
import CustomButton from '../../components/CustomButton'
import EmptyVehicleListView from '../../components/EmptyVehicleListView'

const Vehicles = () => {
  const vehicles = [{id: 1}, {id: 2}, {id: 3}]
  // const vehicles = []
  return (
    <SafeAreaView className="bg-background h-full">
      <View className="w-full h-full justify-start items-center px-5 my-10">
        <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Vehicles</Text>
        {
          vehicles.length == 0 ? (
            <EmptyVehicleListView
              containerStyles="mt-24"
            />
          ) : (
            <View className="w-full justify-center items-center">
              <CustomButton
                title="Add Vehicle"
                handlePress={() => {}}
                containerStyles="mt-7 w-full"
                isRightShown = {true}
              />
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
          )
        }
        
    </View>
    </SafeAreaView>
  )
}

export default Vehicles