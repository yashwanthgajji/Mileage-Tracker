import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'

import EmptyVehicleListView from '../../components/EmptyVehicleListView'
import {icons, images} from '../../constants'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'
import VehicleDisplay from '../../components/VehicleDisplay'
import RefuellingList from '../../components/RefuellingList'
import FuelInsightsView from '../../components/FuelInsightsView'
import MoneySpendChartView from '../../components/MoneySpendChartView'
import VehicleMileageChartView from '../../components/VehicleMileageChartView'
import { useUserStore } from '../../context/GlobalContext'
import { getAllVehiclesByUserId } from '../data/VehicleStorage'
import { getTop5RefuelsByVehicleId, getAllRefuelsByVehicleId } from '../data/RefuelStorage'
import { router } from 'expo-router'
import SelectDropDown from '../../components/SelectDropDown'

const Home = () => {
  const { user, vehicleSelected, setVehicleSelected } = useUserStore();
  const [vehicles, setVehicles] = useState([])
  const [vehicleListData, setVehicleListData] = useState([]);
  const [refuels, setRefuels] = useState([])
  const [top5Refuels, setTop5Refuels] = useState([])
  
  const fetchVehicles = async () => {
    const vehicles = await getAllVehiclesByUserId(user.id);
    setVehicles(vehicles)
    const vehicleListData = vehicles.map((vehicle) => ({
      key: vehicle.id,
      value: vehicle.name,
    }));
    setVehicleListData(vehicleListData);
  };
  useEffect(() => {
    fetchVehicles();
  }, []);

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await fetchVehicles()
    setVehicleSelected(null)
    setRefreshing(false)
  }

  const setVehicleValue = async (val) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id == val);
    setVehicleSelected(selectedVehicle);
    const refuels = await getAllRefuelsByVehicleId(val);
    const top5Refuels = await getTop5RefuelsByVehicleId(val);
    setRefuels(refuels);
    setTop5Refuels(top5Refuels);
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <View className="w-full justify-center items-center h-full px-5 my-10">
        <TouchableOpacity
          className="w-full items-start"
          onPress={() => {router.push('/profile')}}
        >
          <Image
            source={icons.profile}
            className="w-8 h-8"
            resizeMode='contain'
          />
        </TouchableOpacity>
        <Image
          source={images.logo}
          resizeMode='contain'
          className="w-[48px] h-[48px]"
        />
        <Text className="font-pbold text-3xl text-secondary-600 mt-4">Hi, {user.nickname}</Text>
        {
          vehicles.length != 0 ? (
            <View className="w-full justify-center items-center mt-2">
              <Text className="text-xl font-pregular text-primary-800 text-center px-6">Here is everything about your</Text>
              <SelectDropDown
                setValue={setVehicleValue}
                data={vehicleListData}
                save={"key"}
                placeholder={"Select a vehicle"}
                notFoundText={"No Vehicle Found"}
                defaultOption={{ key: vehicleSelected?.id, value: vehicleSelected?.name }}
                containerStyles="mt-6"
              />
              {vehicleSelected ? (
                <View className="w-full justify-center items-center mt-2">
                  <VehicleDisplay 
                    containerStyles = "mt-4"
                    vehicle={vehicleSelected}
                  />
                  {
                    refuels.length == 0 ? (
                      <EmptyRefuellingView
                        isDisabled={vehicleSelected == null}
                      />
                    ) : (
                      <View>
                        <FuelInsightsView 
                          containerStyles="mt-7"
                          refuels={refuels}
                        />
                        <MoneySpendChartView
                          containerStyles="mt-7"
                          refuels={refuels}
                        />
                        <VehicleMileageChartView
                          containerStyles="mt-7"
                          refuels={refuels}
                        />
                        <RefuellingList 
                          containerStyles="mt-7 mb-4"
                          refuels={top5Refuels}
                        />
                      </View>
                    )
                  }
                </View>
              ) : (
                <View className="mt-10 w-full h-48 bg-gray-50 border-2 border-primary-800 rounded-xl flex-col justify-center items-center space-y-4">
                  <Image
                    source={images.garage}
                    className="h-20 w-20"
                    resizeMode='contain'
                  />
                  <Text className="text-lg font-pmedium text-secondary-600 text-center mx-12" numberOfLines={2}>Select a vehicle from your garage to view its data</Text>
                </View>
              )}
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