import {reducer,INITIAL_STATE, STATE_LIST} from "./reducer";
import { useReducer } from "react";

export const useFoodReducer = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    return [state, dispatch];
  };