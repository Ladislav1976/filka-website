import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPutUrl } from "../use-post";


export const usePutUrl = (axiosPrivate) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (url)=>createPutUrl(axiosPrivate,url),
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