import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteUrl } from "../use-post";

export const useDeleteUrl = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDeleteUrl,
        onError: error => { console.log("Error Delete URL :", error) },
        onSuccess: (response, deletedURL) => {
            console.log("Step :", deletedURL, "sucsesfully deleted!", response)
            queryClient.invalidateQueries(["url"])
        }
    })
}