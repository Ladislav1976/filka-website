
import { useQuery } from "@tanstack/react-query"
import { getFoodsPageFn } from "../use-get";

export const useFoods = (foodTags__foodTag,search,page,page_size) => {

    return useQuery({
        queryKey: ["foods",foodTags__foodTag,search,page,page_size],
        queryFn: () =>  getFoodsPageFn(foodTags__foodTag,search,page,page_size)
    })
}