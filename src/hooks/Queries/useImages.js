import { getDataId,getDataPrivateID } from "../use-get";
import { useQueries, useQueryClient } from "@tanstack/react-query"


export const useImages = (axiosPrivate,food) => {
    const queryClient = useQueryClient();
    return useQueries({
        queries: food.isLoading == false
            // && dataFoodsStIngre.data.ingredients.ingredientName!=undefined
            ? food?.data?.images?.map((id) => ({
                queryKey: ["imagefood", id],
                queryFn: (queryKey) => getDataPrivateID(axiosPrivate, queryKey.queryKey),
                // queryFn: (queryKey) => getDataId(queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["imagefood", id])
                },
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),

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
                isError: results.some((result) => result.isError),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
                fetchStatus: results.some((result) => result.fetchStatus),
            }
        },
    })
}