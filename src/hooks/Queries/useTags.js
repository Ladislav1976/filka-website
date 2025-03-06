import { getData } from "../use-get";
import {  useQuery } from "@tanstack/react-query"
export const useTags = () => {
    return useQuery({
        queryKey: ["foodTags"],
        queryFn: (queryKey) => getData(queryKey.queryKey[0]),
        
    });
};