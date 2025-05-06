import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteImagefood } from "../use-post";

export const useDeleteImage = (axiosPrivate) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (image)=>createDeleteImagefood(axiosPrivate,image),
        onError: error => { console.log("Error Delete Imagefood :", error) },
        onSuccess: (response, imageDeleted) => {
            console.log("Imagefood :", imageDeleted, "sucsesfully deleted!")
            queryClient.invalidateQueries(["imagefood"])
        }
    })
}