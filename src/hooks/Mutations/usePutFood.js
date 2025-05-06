import { createPutFood } from "../use-post";
import { useQueryClient, useMutation } from "@tanstack/react-query"

export const usePutFood = (axiosPrivate,setModalLoadingFlag, handlerSetModalError, handlerSetModalSave) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (food) => createPutFood(axiosPrivate, food),
    onMutate: (food) => { queryClient.setQueryData(["foods", food.id], food) },
    onError: error => {
      console.log("Error Put Food :", error);
      setModalLoadingFlag(false);
      handlerSetModalError()
    },
    onSuccess: (foodUpdated) => {
      console.log("Food :", foodUpdated, "sucsesfully updated!");
      queryClient.setQueryData(["foods", foodUpdated.data.id], foodUpdated.data)
      queryClient.invalidateQueries(["foods",foodUpdated.data.id],)
      setModalLoadingFlag(false)
      handlerSetModalSave()
    }
  })
}