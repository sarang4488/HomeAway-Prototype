import _ from "lodash";

import { OLOGIN } from "../actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target
    case OLOGIN:
      console.log(action.payload.data);
      localStorage.setItem("name", action.payload.data.name);
      localStorage.setItem("type", action.payload.data.type);
      localStorage.setItem("email", action.payload.data.email);
      localStorage.setItem("token", action.payload.data.token);
      return action.payload.data;
    // case TLOGIN:
    //   console.log(action.payload.data);
    //   return _.mapKeys(action.payload.data, "name");

    default:
      return { ...state };
  }
}
