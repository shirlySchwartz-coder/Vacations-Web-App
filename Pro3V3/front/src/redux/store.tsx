import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./loginReducer";
import { VacationReducer } from "./VacationReducer";

const rootReducer = combineReducers({
    login: AuthReducer,
    vacations: VacationReducer  
  });

  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare)=>
        getDefaultMiddleWare({serializableCheck:false}) //do not look on serialization errors
});
