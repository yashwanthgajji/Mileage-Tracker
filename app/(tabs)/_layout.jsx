import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text 
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{color:color}}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#1e40af',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: {
            backgroundColor: '#e5e7eb',
            borderTopWidth: 2,
            borderTopColor: '#fb923c',
            height: 72
          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.home}
                color = {color}
                name = "Home"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='refuelling'
          options={{
            title: 'Refuelling',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.fuel}
                color = {color}
                name = "Refuelling"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='performance'
          options={{
            title: 'Performance',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.performance}
                color = {color}
                name = "Performance"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='vehicles'
          options={{
            title: 'Vehicles',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.car}
                color = {color}
                name = "Vehicles"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout