import { getData } from "../use-get";
import {  useQueries } from "@tanstack/react-query"
export const useIngreUnit = () => {


    return useQueries({
        queries: [
          {     queryKey: ["ingredient"],
            queryFn: (queryKey) => getData(queryKey.queryKey[0]),
            staleTime: Infinity },
          { queryKey: ['unit'], 
            queryFn: (queryKey) => getData(queryKey.queryKey[0]),
            staleTime: Infinity },
        ],
      })

};