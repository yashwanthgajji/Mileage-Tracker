import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { useUserStore } from '../context/GlobalContext'
import { addRefuel } from './data/RefuelStorage'

const createRefuel = () => {
    const {refuelCounter, setRefuelCounter}  = useUserStore()

    const [form, setForm] = useState({
        fuel: '',
        cost: '',
        totalKm: '',
    })
    const { vehicleSelected } = useUserStore();

    const addNewRefuel = async () => {
        if (!form.fuel && !form.cost && !form.totalKm) {
            Alert.alert('Error', 'Please fill all fields')
        } else {
            const refuelData = {
                id: new Date().getTime(),
                vehicleId: vehicleSelected.id,
                date:  new Date().getTime(),
                ...form,
            }
            await addRefuel(refuelData)
            setRefuelCounter(refuelCounter + 1)
            router.back()
        }
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-5 my-6">
                    <Text className="text-2xl text-primary-800 text-semibold font-psemibold mt-4">Add New Refuel</Text>
                    <FormField
                        title="Fuel Added"
                        value={form.fuel}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, fuel: e})}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <FormField
                        title="Cost"
                        value={form.cost}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, cost: e})}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <FormField
                        title="Total KM"
                        subtitle="Total KM on you vehicle speedometer"
                        value={form.totalKm}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, totalKm: e})}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <View className="w-full flex-row mt-4">
                        <CustomButton
                            title="Cancel"
                            handlePress={() => {router.back()}}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                        <CustomButton
                            title="Add"
                            handlePress={addNewRefuel}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default createRefuel