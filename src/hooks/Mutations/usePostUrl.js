import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createPostUrl } from "../use-post";


export const usePostUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPostUrl,
    onError: error => { console.log("Error Post URL :", error) },
    onSuccess: (urlCreated) => {
      console.log("URL :", urlCreated, "sucsesfully created!")
      // queryClient.setQueryData(["url", urlCreated.data.id], urlCreated.data)
      queryClient.setQueryData(["url"], (prev) => {
        if (!prev) return undefined;
           return [...prev.filter(p => p.id != urlCreated.data.id),
            urlCreated.data]
      })
      queryClient.invalidateQueries(["url"])

    }
  })
}