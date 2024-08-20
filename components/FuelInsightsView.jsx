import { View, Text } from 'react-native'
import React from 'react'

const FuelInsightsView = ({containerStyles, avgFuel, lastFuel}) => {
  return (
    <View className={containerStyles}>
        <View className="w-full flex-row h-5 mb-4">
            <Text className="flex-initial text-lg text-primary-800 font-psemibold">Fuel Insights</Text>
        </View>
        <View className="w-full h-[128px] py-4 bg-gray-300 flex-row justify-center items-center px-4 space-x-4">
            <View className="bg-white justify-center items-center h-full w-full rounded-lg flex-col flex-1 p-2">
                <Text numberOfLines={2} className=" w-full text-start text-lg text-black-200 font-psemibold">Avg Fuel Consumption</Text>
                <Text className="text-start w-full text-lg text-primary-800 font-psemibold mt-2">{avgFuel}</Text>
            </View>
            <View className="bg-white justify-center items-center h-full w-full rounded-lg flex-col flex-1 p-2">
                <Text numberOfLines={2} className=" w-full text-start text-lg text-black-200 font-psemibold">Last Fuel Consumption</Text>
                <Text className="text-start w-full text-lg text-primary-800 font-psemibold mt-2">{lastFuel}</Text>
            </View>
        </View>
    </View>
  )
}

export default FuelInsightsView