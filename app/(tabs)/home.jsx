import { View, Text, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity, Picker } from 'react-native'
import React, { useEffect, useState } from 'react'

import EmptyVehicleListView from '../../components/EmptyVehicleListView'
import {icons, images} from '../../constants'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'
import { SelectList } from 'react-native-dropdown-select-list'
import VehicleDisplay from '../../components/VehicleDisplay'
import RefuellingList from '../../components/RefuellingList'
import FuelInsightsView from '../../components/FuelInsightsView'
import MoneySpendChartView from '../../components/MoneySpendChartView'
import VehicleMileageChartView from '../../components/VehicleMileageChartView'
import { useUserStore } from '../../context/GlobalContext'
import { getAllVehiclesByUserId } from '../data/VehicleStorage'
import { getTop5RefuelsByVehicleId, getAllRefuelsByVehicleId } from '../data/RefuelStorage'

const Home = () => {
  const { user, vehicleSelected, setVehicleSelected } = useUserStore();
  const [vehicles, setVehicles] = useState([])
  const [vehicleListData, setVehicleListData] = useState([]);
  const [refuels, setRefuels] = useState([])
  const [top5Refuels, setTop5Refuels] = useState([])
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehicles = await getAllVehiclesByUserId(user.id);
      setVehicles(vehicles)
      const vehicleListData = vehicles.map((vehicle) => ({
        key: vehicle.id,
        value: vehicle.name,
      }));
      setVehicleListData(vehicleListData);
    };
    fetchVehicles();
  }, []);

  const setVehicleValue = async (val) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id == val);
    setVehicleSelected(selectedVehicle);
    const refuels = await getAllRefuelsByVehicleId(val);
    const top5Refuels = await getTop5RefuelsByVehicleId(val);
    setRefuels(refuels);
    setTop5Refuels(top5Refuels);
  }
  // const refuels= []

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
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
        <Text className="font-pbold text-3xl text-secondary-600 mt-4">Hi, {user.nickname}</Text>
        {
          vehicles.length != 0 ? (
            <View className="w-full justify-center items-center mt-2">
              <Text className="text-xl font-pregular text-primary-800 text-center px-6">Here is everything about your</Text>
              <SelectList
                setSelected={(val) => setVehicleValue(val)}
                data={vehicleListData}
                save="key"
                placeholder="Select a vehicle"
                boxStyles={{width:360, marginTop: 24}}
                maxHeight={120}
                dropdownItemStyles={{padding: 20}}
                dropdownStyles={{backgroundColor: '#bfdbfe'}}
                dropdownTextStyles={{color: '#1E1E2D'}}
                notFoundText='No Vehicle Found'
                defaultOption={{ key: vehicleSelected?.id, value: vehicleSelected?.name }}
              />
              {vehicleSelected ? (
                <View className="w-full justify-center items-center mt-2">
                  <VehicleDisplay 
                    containerStyles = "mt-4"
                    vehicle={vehicleSelected}
                  />
                  {
                    refuels.length == 0 ? (
                      <EmptyRefuellingView/>
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
                <View></View>
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