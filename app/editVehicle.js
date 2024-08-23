import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { useUserStore } from '../context/GlobalContext'
import { updateVehicle, deleteVehicleById } from './data/VehicleStorage'
import { TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import SelectDropDown from '../components/SelectDropDown'

const editVehicle = () => {
    const vehicleTypeListData = [
        { key: '2 Wheeler', value: '2 Wheeler' },
        { key: '3 Wheeler', value: '3 Wheeler' },
        { key: '4 Wheeler', value: '4 Wheeler' },
        { key: 'Other', value: 'Other' },
    ]
    const { vehicleForEdit, setVehicleForEdit } = useUserStore();
    const [updatedVehicle, setUpdatedVehicle] = useState({ ...vehicleForEdit })

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
          quality: 1
        })
        if(!result.canceled) {
            setUpdatedVehicle({ ...updatedVehicle, picture: result.assets[0] });
        }
      }

    const VehicleUpdate = () => {
        if (!updatedVehicle.name && !updatedVehicle.type && !updatedVehicle.engine) {
            Alert.alert('Error', 'Please fill all fields')
        } else {
            updateVehicle(updatedVehicle.id, updatedVehicle)
            setVehicleForEdit(null)
            router.back()
        }
    }

    const VehicleDelete = () => {
        Alert.alert(
            'Delete Vehicle',
            'Are you sure you want to delete this vehicle?',
            [
                {
                    text: 'No',
                    onPress: () => {},
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        deleteVehicleById(updatedVehicle.id)
                        setVehicleForEdit(null);
                        router.back();
                    },
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-5 my-6">
                    <View className="flex-row w-full mt-4">
                        <Text className="text-2xl text-primary-800 text-semibold font-psemibold flex-1">Edit Vehicle</Text>
                        <TouchableOpacity
                            onPress={VehicleDelete}
                        >
                            <Image
                                source={icons.bin}
                                className="w-7 h-7"
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        className="mt-7 w-full"
                        onPress={() => openPicker()}
                    >
                        {updatedVehicle.picture ? (
                        <View className="w-full h-60 p-1 bg-white rounded-xl justify-center items-center">
                        <Image 
                            source={{uri: updatedVehicle.picture.uri}}
                            className="w-full h-full rounded-lg"
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
                        value={updatedVehicle.name}
                        isRequired={true}
                        handleChangeText={(e) => setUpdatedVehicle({ ...updatedVehicle, name: e})}
                        otherStyles="mt-4"
                    />
                    <SelectDropDown
                        title="Vehicle Type"
                        isRequired
                        setValue={(val) => setUpdatedVehicle({ ...updatedVehicle, type: val})}
                        data={vehicleTypeListData}
                        save={"value"}
                        placeholder={"Select Vehicle Type"}
                        notFoundText={"No Vehicle Found"}
                        containerStyles="mt-6"
                        defaultOption={{ key: updatedVehicle?.type, value: updatedVehicle?.type }}
                    />
                    <FormField
                        title="Engine CC"
                        value={updatedVehicle.engine}
                        isRequired={true}
                        handleChangeText={(e) => setUpdatedVehicle({ ...updatedVehicle, engine: e})}
                        otherStyles="mt-4"
                        keyboardType="number-pad"
                    />
                    <View className="w-full flex-row mt-4">
                        <CustomButton
                            title="Cancel"
                            handlePress={() => {
                                setVehicleForEdit(null)
                                router.back()
                            }}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                        <CustomButton
                            title="Update"
                            handlePress={VehicleUpdate}
                            containerStyles="mt-2 flex-1 mx-2"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default editVehicle