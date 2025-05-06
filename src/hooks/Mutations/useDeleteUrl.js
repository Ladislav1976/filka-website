import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteUrl } from "../use-post";

export const useDeleteUrl = (axiosPrivate) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (url)=>createDeleteUrl(axiosPrivate,url),
        onError: error => { console.log("Error Delete URL :", error) },
        onSuccess: (response, deletedURL) => {
            console.log("Step :", deletedURL, "sucsesfully deleted!", response)
            queryClient.invalidateQueries(["url"])
        }
    })
}