import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutStep } from "../use-post";

export const usePutStep =()=>{
    const queryClient = useQueryClient();
    return useMutation({
        // queryKey: (id) => [`/steps/${id}/`],
        mutationFn: createPutStep,
        onMutate: (step)=>{queryClient.setQueryData(["steps", step.id], step)},
        onError: error => { console.log("Error Put Step :", error) },
        onSuccess: (stepUpdated) => {
          console.log("Step :", stepUpdated, "sucsesfully updated!",)
          queryClient.setQueryData(["steps", stepUpdated.data.id], stepUpdated.data)
          queryClient.invalidateQueries(["steps"])
        }
      })
}