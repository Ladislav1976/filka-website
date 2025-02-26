import {  useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutImagefood } from "../use-post";

export const usePutImage =()=> {
    const queryClient = useQueryClient();
    return   useMutation({
        mutationFn: createPutImagefood,
        retry: 3,
        onMutate: (image)=>{queryClient.setQueryData(["imagefood", image.id], image)},
        onError: error => { console.log("Error Put Imagefood :", error) },
        onSuccess: (ImagefoodUpdated) => {
          console.log("Imagefood :", ImagefoodUpdated.data, "sucsesfully updated!")
          queryClient.setQueryData(["imagefood", ImagefoodUpdated.data.id], ImagefoodUpdated.data)
          queryClient.invalidateQueries(["imagefood"])
        }
      })
}