import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostFoodTag } from "../use-post";

export const usePostTag = (axiosPrivate,addTagTofoodTagSet,handlerSetModalError) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tag)=>createPostFoodTag(axiosPrivate,tag),
        onError: error => { console.log("Error Post FoodTag :", error); handlerSetModalError() },
        onSuccess: (foodTagCreated) => {
            console.log("FoodTag :", foodTagCreated, "sucsesfully created!")
            queryClient.setQueryData(["foodTags"], (prev) => {
                if (!prev) return undefined;
                return [...prev,
                    foodTagCreated]
            })
            queryClient.invalidateQueries(["foodTags"])
            addTagTofoodTagSet(foodTagCreated)

        }
    })
}