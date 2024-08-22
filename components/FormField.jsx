import { View, Text, TextInput } from 'react-native'

const FormField = ({ title, value, placeholder, isRequired, handleChangeText, otherStyles, keyboardType }) => {
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg text-primary-800 font-pregular">
        {title}
        {isRequired && (
          <Text className=" text-base text-red-600 font-plight">*</Text>
        )}
      </Text>
      <View
        className="border-2 border-black w-full h-16 px-4 bg-background-200 rounded-2xl focus:border-secondary items-center flex-row"
      >
        <TextInput
            className="flex-1 text-black font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
        />
      </View>
    </View>
  )
}

export default FormField