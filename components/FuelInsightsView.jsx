import { View, Text } from 'react-native'
import React from 'react'

const FuelInsightsView = ({ containerStyles, refuels }) => {

    const mileage = refuels.map((refuel, index) => {
        if (index === 0) return 0;
        const previousRefuel = refuels[index - 1];
        const mileage = previousRefuel.totalKm - refuel.totalKm;
        return mileage;
    });
    const avgMileage = mileage.reduce((acc, current) => acc + current, 0) / mileage.length;

    return (
        <View className={containerStyles}>
            <View className="w-full flex-row h-5 mb-4">
                <Text className="flex-initial text-lg text-primary-800 font-psemibold">Fuel Insights</Text>
            </View>
            <View className="w-full h-[128px] py-4 bg-gray-300 flex-row justify-center items-center px-4 space-x-4">
                <View className="bg-white justify-center items-center h-full w-full rounded-lg flex-col flex-1 p-2">
                    <Text numberOfLines={2} className=" w-full text-start text-lg text-black-200 font-psemibold">Avg Fuel Consumption</Text>
                    <Text className="text-start w-full text-lg text-primary-800 font-psemibold mt-2">{avgMileage.toFixed(2)}KM/L</Text>
                </View>
                <View className="bg-white justify-center items-center h-full w-full rounded-lg flex-col flex-1 p-2">
                    <Text numberOfLines={2} className=" w-full text-start text-lg text-black-200 font-psemibold">Last Fuel Consumption</Text>
                    <Text className="text-start w-full text-lg text-primary-800 font-psemibold mt-2">{mileage[mileage.length - 1]}KM/L</Text>
                </View>
            </View>
        </View>
    )
}

export default FuelInsightsView