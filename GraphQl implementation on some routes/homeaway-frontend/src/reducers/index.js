import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PropertyReducer from "./propertyinfo";
import LoginReducer from "./authlogin";
import OwnerDashboardReducer from "./ownerdash";
import TravelReducer from "./traveldash";
import LogoutReducer from "./tlogout";
import LoginOwnerReducer from "./authloginowner";
import TravelRegisterReducer from "./travelregister";
import OwnerRegisterReducer from "./ownerregister";
const mainReducer = combineReducers({
  form: formReducer,
  property: PropertyReducer,
  login: LoginReducer,
  loginowner: LoginOwnerReducer,
  ownerdash: OwnerDashboardReducer,
  logout: LogoutReducer,
  traveldash: TravelReducer,
  travelregister: TravelRegisterReducer,
  ownerregister: OwnerRegisterReducer
});

const rootReducer = (state, action) => {
  if (action.type === "tlogout") {
    state = undefined;
  }
  return mainReducer(state, action);
};
export default rootReducer;
