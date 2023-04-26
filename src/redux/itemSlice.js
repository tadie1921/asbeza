import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseUrl = "http://localhost:3000";
const {ITEMS} = require('../sampleData/items');
console.log(ITEMS)

const initialState = {
    items: ITEMS,  //  []
    status: 'succeeded', // 'idle'
    error: null
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers:{ 
         counterChanged(state, action){
            const itemId = action.payload.id;
            const act = action.payload.action;
            const existingItem = state.items.find(item => item.id === itemId);
            if(existingItem){
                if(act === 'inc'){
                    existingItem.counter = existingItem.counter + 1;
                }
                else if(act === 'dec'){
                    existingItem.counter = existingItem.counter - 1;
                }
            } else{
                console.log('no itme found')
            }
         },
         //temp reset counter
         resetCounter(state,action){
            state.items.map(item => item.counter = 0);
         }
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchItems.pending, (state, action) => {
               state.status = 'loading'; 
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded'
                action.payload.data.map(obj => obj.counter = 0);
                // add any fetched posts to the array
                state.items = action.payload.data;
            })
            .addCase(fetchItems.rejected, (state, action)=>{
                state.status = 'failed'
                //state.error = action.error.message;
                state.error = 'error'
            })
    }
});

export const fetchItems = createAsyncThunk('items/fetchItems', async()=>{
    const response = await fetch(baseUrl + '/items');
    
    return response.json();
});

export const { counterChanged, resetCounter } = itemSlice.actions;

export default itemSlice.reducer;
