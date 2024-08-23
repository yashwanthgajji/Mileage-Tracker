import { View, Text } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'

const MoneySpendChartView = ({containerStyles, refuels}) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const moneySpent = months.map((month, index) => {
        const monthStart = new Date(new Date().getFullYear(), index, 1).getTime();
        const monthEnd = new Date(new Date().getFullYear(), index + 1, 0).getTime();
        const refuelsInMonth = refuels.filter(refuel => refuel.date >= monthStart && refuel.date <= monthEnd);
        const totalCost = refuelsInMonth.reduce((acc, refuel) => acc + parseInt(refuel.cost, 10), 0);
        return totalCost / 1000;
    });
    
    const data = {
        labels: months,
        datasets: [{
            data: moneySpent,
            colors: [() => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c', () => '#ea580c']
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
                    yLabelsOffset={20}
                    xLabelsOffset={10}
                    fromZero={true}
                    width={340}
                    height={240}
                    chartConfig={{
                        backgroundGradientFrom:'white',
                        backgroundGradientTo:'white',
                        color: () => '#ea580c',
                        barPercentage:  0.35,
                        barRadius: 4,
                        propsForBackgroundLines:{
                            stroke: '#6b7280',
                            strokeWidth: 1,
                        },
                    }}
                    withInnerLines
                    showBarTops={false}
                    withCustomBarColorFromData
                    flatColor
                />
            </View>
        </View>
    )
}

export default MoneySpendChartView