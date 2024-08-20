import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'

const VehicleMileageChartView = ({containerStyles, months, moneySpent}) => {
    const { width } = useWindowDimensions();
    const data = {
        labels: months,
        datasets: [{
            data: moneySpent,
            colors: [() => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c']
        }]
    }

    return (
        <View className={containerStyles}>
            <View className="w-full flex-row h-5 mb-4">
                <Text className="flex-initial text-lg text-primary-800 font-psemibold">Vehicle Mileage Performance</Text>
            </View>
            <View className="w-full h-[256px] bg-white rounded-xl justify-center items-center">
                <LineChart 
                    data={data}
                    yAxisLabel=''
                    yAxisSuffix=''
                    yLabelsOffset={25}
                    xLabelsOffset={10}
                    width={340}
                    height={240}
                    chartConfig={{
                        backgroundGradientFrom:'white',
                        backgroundGradientTo:'white',
                        color: () => '#ea580c',
                        barPercentage:  0.7,
                        barRadius: 8,
                        propsForDots:{
                            r:'6'
                        },
                        propsForBackgroundLines:{
                            stroke: '#6b7280',
                            strokeWidth: 1,
                        }
                    }}
                    withVerticalLines={false}
                    withDots
                    withShadow={false}
                    fromZero={true}
                    bezier
                />
            </View>
        </View>
    )
}

export default VehicleMileageChartView