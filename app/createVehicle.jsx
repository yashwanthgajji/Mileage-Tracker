import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { SelectList } from 'react-native-dropdown-select-list'
import { useUserStore } from '../context/GlobalContext'
import { addVehicle } from './data/VehicleStorage'

const createVehicle = () => {
    const vehicleTypeListData = [
        { key: '2 Wheeler', value: '2 Wheeler' },
        { key: '4 Wheeler', value: '4 Wheeler' },
    ]
    const [form, setForm] = useState({
        name: '',
        type: '',
        engine: '',
    })
    const { user } = useUserStore();

    const addNewVehicle = () => {
        if (!form.name && !form.type && !form.engine) {
            Alert.alert('Error', 'Please fill all fields')
        } else {
            const vehicleData = {
                id: new Date().getTime(),
                userId: user.id,
                ...form,
            }
            addVehicle(vehicleData)
            router.back()
        }
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-5 my-6">
                    <Text className="text-2xl text-primary-800 text-semibold font-psemibold mt-4">Add New Vehicle</Text>
                    <FormField
                        title="Vehicle Name"
                        value={form.name}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, name: e})}
                        otherStyles="mt-4"
                    />
                    <SelectList
                        setSelected={(val) => setForm({ ...form, type: val})}
                        data={vehicleTypeListData}
                        save="value"
                        placeholder="Select Vehicle Type"
                        boxStyles={{width:360, marginTop: 24}}
                        maxHeight={80}
                        dropdownItemStyles={{padding: 20}}
                        dropdownStyles={{backgroundColor: '#bfdbfe'}}
                        dropdownTextStyles={{color: '#1E1E2D'}}
                        notFoundText='No Vehicle Found'
                    />
                    <FormField
                        title="Engine CC"
                        value={form.engine}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, engine: e})}
                        otherStyles="mt-4"
                        keyboardType="email-address"
                    />
                    <View className="w-full flex-row mt-4">
                        <CustomButton
                            title="Cancel"
                            handlePress={() => {router.back()}}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                        <CustomButton
                            title="Add"
                            handlePress={addNewVehicle}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default createVehicle