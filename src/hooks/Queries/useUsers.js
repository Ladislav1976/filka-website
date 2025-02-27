import { getDataPrivate } from "../use-get";
import {  useQuery } from "@tanstack/react-query"
export const useUsers = (axiosPrivate, controller) => {
    return useQuery({
        queryKey: ["users"],
        queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey[0]),
    });
};