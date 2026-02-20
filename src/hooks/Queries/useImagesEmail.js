import { getDataImagesEmail } from "../use-get";
import { useQuery } from "@tanstack/react-query"


export default function useImagesEmail(axiosPrivate, food) {
    return useQuery({
        queryKey: ["imagefood", food?.data?.id],
        enabled: !!food?.data?.id,
        queryFn: (queryKey) => getDataImagesEmail(axiosPrivate, queryKey.queryKey),
    });
}