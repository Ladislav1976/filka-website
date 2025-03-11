
import { useQueries} from "@tanstack/react-query"
import {  getImage ,getDataPrivateID} from "../use-get";

export const useImagesList =(axiosPrivate, controller,foodsQf)=>{

    return useQueries({
        queries: foodsQf.isLoading == false
            ? [...new Set (foodsQf.data.img_list)].map((id) => ({
                queryKey: ["imagefood", id],
                queryFn: (queryKey) => getDataPrivateID (axiosPrivate, controller, queryKey.queryKey),
                // queryFn: () => getImage(id),
            })) : [],

        combine: (results) => {
            if (!results) return
            return {
                data: results.map((result) => result.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
                fetchStatus: results.some((result) => result.fetchStatus),
                error: results.some((result) => result.error)

            }
        },
    })
}