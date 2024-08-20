import { View, Text, SafeAreaView, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import RefuellingItemView from '../../components/RefuellingItemView'
import { SelectList } from 'react-native-dropdown-select-list'
import MoneySpendChartView from '../../components/MoneySpendChartView'
import VehicleMileageChartView from '../../components/VehicleMileageChartView'
import FuelInsightsView from '../../components/FuelInsightsView'

const Performance = () => {
  const [vehicleSelected, setVehicleSelected] = useState('')

  const data = [
    { key: '1', value: 'Java' },
    { key: '2', value: 'JavaScript' },
    { key: '3', value: 'Python' },
  ];

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View className="w-full justify-center items-center px-5 my-10">
          <Text className="text-2xl text-start w-full mt-7 text-primary-800 font-psemibold">Performance</Text>
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
          <View className="w-full">
            <FuelInsightsView 
              containerStyles="mt-7"
              avgFuel={"25 km/L"}
              lastFuel={"20 km/L"}
            />
            <MoneySpendChartView
              containerStyles="mt-7"
              months={["January", "February", "March", "April", "May"]}
              moneySpent={[2000, 1400, 3400, 1800, 2000]}
            />
            <VehicleMileageChartView
              containerStyles="mt-7"
              months={["January", "February", "March", "April", "May"]}
              moneySpent={[15, 20, 32, 12, 20]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Performance