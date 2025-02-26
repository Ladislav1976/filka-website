import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostUnit } from "../use-post";


export const usePostUnit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPostUnit,
        onError: error => { console.log("Error Post Unit :", error) },
        onSuccess: (unitCreated, unit) => {
            console.log("Unit :", unitCreated, "sucsesfully created!")
            queryClient.setQueryData(["unit"], (prev) => {
                if (!prev) return undefined;
                return [...prev,
                    unitCreated.data]
                // return [...prev.filter(p => p.id != unitCreated.data.id),
                // unitCreated.data]
            })
            queryClient.invalidateQueries(["unit"])
        }
    })
}