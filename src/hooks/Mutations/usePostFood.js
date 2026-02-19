import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createPostFood } from '../use-post';

export const usePostFood = (
    axiosPrivate,
    setModalLoadingFlag,
    handlerSetModalError,
    makeImagesRecord,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (food) => createPostFood(axiosPrivate, food),

        onError: (err, newFood, context) => {
            console.log('Error Post Food :', err);
            setModalLoadingFlag(false);
            handlerSetModalError();
            throw err;
        },
        onSuccess: (data, context) => {
            console.log('PUT succeeded for food:', data.data);
            const queryKey = ['foods', data?.data?.id];

            queryClient.setQueryData(queryKey, data?.data);
            makeImagesRecord(data?.data);
        },
    });
};
