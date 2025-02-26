import { getData, getDataId } from "../use-get";
import { useQuery, useQueries } from "@tanstack/react-query"

// function handlerFood(food, foodTagList, userList) {
//     let list1 = []
//     let list2 = []

//     food?.foodTags?.map((f) => {
//         foodTagList?.map((e) => {
//             if (e.id === f) {
//                 list1.push(e);
//             }
//         })
//     });
//     food?.user?.map((f) => {
//         userList?.map((e) => {
//             if (e.id === f) {
//                 list2.push(e);
//             }
//         })
//     });
//     return { ...food, foodTags: list1, user: list2 }
// }

function handlerIngredients(ingredientsList, unitsList, ingredientList) {
    console.log("INGRE :", ingredientsList, unitsList, ingredientList)
    let ingredients = []
    ingredientsList.map((e) => {
        unitsList.map((u) => {
            if (u.id == e.data.units) {
                ingredientList?.map((i) => {
                    if (i.id == e.data.ingredientName) {
                        ingredients.push({
                            id: e.data.id,
                            quantity: e.data.quantity,
                            unit: [u],
                            ingredient: [i],
                            position: e.data.position,
                            statusDelete: false
                        })
                    }
                })
            }
        })
    }
    )
    ingredients.sort(function (a, b) {
        return a.position - b.position;
    })
    return ingredients
}


export const useQueriesIteamsID = async (foodQf, ingredientQf, unitsQf) => {

    // const foodQf = useQuery({
    //     queryKey: ["foods", ID],
    //     enabled: !!ID && !!tagsQf && !!usersQf,
    //     queryFn: (queryKey) => getDataId(queryKey.queryKey),
    //     select: (data) => { return handlerFood(data, tagsQf.data, usersQf.data) },
    // });

    console.log("foodQf 2", foodQf.isLoading, foodQf.data)
    const ingredientsQf = useQueries({

        // queries: foodQf.isLoading == false
        //     && ingredientQf.isLoading == false
        //     && unitsQf.isLoading == false
        queries:  foodQf.data != undefined
            && ingredientQf.isLoading == false
            && unitsQf.isLoading == false

            ? foodQf?.data.ingredients.map((id) => ({
                queryKey: ["ingredients", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),

            }))
            : [],

        combine: (results) => {
            if (!results) return
            return {
                // data: results.some((result) => result.data),
                data: handlerIngredients(results, unitsQf.data, ingredientQf.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })


    const stepsQf = useQueries({

        queries: foodQf.isLoading == false

            ? foodQf?.data?.steps?.map((id) => ({
                queryKey: ["steps", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,

            })) : [],
        combine: (results) => {
            if (!results) return
            return {
                data: results?.map((result) => result.data).map((data) => { return Object.assign({ ...data }, { statusDelete: false }) })
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                ,
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })

    const imagesQf = useQueries({
        queries: foodQf.isLoading == false
            // && dataFoodsStIngre.data.ingredients.ingredientName!=undefined
            ? foodQf?.data?.images?.map((id) => ({
                queryKey: ["imagefood", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,
            })
            ) : [],

        combine: (results) => {
            if (!results) return
            return {

                data: results?.map((result) => result.data).map((data) => { return Object.assign({ ...data }, { statusDelete: false }) })
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                ,
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
                fetchStatus: results.some((result) => result.fetchStatus),
            }
        },
    })
const ingreRres = await ingredientsQf
const stepsRres = await stepsQf
const imagesRres = await imagesQf
Promise.all([ingreRres, stepsRres, imagesRres]).then(()=>{console.log(ingreRres, stepsRres, imagesRres)})
    // return [ingredientsQf, stepsQf, imstepsQfagesQf]
};

