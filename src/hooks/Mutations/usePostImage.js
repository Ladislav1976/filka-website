import {  useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostImagefood } from "../use-post";


export const usePostImage=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPostImagefood,
        onError: error => { console.log("Error Post Imagefood :", error); },
        onSuccess: (ImageCreated) => {
          console.log("Imagefood :", ImageCreated, "sucsesfully created!")
          queryClient.setQueryData(["imagefood", ImageCreated.data.id], ImageCreated.data)
          queryClient.invalidateQueries(["imagefood"])
        }
      })
}