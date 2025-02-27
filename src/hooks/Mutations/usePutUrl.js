import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutUrl } from "../use-post";


export const usePutUrl = () => {
    const queryClient = useQueryClient();
    return useMutation({

        mutationFn: createPutUrl,
        onError: error => { console.log("Error Put URL :", error) },
        onSuccess: (urlUpdated) => {
            console.log("URL :", urlUpdated, "sucsesfully updated!",)
            queryClient.setQueryData(["url"], (prev) => {
                if (!prev) return undefined;
                return [...prev.filter(p => p.id != urlUpdated.data.id),
                    urlUpdated.data]
            })



            queryClient.invalidateQueries(["url"])
        }
    })
}