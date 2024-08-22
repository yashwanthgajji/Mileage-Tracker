import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RefuellingItemView from './RefuellingItemView'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'

const RefuellingList = ({containerStyles, refuels}) => {
  return (
    <View className={containerStyles}>
        <View className="w-full flex-row h-5 mb-4">
            <Text className="flex-initial text-lg text-primary-800 font-psemibold">Refuelling History</Text>
            <Link
                className="ml-auto"
                href="/refuelling"
            >
                <Text className="text-base text-secondary-600 font-pregular">See all</Text>
            </Link>
        </View>
        <View className="w-full max-h-[420px] bg-gray-300 pt-4 flex-col justify-center items-center">
            {refuels.map((refuel, index) => (
                <RefuellingItemView
                    containerStyles="px-4"
                    refuel={refuel}
                />
            ))}
        </View>
    </View>
  )
}

export default RefuellingList