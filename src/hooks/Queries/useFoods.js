
import { useQuery } from "@tanstack/react-query"
import { getDataPrivateParams } from "../use-get";

export const useFoods = (axiosPrivate, foodTags__foodTag,search,ordering,page,page_size) => {
    return useQuery({
        queryKey: ["foods",foodTags__foodTag,search,ordering,page,page_size],
        queryFn: (queryKey) =>  getDataPrivateParams(axiosPrivate, queryKey.queryKey,foodTags__foodTag,search,ordering,page,page_size),
        retryDelay: 1000,
    })
}