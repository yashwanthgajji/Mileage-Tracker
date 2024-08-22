import { View, Text, Image } from 'react-native'
import React from 'react'
import { avatars } from '../constants'
import { TouchableOpacity } from 'react-native'

const SignInProfile = ({user: {avatar, nickname}, handlePress}) => {
    return (
        <TouchableOpacity
            className="w-full bg-gray-400 h-[56px] px-4 py-2 flex-row rounded-2xl my-4 items-center"
            onPress={handlePress}
        >
            <Image
                source={avatars[`avatar${avatar ? avatar : 0}`]}
                className="w-[40px] h-[40px] rounded-full"
            />
            <Text className="text-lg text-black-200 font-psemibold mx-6">{nickname}</Text>
        </TouchableOpacity>
    )
}

export default SignInProfile