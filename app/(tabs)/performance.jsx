import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import MoneySpendChartView from '../../components/MoneySpendChartView'
import VehicleMileageChartView from '../../components/VehicleMileageChartView'
import FuelInsightsView from '../../components/FuelInsightsView'
import { useUserStore } from '../../context/GlobalContext'
import { getAllVehiclesByUserId } from '../data/VehicleStorage'
import { getAllRefuelsByVehicleId } from '../data/RefuelStorage'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'
import EmptyVehicleListView from '../../components/EmptyVehicleListView'

const Performance = () => {
  const { user, vehicleSelected, setVehicleSelected } = useUserStore();
  const [vehicles, setVehicles] = useState([])
  const [vehicleListData, setVehicleListData] = useState([]);
  const [refuels, setRefuels] = useState([])

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
    setRefreshing(false)
  }
  
  const setVehicleValue = async (val) => {
    // console.log(val)
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id == val);
    setVehicleSelected(selectedVehicle);
    const refuels = await getAllRefuelsByVehicleId(val);
    setRefuels(refuels);
    // console.log(refuels)
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
        <View className="w-full justify-center items-center px-5 my-10">
          <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Performance</Text>
          {
            vehicles.length == 0 ? (
              <EmptyVehicleListView
                containerStyles="mt-24"
              />
            ) : (
              <View className="w-full flex flex-col items-center justify-center">
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
                {
                  refuels.length == 0 ? (
                    <EmptyRefuellingView 
                      containerStyles="mt-24"
                    />
                  ) : (
                    <View className="w-full">
                      <FuelInsightsView 
                        containerStyles="mt-7"
                        refuels = {refuels}
                      />
                      <MoneySpendChartView
                        containerStyles="mt-7"
                        refuels={refuels}
                      />
                      <VehicleMileageChartView
                        containerStyles="mt-7"
                        refuels={refuels}
                      />
                    </View>
                  )
                }
              </View>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Performance