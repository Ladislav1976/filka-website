import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutStep } from "../use-post";

export const usePutStep = (axiosPrivate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (step) => createPutStep(axiosPrivate, step),
    onMutate: (step) => { queryClient.setQueryData(["steps", step.id], step) },
    onError: error => { console.log("Error Put Step :", error) },
    onSuccess: (stepUpdated) => {
      console.log("Step :", stepUpdated, "sucsesfully updated!",)
      queryClient.setQueryData(["steps", stepUpdated.data.id], stepUpdated.data)
      queryClient.invalidateQueries(["steps"])
    }
  })
}