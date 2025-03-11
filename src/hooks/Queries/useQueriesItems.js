import { useQueries,useQueryClient } from "@tanstack/react-query"
import { getDataPrivate, getDataPrivateID, getDataId, getData } from "../use-get";



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
                queryFn: (queryKey) => getDataPrivateID (axiosPrivate, controller, queryKey.queryKey),
                // queryFn: (queryKey) => getDataId(queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["foods", ID])
                  },
            },
            {
                queryKey: ["ingredient"],
                queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["ingredient"])
                  },
            },
  
            {
                queryKey: ['unit'],
                queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["unit"])
                  },
            },
            {
                queryKey: ['url'],
                queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["url"])
                  },
            },
            {
                queryKey: ["foodTags"],
                queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey),
                initialData: () => {
                    return queryClient.getQueryData(["foodTags"])
                  },
            }
        ],
    })

}