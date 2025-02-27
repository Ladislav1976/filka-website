
import { getDataId } from "../use-get";
import {  useQueries,useQueryClient } from "@tanstack/react-query"

// function ingredientsDownl(ingredientsList, unitsList, ingredientList) {
//     console.log("ingredientsList" ,ingredientsList,"unitsList", unitsList,"ingredientList", ingredientList,)
//     let ingredients = []
//     // ingredientsList.map((e) => {
//         unitsList?.map((u) => {
//             if (u.id == ingredientsList.units) {
//                 ingredientList?.map((i) => {
//                     if (i.id == ingredientsList.ingredientName) {
//                         ingredients.push({
//                             id: ingredientsList.id,
//                             quantity: ingredientsList.quantity,
//                             unit: [u],
//                             ingredient: [i],
//                             position: ingredientsList.position,
//                             statusDelete: false
//                         })
//                     }
//                 })
//             }
//         })
//     // }
//     // )
//     ingredients.sort(function (a, b) {
//         return a.position - b.position;
//     })
//     console.log("RETURN :",ingredients)
//     return ingredients
// }


export const useIngredients = (food,ingredient,unit) => {
      const queryClient = useQueryClient();
    // return useQuery({
    //     queryKey: ["ingredients", ID],
    //     enabled: !!ID ,
    //     queryFn: (queryKey) => getDataId(queryKey.queryKey),
    //     // select: (data) => { return foodTagHandler(data, tags.data, users.data) },
    // });
    // console.log("food isloading:",food.isLoading,ingredient.isLoading,unit.isLoading )
    // console.log("food data:",food.data,ingredient.data,unit.data )
    return useQueries({

        queries: food.isLoading ==false 
            && ingredient.isLoading ==false 
            && unit.isLoading ==false 

            ? food?.data?.ingredients?.map((id) => ({
                queryKey: ["ingredients", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["ingredients", id])
                  },
            }))
            
     
: [],

        combine: (results) => {
            // if (!results) return
            return {
                data: results.map((result) =>result.data),
                // data: results.map((result) => ingredientsDownl(result.data, unit.data, ingredient.data)),
                // data: ingredientsDownl(results, unit, ingredient),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })
};