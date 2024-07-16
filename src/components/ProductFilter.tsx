import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { ICategory, IProduct } from "../interfaces/appInterfaces";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProductsOnCategory } from "../actions/action";
import { updateProductsOnCategory } from "../features/appReducer";
import CloseIcon from '@mui/icons-material/Close';

const ProductFilter = ({ onChangeCallBack }) => {

    const { allProducts, allCatgories, productsOnCategory } = useAppSelector(state => state.appData);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | string | any>();
    const [selectedProducts, setSelectedProducts] = useState<IProduct[] | string[] | any[]>([]);
    const dispatch = useAppDispatch();

    const handleCategoryChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
        const {
          target: { value },
        } = event;
        setSelectedCategory(value);
        dispatch(fetchProductsOnCategory(value?.url))
    }

    const OnClose = (type) => {

        if(!selectedCategory) return;
    
        if (type === 'Category') {
          dispatch(updateProductsOnCategory({ payload: [] }))
          setSelectedCategory(null);
          setSelectedProducts([]);
          onChangeCallBack({
            products: allProducts,
            type: 'pie'
          })
        }
        else {
          setSelectedProducts([]);
        }
      }

      const handleProductChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
        const {
          target: { value },
        } = event;
    
        setSelectedProducts(value);
      }

      const handleRunReport = () => {
        let data = selectedCategory ? (
          selectedProducts?.length > 0) ? 
          {
            products :selectedProducts ,
            type: 'bar'
          }: 
          {
            products:productsOnCategory,
            type:'bar'
          } : 
          {
            products: allProducts,
            type: 'pie'
          };
    
          onChangeCallBack(data);
      }
    

    return(
        <div className='m-6 border-2 border-black relative p-3'>
          <div className='flex justify-between m-2 p-3'>
            <h2>Filters</h2>
            <span className='text-sm cursor-pointer' onClick={() => OnClose('Category')}>Clear</span>
          </div>

          <div className='relative min-w-60 grow p-2'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategory || ''}
                label="Category"
                onChange={handleCategoryChange}
                className='border-solid'
              >
                {
                  (allCatgories && allCatgories.length > 0) && allCatgories.map((category: any, key: number) => <MenuItem key={key} value={category}>{category?.name}</MenuItem>)
                }
              </Select>
            </FormControl>
            {selectedCategory && <CloseIcon className='absolute top-6 left-[calc(100%-50px)] cursor-pointer' onClick={() => OnClose('Category')} />}
          </div>
          <div className='relative w-60 p-2'>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProducts}
                label={'Product'}
                onChange={handleProductChange}
                className='border-solid'
                disabled={!selectedCategory}
                multiple={true}
              >
                {
                  (productsOnCategory && productsOnCategory?.length > 0) && productsOnCategory.map((product: any, key: number) => <MenuItem key={key} value={product}>{product?.title}</MenuItem>)
                }
              </Select>
            </FormControl>
            {selectedProducts && (selectedProducts?.length > 0) && <CloseIcon className={`absolute top-6 left-[calc(100%-50px)] cursor-pointer`} onClick={OnClose} />}
          </div>
          <div className='absolute bottom-3 w-full left-1'>
            <Button disabled={!selectedCategory} variant="contained" size="large" onClick={() => handleRunReport()}>Run Report</Button>
          </div>

        </div>
    )

}

export default ProductFilter;