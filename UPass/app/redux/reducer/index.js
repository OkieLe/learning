import { combineReducers } from "redux";

import Login from "./LoginReducer";
import Query from "./QueryReducer";
import Editor from "./EditReducer";

const rootReducer = combineReducers({ 
    login : Login,
    query : Query,
    editor : Editor,
});

export default rootReducer;