import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteStep } from "../use-post";

export const useDeleteStep = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDeleteStep,
        onError: error => { console.log("Error Delete Step :", error) },
        onSuccess: (response, deletedStep) => {
            console.log("Step :", deletedStep, "sucsesfully deleted!", response)
            queryClient.invalidateQueries(["steps"])
        }
    })

}