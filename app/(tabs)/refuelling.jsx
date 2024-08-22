import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import RefuellingItemView from '../../components/RefuellingItemView'
import { SelectList } from 'react-native-dropdown-select-list'
import CustomButton from '../../components/CustomButton'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'
import { useUserStore } from '../../context/GlobalContext'
import { getAllVehiclesByUserId } from '../data/VehicleStorage'
import { getAllRefuels, getAllRefuelsByVehicleId } from '../data/RefuelStorage'

const Refuelling = () => {
  const { user, vehicleSelected, setVehicleSelected } = useUserStore();
  const [vehicles, setVehicles] = useState([])
  const [vehicleListData, setVehicleListData] = useState([]);
  const [refuels, setRefuels] = useState([])
  // if(vehicleSelected) {
  //   getAllRefuelsByVehicleId(vehicleSelected.id).then((refuels) => {
  //     setRefuels(refuels);
  //   });
  // }
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
    console.log(val)
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id == val);
    setVehicleSelected(selectedVehicle);
    const refuels = await getAllRefuelsByVehicleId(val);
    setRefuels(refuels);
    console.log(refuels)
  }

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="w-full h-full justify-start items-center px-5 my-10">
        <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Refuelling History</Text>
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
            <View className="w-full justify-center items-center">
              <CustomButton
                title="Add Refuelling"
                handlePress={() => {}}
                containerStyles="mt-7 w-full"
                isRightShown = {true}
              />
              <FlatList
                className="mt-7 mb-36"
                data={refuels}
                keyExtractor={(item) => {item.$id}}
                renderItem={({item}) => (
                    <RefuellingItemView
                      refuel={item}
                    />
                )}
              />
            </View>
          )
        }  
      </View>
    </SafeAreaView>
  )
}

export default Refuelling