
import { useQuery } from "@tanstack/react-query"
import { getFoodsPageFn } from "../use-get";

export const useFoods = (foodTags__foodTag,search,ordering,page,page_size) => {
// console.log("foods",foodTags__foodTag,search,ordering,page,page_size)
let f = foodTags__foodTag ?? ""
let s = search ?? ""
// console.log("foods",{foodTags__foodTag: foodTags__foodTag}, {ordering:ordering},{page:page}, {search:search} ,{page_size :page_size})
    return useQuery({
        // queryKey: ["foods",page],
        queryKey: ["foods",foodTags__foodTag,search,ordering,page,page_size],
        queryFn: () =>  getFoodsPageFn(foodTags__foodTag,search,ordering,page,page_size)
    })
}