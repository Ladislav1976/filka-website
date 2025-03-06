import { getDataPrivate } from "../use-get";
import {  useQuery } from "@tanstack/react-query"
export const useUsers = (axiosPrivate, controller) => {
    return useQuery({
        queryKey: ["users"],
        queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey[0]),
        select:(a)=>a.sort(function (a, b) {
            return a.id - b.id;
        })
    });
};