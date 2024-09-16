import { View, Text, SafeAreaView, FlatList, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RefuellingItemView from '../../components/RefuellingItemView'
import CustomButton from '../../components/CustomButton'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'
import { useUserStore } from '../../context/GlobalContext'
import { getAllVehiclesByUserId } from '../data/VehicleStorage'
import { getAllRefuelsByVehicleId } from '../data/RefuelStorage'
import { router } from 'expo-router'
import EmptyVehicleListView from '../../components/EmptyVehicleListView'
import SelectDropDown from '../../components/SelectDropDown'

const Refuelling = () => {
  const { user, vehicleSelected, setVehicleSelected, setRefuelForEdit, vehicleCounter, refuelCounter } = useUserStore();
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
  }, [vehicleCounter]);

  useEffect(() => {
    if (vehicleSelected) {
      getLatestRefuels(vehicleSelected.id)
    }
  }, [refuelCounter]);

  const [vehiclesRefreshing, setVehiclesRefreshing] = useState(false)
  const onVehiclesRefresh = async () => {
    setVehiclesRefreshing(true)
    await fetchVehicles()
    setVehicleSelected(null)
    setVehiclesRefreshing(false)
  }

  const getLatestRefuels = async (val) => {
    console.log(val)
    const refuels = await getAllRefuelsByVehicleId(val);
    setRefuels(refuels);
    // console.log(refuels)
  }

  const setVehicleValue = async (val) => {
    // console.log(val)
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id == val);
    setVehicleSelected(selectedVehicle);
    getLatestRefuels(val)
  }

  const editRefuel = (item) => {
    setRefuelForEdit(item)
    router.push('editRefuel')
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="w-full h-full justify-start items-center px-5 my-10">
        <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Refuelling History</Text>
        {
          vehicles.length == 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={vehiclesRefreshing}
                  onRefresh={onVehiclesRefresh}
                />
              }
            >
              <EmptyVehicleListView
                containerStyles="mt-24"
              />
            </ScrollView>
          ) : (
            <View className="w-full h-full justify-start items-center">
              <SelectDropDown
                setValue={setVehicleValue}
                data={vehicleListData}
                save={"key"}
                placeholder="Select a vehicle"
                notFoundText='No Vehicle Found'
                defaultOption={{ key: vehicleSelected?.id, value: vehicleSelected?.name }}
                containerStyles="mt-6"
              />
              {
                refuels.length == 0 ? (
                  <ScrollView
                    refreshControl={
                      <RefreshControl
                        refreshing={vehiclesRefreshing}
                        onRefresh={onVehiclesRefresh}
                      />
                    }
                  >
                    <EmptyRefuellingView 
                      containerStyles="mt-24"
                      isDisabled={vehicleSelected == null}
                    />
                  </ScrollView>
                ) : (
                  <View className="w-full justify-center items-center">
                    <CustomButton
                      title="Add Refuelling"
                      handlePress={() => {router.push('/createRefuel')}}
                      containerStyles="mt-7 w-full"
                      isRightShown = {true}
                    />
                    <FlatList
                      className="mt-7 mb-36"
                      data={refuels}
                      keyExtractor={(item) => {item.$id}}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => {editRefuel(item)}}
                        >
                          <RefuellingItemView
                            refuel={item}
                          />
                        </TouchableOpacity>
                      )}
                      refreshControl={
                        <RefreshControl
                          refreshing={vehiclesRefreshing}
                          onRefresh={onVehiclesRefresh}
                        />
                      }
                    />
                  </View>
                )
              }
            </View>
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default Refuelling