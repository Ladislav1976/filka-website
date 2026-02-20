import { createPutFood } from '../use-post';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const usePutFood = (
    axiosPrivate,
    setModalLoadingFlag,
    handlerSetModalError,
    makeImagesRecord,
    setIsSaving,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (food) => createPutFood(axiosPrivate, food),

        onError: (err, updatedFood, context) => {
            console.log('Error Put Food :', err);
            setModalLoadingFlag(false);
            setIsSaving(false);
            handlerSetModalError();
            throw err;
        },
        onSuccess: (data, context) => {
            console.log('PUT succeeded for food:', data.data);
            const queryKey = ['foods', data.data.id];

            queryClient.setQueryData(queryKey, data?.data);
            makeImagesRecord(data?.data);
        },
    });
};
