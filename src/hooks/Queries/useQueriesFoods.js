import { useQueries, useQuery} from "@tanstack/react-query"
import {  getImage, searchFoodsPageFn, getFoodsPageFn, getFoodTags } from "../use-get";


export const useQueriesFoods = (location, page) => {


    const foodsQf = useQuery({
        queryKey: ["foods"],
        queryFn: () => {
            if (location?.search != null) {
                return searchFoodsPageFn(location.search)
            } else { return getFoodsPageFn(page) }
        },
    })

    const imagesQf = useQueries({
        queries: foodsQf.isLoading == false
            ? foodsQf.data.img_list.map((id) => ({
                queryKey: ["imagefood", id],
                queryFn: () => getImage(id),
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

    const tagsQf = useQuery({
        queryKey: ["foodTags"],
        queryFn: getFoodTags,
    })

    return { foodsQf: foodsQf, imagesQf: imagesQf, tagsQf: tagsQf }
}