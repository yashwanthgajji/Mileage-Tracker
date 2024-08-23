import React from 'react'
import { View, Text } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'

const SelectDropDown = ({title, subtitle, isRequired, setValue, data, save, placeholder, notFoundText, defaultOption, containerStyles}) => {
  return (
    <View className={`space-y-2 ${containerStyles}`}>
        {
            title && (
                <Text className="text-lg text-primary-800 font-pregular mb-2 w-full">
                    {title}
                    {isRequired && (
                    <Text className=" text-base text-red-600 font-plight">*</Text>
                    )}
                </Text>
            )
        }
        {
            subtitle && (
                <Text className="text-sm text-gray-600 font-plight mb-2 w-full">
                    {subtitle}
                </Text>
            )
        }
        <SelectList
            setSelected={(val) => setValue(val)}
            data={data}
            save={save}
            placeholder={placeholder}
            inputStyles={{color: '#1e40af', fontSize: 16, lineHeight: 24, paddingHorizontal: 16 }}
            boxStyles={{width:360, height: 64, alignItems: 'center', backgroundColor: '#e5e7eb', borderWidth: 2, borderColor: '#000000'}}
            maxHeight={180}
            dropdownItemStyles={{padding: 20}}
            dropdownStyles={{backgroundColor: '#e5e7eb', borderWidth: 2, borderColor: '#000000'}}
            dropdownTextStyles={{color: '#9a3412', fontSize: 16, lineHeight: 24, paddingHorizontal:16}}
            notFoundText={notFoundText}
            defaultOption={defaultOption}
        />
    </View>
  )
}

export default SelectDropDown