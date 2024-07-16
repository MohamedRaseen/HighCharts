import { useEffect, useRef } from 'react';
import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppDispatch, useAppSelector, useChartOption } from './hooks/hooks';
import { getAllCategories, getAllProducts } from './actions/action';
import { Backdrop, CircularProgress } from '@mui/material';
import ProductFilter from './components/ProductFilter';
import './index.css';


const App = (props: HighchartsReact.Props) => {

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const dispatch = useAppDispatch();
  const { allProducts, isLoading } = useAppSelector(state => state.appData);

  //custom hook useChartOption
  const {chartOptions, setChartOptions} = useChartOption({});

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories())
  }, [])


  useEffect(() => {
    setChartOptions({
      products: allProducts,
      type: 'pie'
    })
  },[allProducts?.length]);


  return (
    <div className="App h-full">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='flex h-full'>
        <ProductFilter onChangeCallBack={setChartOptions}/>
        <div className='grow'>
          <HighchartsReact
            containerProps={{ style: { height: "100%" } }}
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
            {...props}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
