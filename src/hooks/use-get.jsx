import {useQuery,useMutation} from "@tanstack/react-query"
import axios from "axios"

export async function defaultQueryFn({ queryKey }) {
    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`,
    )
    return data
  }
export async function queryFnFoodTagName({ queryKey }) {
    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`,
    )
    // .then((users) => users.map((user) => user.id))
    return data.foodTag
  }
  export async function queryFnFoodTagId({ queryKey }) {
    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`
    )

    return data
  }


  export function queryFnFoodTagToId( data ) {
    console.log("data",data);
    //   return data.id
  }

  export async function queryFnFoodStep({ queryKey }) {
    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`,
    )
    // .then((users) => users.map((user) => user.id))
    return data.step
  }

  export async function queryFnFoodIngredient({ queryKey }) {
    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`,
    )
    // .then((users) => users.map((user) => user.id))
    return data.ingredient
  }