import _ from "lodash";
import { FETCH_PROPERTIES } from "../actions";
import { TLOGIN } from "../actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target
    case FETCH_PROPERTIES:
      console.log(action.payload.data);
      return _.mapKeys(action.payload.data, "name");
    // case TLOGIN:
    //   console.log(action.payload.data);
    //   return _.mapKeys(action.payload.data, "name");

    default:
      return state;
  }
}
