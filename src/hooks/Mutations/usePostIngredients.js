import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostIngredients } from "../use-post";

export const usePostIngredients = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPostIngredients,
        onError: error => { console.log("Error Post Ingredients :", error) },
        onSuccess: (ingredientsCreated) => {
            console.log("Ingredients :", ingredientsCreated, "sucsesfully created!")
            queryClient.setQueryData(["steps", ingredientsCreated.data.id], ingredientsCreated.data)

            // queryClient.setQueryData(["ingredients"], (prev) => {
            //     if (!prev) return undefined;
            //     return [...prev.filter(p => p.id != ingredientsCreated.data.id),
            //     ingredientsCreated.data]
            // })
            // queryClient.setQueryData(["ingredients", ingredientsCreated.data.id], ingredientsCreated.data)
            queryClient.invalidateQueries(["ingredients"])
            // return ingredientsCreated
        }
    })
}