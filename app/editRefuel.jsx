import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { useUserStore } from '../context/GlobalContext'
import { updateRefuel } from './data/RefuelStorage'

const editRefuel = () => {
    const { refuelForEdit, setRefuelForEdit } = useUserStore();
    const [refuel, setRefuel] = useState({ ...refuelForEdit });

    const refuelUpdate = () => {
        if (!refuel.fuel && !refuel.cost && !refuel.totalKm) {
            Alert.alert('Error', 'Please fill all fields')
        } else {
            console.log(refuel)
            updateRefuel(refuel.id, refuel)
            setRefuelForEdit(null)
            router.back()
        }
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-5 my-6">
                    <Text className="text-2xl text-primary-800 text-semibold font-psemibold mt-4">Edit Refuel</Text>
                    <FormField
                        title="Fuel Added"
                        value={refuel.fuel}
                        isRequired={true}
                        handleChangeText={(e) => setRefuel({ ...refuel, fuel: e })}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <FormField
                        title="Cost"
                        value={refuel.cost}
                        isRequired={true}
                        handleChangeText={(e) => setRefuel({ ...refuel, cost: e })}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <FormField
                        title="Total KM"
                        subtitle="Total KM on you vehicle speedometer"
                        value={refuel.totalKm}
                        isRequired={true}
                        handleChangeText={(e) => setRefuel({ ...refuel, totalKm: e })}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <View className="w-full flex-row mt-4">
                        <CustomButton
                            title="Cancel"
                            handlePress={() => {
                                setRefuelForEdit(null)
                                router.back()
                            }}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                        <CustomButton
                            title="Update"
                            handlePress={refuelUpdate}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default editRefuel