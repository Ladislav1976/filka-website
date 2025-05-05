import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutStep ,putDataPrivate} from "../use-post";

export const usePutStep =(axiosPrivate)=>{
    const queryClient = useQueryClient();
    return useMutation({
        // queryKey: (id) => [`/steps/${id}/`],
        mutationFn:(step)=> createPutStep(axiosPrivate,step),
        // mutationFn:()=> putDataPrivate(axiosPrivate, "step"),
        onMutate: (step)=>{queryClient.setQueryData(["steps", step.id], step)},
        onError: error => { console.log("Error Put Step :", error) },
        onSuccess: (stepUpdated) => {
          console.log("Step :", stepUpdated, "sucsesfully updated!",)
          queryClient.setQueryData(["steps", stepUpdated.data.id], stepUpdated.data)
          queryClient.invalidateQueries(["steps"])
        }
      })
}