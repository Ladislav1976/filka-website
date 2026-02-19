import { createDeleteFood } from '../use-post';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useDeleteFood = (
    axiosPrivate,
    setModalLoadingFlag,
    handlerSetModalError,
    handlerFoodDeleteConfirmed
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (food) => createDeleteFood(axiosPrivate, food),
        onError: (error) => {
            console.log('Error Delete Food :', error);
            setModalLoadingFlag(false);
            handlerSetModalError();
        },
        onSuccess: (response, foodDeleted) => {
            console.log('Food :', foodDeleted, 'sucsesfully updated!');
            queryClient.removeQueries({
                queryKey: ['foods', foodDeleted.id],
            });
            queryClient.invalidateQueries(['foods', foodDeleted.id]);
            setModalLoadingFlag(false);
            handlerFoodDeleteConfirmed();
        },
    });
};
