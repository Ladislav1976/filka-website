import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteIngredients } from "../use-post";


export const useDeleteIngredients = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // queryKey: (ingredients) => ["/ingredients/", ingredients.id],
        mutationFn: createDeleteIngredients,
        // onError: error => { console.log("Error Delete ingredients :", error); handlerSetModalError() },
        onSuccess: (ingredients) => {
            console.log("Ingredients :", ingredients, "sucsesfully deleted!")

            // queryClient.setQueryData(["ingredients"], (prev) => {
            //     console.log("pred :", prev, "variable DELETE:", variable)
            //     if (prev === undefined) return [];
            //     return [...prev.map((pre) => {
            //         if (pre.id !== variable.id) { return pre }

            //     }
            //     )]
            // });
            queryClient.invalidateQueries(["ingredients"]);

        }
    })
}