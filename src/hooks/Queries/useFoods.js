
import { useQuery} from "@tanstack/react-query"
import {  searchFoodsPageFn, getFoodsPageFn } from "../use-get";

export const useFoods =(location, page)=>{

    return useQuery({
        queryKey: ["foods"],
        queryFn: () => {
            if (location?.search != null) {
                return searchFoodsPageFn(location.search)
            } else { return getFoodsPageFn(page) }
        },
    })
}