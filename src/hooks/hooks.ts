import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../index'
import { useEffect, useState } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

// Use useChartOption hook to get the chart configuration throughout your app
export const useChartOption = (defaultChartData) => {

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>();
    const [chartData, setChartData] = useState(defaultChartData);

    useEffect(() => {

        if(Object.keys(chartData)?.length > 0) {
            constructHighChartOptions();
        }
        
    }, [chartData]);

    const constructHighChartOptions = () => {
        const { products, type } = chartData;

        if (products.length > 0) {
            const data: any = products.map(({ title, price }) => {
              return { name: title, y: price }
            });
      
            const options: Highcharts.Options = {
              title: {
                text: 'Product Price Chart',
              },
              tooltip: {
                valueSuffix: '$'
              },
              series: [
                {
                  type,
                  name: "Price",
                  data
                },
              ],
              xAxis: {
                categories: products?.map(product => product.title)
              },
              plotOptions: {
                bar: {
                  dataLabels:{
                    enabled: true
                  }
                },
                pie: {
                  dataLabels:{
                    enabled: true
                  }
                }
              }
            };
      
            setChartOptions(options);
          }
    }

    return {chartOptions, setChartOptions: setChartData};
}
