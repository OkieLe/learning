import { combineReducers } from "redux";

import Login from "./LoginReducer";

const rootReducer = combineReducers({ 
    login : Login,
});

export default rootReducer;