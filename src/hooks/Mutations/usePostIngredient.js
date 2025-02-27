import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostIngredient } from "../use-post";

export const usePostIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPostIngredient,
        onError: error => { console.log("Error Post Ingredient :", error) },
        onSuccess: (ingredientCreated, ingredient) => {
            console.log("Ingredient :", ingredientCreated, "sucsesfully created!")
            queryClient.setQueryData(["ingredient"], (prev) => {
                if (!prev) return undefined;
                return [...prev.filter(p => p.id != ingredientCreated.data.id),
                ingredientCreated.data]
            })
            queryClient.invalidateQueries(["ingredient"])

        }
    })
}