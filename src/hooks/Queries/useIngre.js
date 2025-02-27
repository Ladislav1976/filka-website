import { getData,getDataId } from "../use-get";
import {  useQueries } from "@tanstack/react-query"

function ingredientsDownl(backEndIngredients, backEndUnit, backEndIngredient) {
    let ingredients = []
    // backEndFood.ingredients.map((datatags) => {
    backEndIngredients.map((e) => {
        // if (e.id == datatags) {
        backEndUnit.map((u) => {
            if (u.id == e.units) {
                backEndIngredient?.map((i) => {
                    if (i.id == e.ingredientName) {
                        ingredients.push({
                            id: e.id,
                            quantity: e.quantity,
                            unit: [u],
                            ingredient: [i],
                            position: e.position,
                            statusDelete: false
                        })
                    }
                })
            }
        })
        // }
    }
    )
    // })
    ingredients.sort(function (a, b) {
        return a.position - b.position;
    })

    return ingredients
}

export const useIngre = (food, ingredient, unit) => {

    return useQueries({

        queries: [food.isLoading == false
            && ingredient.isLoading == false
            && unit.isLoading == false

            ? food?.data?.ingredients?.map((id) => ({
                queryKey: ["ingredients", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,
            })) : [],
            ? food?.data?.steps?.map((id) => ({
                queryKey: ["steps", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,

            })) : []],
        combine: (results) => {
            if (!results) return
            return {
                // data: results?.map((result) => result.data),
                data: ingredientsDownl(results, unit.data, ingredient.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })
};

// export async function getData( queryKey) {
//     console.log("queryKey :",queryKey)
//     return await axios.get(`http://127.0.0.1:8000/${queryKey}/`, {
  
//     }).then(res => res.data)
//   }
  
//   export async function getDataPrivate(axiosPrivate, controller, queryKey) {
//      console.log(queryKey)
//     const res = await axiosPrivate.get(`${queryKey}/`, {
//       signal: controller.signal,
  
  
//     }).then(res => res.data)
//     controller.abort();
  
//     return await res
  
//   }
  