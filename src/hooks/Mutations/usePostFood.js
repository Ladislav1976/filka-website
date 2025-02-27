import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostFood } from "../use-post";

export const usePostFood =(handlerSetModalSave)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPostFood,
        onError: error => { console.log("Error Post Food :", error) },
        onSuccess: (foodCreated, image) => {
            console.log("Food :", foodCreated, "sucsesfully created!")
            queryClient.setQueryData(["foods", foodCreated.data.id], foodCreated.data)
            //queryClient.invalidateQueries(["foods", foodCreated.id], )  
            handlerSetModalSave()
        }
    })
}