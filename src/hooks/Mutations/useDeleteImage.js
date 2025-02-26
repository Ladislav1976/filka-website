import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteImagefood } from "../use-post";

export const useDeleteImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDeleteImagefood,
        onError: error => { console.log("Error Delete Imagefood :", error) },
        onSuccess: (response, imageDeleted) => {
            console.log("Imagefood :", imageDeleted, "sucsesfully deleted!")
            queryClient.invalidateQueries(["imagefood"])
        }
    })
}