import _ from "lodash";

import { TLOGOUT } from "../actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target
    case TLOGOUT:
      //console.log(action.payload.data);
      return action.payload;
    // case TLOGIN:
    //   console.log(action.payload.data);
    //   return _.mapKeys(action.payload.data, "name");

    default:
      return state;
  }
}
