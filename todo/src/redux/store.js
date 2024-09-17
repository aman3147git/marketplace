import {combineReducers, configureStore} from "@reduxjs/toolkit"
import appReducer from "./appSlice"
import themeReducer from "./themeSlice"
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'


const rootReducer=combineReducers({
    appSlice:appReducer,
    themeSlice:themeReducer
})
const persistConfig = {
    key: 'root',
    storage,
    
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false,
      })
})


export default store;
export const persistor=persistStore(store);