import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'

import VehicleCard from '../../components/VehicleCard'
import CustomButton from '../../components/CustomButton'
import EmptyVehicleListView from '../../components/EmptyVehicleListView'
import { useUserStore } from '../../context/GlobalContext'
import { getAllVehiclesByUserId } from '../data/VehicleStorage'

const Vehicles = () => {
  const { user } = useUserStore();
  const [vehicles, setVehicles] = useState([])
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehicles = await getAllVehiclesByUserId(user.id);
      setVehicles(vehicles)
    };
    fetchVehicles();
  }, []);
  console.log(vehicles)

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
                handlePress={() => {router.push('/createVehicle')}}
                containerStyles="mt-7 w-full"
                isRightShown = {true}
              />
              <FlatList
                className="mt-7 mb-36"
                data={vehicles}
                keyExtractor={(item) => {item.$id}}
                renderItem={({item}) => (
                    <View className="w-full">
                      <VehicleCard 
                        vehicle={item}
                      />
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