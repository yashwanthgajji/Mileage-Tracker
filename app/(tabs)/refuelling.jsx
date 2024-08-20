import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import RefuellingItemView from '../../components/RefuellingItemView'
import { SelectList } from 'react-native-dropdown-select-list'
import CustomButton from '../../components/CustomButton'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'

const Refuelling = () => {
  const [vehicleSelected, setVehicleSelected] = useState('')

  const data = [
    { key: '1', value: 'Java' },
    { key: '2', value: 'JavaScript' },
    { key: '3', value: 'Python' },
  ];
  const refuels = [
    { id: 1, date: "Wed, 22 Dec'23", fuel: "2.5L", cost: "+Rs:150.54" },
    { id: 2, date: "Fri, 1 Feb'24", fuel: "1L", cost: "+Rs:90.24" },
    { id: 3, date: "Sun, 15 Apr'24", fuel: "3.1L", cost: "+Rs:300" },
    { id: 4, date: "Wed, 22 Dec'23", fuel: "2.5L", cost: "+Rs:150.54" },
    { id: 5, date: "Fri, 1 Feb'24", fuel: "1L", cost: "+Rs:90.24" },
    { id: 6, date: "Sun, 15 Apr'24", fuel: "3.1L", cost: "+Rs:300" },
    { id: 7, date: "Wed, 22 Dec'23", fuel: "2.5L", cost: "+Rs:150.54" },
    { id: 8, date: "Fri, 1 Feb'24", fuel: "1L", cost: "+Rs:90.24" },
    { id: 9, date: "Sun, 15 Apr'24", fuel: "3.1L", cost: "+Rs:300" },
  ]
  // const refuels = []
  return (
    <SafeAreaView className="bg-background h-full">
      <View className="w-full h-full justify-start items-center px-5 my-10">
        <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Refuelling History</Text>
        <SelectList
          setSelected={(val) => setVehicleSelected(val)}
          data={data}
          save="value"
          placeholder="Select a vehicle"
          boxStyles={{width:360, marginTop: 24}}
          maxHeight={120}
          dropdownItemStyles={{padding: 20}}
          dropdownStyles={{backgroundColor: '#bfdbfe'}}
          dropdownTextStyles={{color: '#1E1E2D'}}
          notFoundText='No Vehicle Found'
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
                className="mt-7"
                data={refuels}
                keyExtractor={(item) => {item.$id}}
                renderItem={({item}) => (
                    <RefuellingItemView
                        date={item.date}
                        fuel={item.fuel}
                        cost={item.cost}
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