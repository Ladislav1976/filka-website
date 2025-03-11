import { getDataPrivate} from "../use-get";
import {  useQuery } from "@tanstack/react-query"
export const useTags = (axiosPrivate, controller) => {
    return useQuery({
        queryKey: ["foodTags"],
        queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey),
        
    });
};