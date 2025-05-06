import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutIngredients } from "../use-post";


export const usePutIngredients = (axiosPrivate)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ingredients)=>createPutIngredients(axiosPrivate,ingredients),
        onMutate: (ingredients)=>{queryClient.setQueryData(["ingredients", ingredients.id], ingredients)},
        onError: error => { console.log("Error Put Ingredients :", error) },
        onSuccess: (ingredientsUpdated, variable) => {
          console.log("Ingredients :", ingredientsUpdated, "sucsesfully updated!");
          queryClient.setQueryData(["ingredients", ingredientsUpdated.data.id], ingredientsUpdated.data)
          queryClient.invalidateQueries(["ingredients"]);
        }
      })
    
}