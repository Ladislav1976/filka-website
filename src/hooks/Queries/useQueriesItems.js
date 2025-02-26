import { useQueries,useQueryClient } from "@tanstack/react-query"
import { getDataPrivate, getDataId, getData } from "../use-get";
import { useState } from "react";


export const useQueriesItems = (ID, axiosPrivate, controller) => {
    const queryClient = useQueryClient();

    return useQueries({
        queries: [
            {
                queryKey: ["users"],
                queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(['users'])
                  },
            }
            ,
            {
                queryKey: ["foods", ID],
                enabled: !!ID,
                // && !!tags && !!users,
                queryFn: (queryKey) => getDataId(queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["foods", ID])
                  },
            },
            {
                queryKey: ["ingredient"],
                queryFn: (queryKey) => getData(queryKey.queryKey[0]),
                initialData: () => {
                    return queryClient.getQueryData(["ingredient"])
                  },
            },
            {
                queryKey: ['unit'],
                queryFn: (queryKey) => getData(queryKey.queryKey[0]),
                initialData: () => {
                    return queryClient.getQueryData(["unit"])
                  },
            },
            {
                queryKey: ['url'],
                queryFn: (queryKey) => getData(queryKey.queryKey[0]),
                initialData: () => {
                    return queryClient.getQueryData(["url"])
                  },
            },
            {
                queryKey: ["foodTags"],
                queryFn: (queryKey) => getData(queryKey.queryKey[0]),
                initialData: () => {
                    return queryClient.getQueryData(["foodTags"])
                  },
            }
        ],
    })

}