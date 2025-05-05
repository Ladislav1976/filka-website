import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostStep } from "../use-post";

export const usePostStep = (axiosPrivate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (step)=>createPostStep(axiosPrivate,step),
    onError: error => { console.log("Error Post Step :", error) },
    onSuccess: (stepCreated) => {
      console.log("Step :", stepCreated, "sucsesfully created!")
      queryClient.setQueryData(["steps", stepCreated.data.id], stepCreated.data)
      queryClient.invalidateQueries(["steps"])
    }
  })

}