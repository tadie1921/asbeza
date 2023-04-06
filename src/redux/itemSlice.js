import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITEMS } from "../sampleData/items";

const initialState = {
    items: ITEMS,  // []
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
         }
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchItems.pending, (state, action) => {
               state.status = 'loading'; 
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // add any fetched posts to the array
                state.items = state.items.concat(action.payload);
            })
            .addCase(fetchItems.rejected, (state, action)=>{
                state.status = 'failed'
                //state.error = action.error.message;
                state.error = 'error'
            })
    }
});

export const fetchItems = createAsyncThunk('items/fetchItems', ()=>{
    return ITEMS;
});

export const { counterChanged } = itemSlice.actions;

export default itemSlice.reducer;
