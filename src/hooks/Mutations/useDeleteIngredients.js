import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createDeleteIngredients } from "../use-post";


export const useDeleteIngredients = (axiosPrivate) => {
    const queryClient = useQueryClient();
    return useMutation({
        // queryKey: (ingredients) => ["/ingredients/", ingredients.id],
        mutationFn: (ingre) => createDeleteIngredients(axiosPrivate, ingre),
        // onError: error => { console.log("Error Delete ingredients :", error); handlerSetModalError() },
        onSuccess: (responce, ingredients) => {
            console.log("Ingredients :", ingredients, "sucsesfully deleted!",responce)
            queryClient.removeQueries(["ingredients", ingredients]);
            // queryClient.setQueryData(["ingredients", ingredients], (prev) => {
            //     console.log("Ingredients prev 1:", prev)
            //     if (!prev) return prev;
            //     console.log("Ingredients prev 2:", prev)
            //     // return prev.id != ingredients
            //     return prev.filter(p => {console.log("p", p);return p.id != ingredients})

                // return [...prev.map((pre) => {
                //     if (pre.id !== variable.id) { return pre }

                // }
                // )]
            // });
            // queryClient.invalidateQueries(["ingredients",ingredients]);

        }
    })
}