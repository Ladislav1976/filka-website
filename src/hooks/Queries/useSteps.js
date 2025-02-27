import { sendForm } from "@emailjs/browser";
import { getDataId, } from "../use-get";
import { useQueries,useQueryClient } from "@tanstack/react-query"
export const useSteps = (food) => {
    const queryClient = useQueryClient();
    return useQueries({

        queries: food.isLoading == false && food.data

            ? food?.data?.steps?.map((id) => ({
                queryKey: ["steps", id],
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["steps", id])
                  },
 
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
           

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
 
};