import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutIngredients } from "../use-post";


export const usePutIngredients =()=>{
    const queryClient = useQueryClient();
    return useMutation({
        // queryKey: (id) => [`/steps/${id}/`],
        mutationFn: createPutIngredients,
        onMutate: (ingredients)=>{queryClient.setQueryData(["ingredients", ingredients.id], ingredients)},
        onError: error => { console.log("Error Put Ingredients :", error) },
        onSuccess: (ingredientsUpdated, variable) => {
          console.log("Ingredients :", ingredientsUpdated, "sucsesfully updated!");
          queryClient.setQueryData(["ingredients", ingredientsUpdated.data.id], ingredientsUpdated.data)
          // queryClient.setQueryData(["ingredients"], (prev) => {
    
          //   if (prev === undefined) { return [ingredientsUpdated.data] } else {
          //     ;
          //     return [...prev.map((pre) => {
          //       if (pre.id === variable.id) { return ingredientsUpdated.data }
          //       else { return pre }
          //     }
          //     )]
          //   }
          // });
          queryClient.invalidateQueries(["ingredients"]);
          // return ingredientsUpdated
    
    
    
        }
      })
    
}