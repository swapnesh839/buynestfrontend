import { combineReducers } from "@reduxjs/toolkit";
import Authslice from "./slice/Authslice";

const rootReducer = combineReducers({
    auth:Authslice
});

export default rootReducer