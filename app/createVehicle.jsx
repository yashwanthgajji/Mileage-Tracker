import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { useUserStore } from '../context/GlobalContext'
import { addVehicle } from './data/VehicleStorage'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import SelectDropDown from '../components/SelectDropDown'

const createVehicle = () => {
    const vehicleTypeListData = [
        { key: '2 Wheeler', value: '2 Wheeler' },
        { key: '3 Wheeler', value: '3 Wheeler' },
        { key: '4 Wheeler', value: '4 Wheeler' },
        { key: 'Other', value: 'Other' },
    ]
    const [form, setForm] = useState({
        picture: null,
        name: '',
        type: '',
        engine: '',
    })
    const { user } = useUserStore();

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
          quality: 1
        })
        if(!result.canceled) {
            setForm({ ...form, picture: result.assets[0] });
        }
      }

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
                    <TouchableOpacity
                        className="mt-7 w-full"
                        onPress={() => openPicker()}
                    >
                        {form.picture ? (
                        <View className="w-full h-60 p-1 bg-white rounded-xl justify-center items-center">
                        <Image 
                            source={{uri: form.picture.uri}}
                            className="w-full h-full"
                            resizeMode='cover'
                        />
                        </View>
                        ) : (
                        <View className="w-full h-60 px-4 bg-gray-400 rounded-xl justify-center items-center">
                            <View className="w-14 h-14 justify-center items-center">
                            <Image 
                                source={icons.upload}
                                className="w-1/2 h-1/2"
                                resizeMode='contain'
                            />
                            </View>
                        </View>
                        )}
                    </TouchableOpacity>
                    <FormField
                        title="Vehicle Name"
                        value={form.name}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, name: e})}
                        otherStyles="mt-4"
                    />
                    <SelectDropDown
                        title="Vehicle Type"
                        isRequired
                        setValue={(val) => setForm({ ...form, type: val})}
                        data={vehicleTypeListData}
                        save={"value"}
                        placeholder={"Select Vehicle Type"}
                        notFoundText={"No Vehicle Found"}
                        containerStyles="mt-6"
                    />
                    <FormField
                        title="Engine CC"
                        value={form.engine}
                        isRequired={true}
                        handleChangeText={(e) => setForm({ ...form, engine: e})}
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