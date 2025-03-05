import { useQueryClient, useMutation } from "@tanstack/react-query"
import { putDataPrivate } from "../use-post";

export const usePutUser=(setRole,roleDefault,setRoleDefault,handlerSetModalError,axiosPrivate, controller,id)=>{
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: (user) => putDataPrivate(axiosPrivate, controller, user),          
            onError: error => { console.log("Error Put User :", error);
                handlerSetModalError()
                setRole(roleDefault)
                setRoleDefault("") },
            onSuccess: (user) => {
                console.log("URL :", user, "sucsesfully updated!",)
                queryClient.setQueryData(["users"], (prev) => {
                    if (!prev) return undefined;
                    // return [...prev,
                    //     user]
                    return [...prev.filter(p => p.id != user.id).sort(function (a, b) {
                        return a.id - b.id;
                    }),
                    user]
                })
                queryClient.invalidateQueries(["users"])
                setRoleDefault("")
            }
        })
}