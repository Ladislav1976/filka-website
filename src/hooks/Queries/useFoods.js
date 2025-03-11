
import { useQuery } from "@tanstack/react-query"
import { getDataPrivateParams } from "../use-get";

export const useFoods = (axiosPrivate, controller,foodTags__foodTag,search,ordering,page,page_size) => {
    return useQuery({
        queryKey: ["foods",foodTags__foodTag,search,ordering,page,page_size],
        queryFn: (queryKey) =>  getDataPrivateParams(axiosPrivate, controller,queryKey.queryKey,foodTags__foodTag,search,ordering,page,page_size)
    })
}