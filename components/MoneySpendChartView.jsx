import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'

const MoneySpendChartView = ({containerStyles, months, moneySpent}) => {
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
                <Text className="flex-initial text-lg text-primary-800 font-psemibold">Money spent on fuel</Text>
            </View>
            <View className="w-full h-[256px] bg-white rounded-xl justify-center items-center">
                <BarChart 
                    data={data}
                    yAxisLabel=''
                    yAxisSuffix='K'
                    width={340}
                    height={240}
                    chartConfig={{
                        backgroundGradientFrom:'white',
                        backgroundGradientTo:'white',
                        color: () => '#ea580c',
                        barPercentage:  0.5,
                        barRadius: 8,
                        propsForBackgroundLines:{
                            stroke: '#6b7280',
                            strokeWidth: 1,
                        }
                    }}
                    withInnerLines
                    showBarTops={false}
                    withCustomBarColorFromData
                    flatColor
                    fromZero={true}
                />
            </View>
        </View>
    )
}

export default MoneySpendChartView