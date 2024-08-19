import { View, Text, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity, Picker } from 'react-native'
import React, { useState } from 'react'

import EmptyVehicleListView from '../../components/EmptyVehicleListView'
import {icons, images} from '../../constants'
import EmptyRefuellingView from '../../components/EmptyRefuellingView'
import { SelectList } from 'react-native-dropdown-select-list'
import VehicleDisplay from '../../components/VehicleDisplay'
import RefuellingItemView from '../../components/RefuellingItemView'

const Home = () => {
  const [vehicleSelected, setVehicleSelected] = useState('')

  posts = [{id: 1}, {id: 2}]
  const data = [
    { key: '1', value: 'Java' },
    { key: '2', value: 'JavaScript' },
    { key: '3', value: 'Python' },
  ];

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView >
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
        <Text className="font-pbold text-3xl text-secondary-600 mt-4">Hi, Snack Muncher</Text>
        {
          posts.length != 0 ? (
            <View className="w-full justify-center items-center mt-2">
              <Text className="text-xl font-pregular text-primary-800 text-center px-6">Here is everything about your</Text>
              <SelectList
                setSelected={(val) => setVehicleSelected(val)}
                data={data}
                save="value"
                placeholder="Select a vehicle"
                boxStyles={{width:256, marginTop: 24}}
                maxHeight={120}
                dropdownItemStyles={{padding: 20}}
                dropdownStyles={{backgroundColor: '#60a5fa'}}
                dropdownTextStyles={{color: '#1E1E2D'}}
                notFoundText='No Vehicle Found'
              />
              <VehicleDisplay 
                containerStyles = "mt-4"
              />
              {/* <EmptyRefuellingView/> */}
              <RefuellingItemView
                containerStyles="mt-7 mx-3"
                date="Wed, 22 Dec'23"
                fuel="11.5L"
                cost="+Rs:350.54"
              />
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