import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createPutImagefood } from '../use-post';

export const usePutImage = (axiosPrivate, controller) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (putFormdata) =>
            createPutImagefood(axiosPrivate, putFormdata, controller),
        retry: 3,
        onMutate: async (image) => {
            const queryKey = ['imagefood', image.food];
            await queryClient.cancelQueries({ queryKey });
            const previousImage = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, image);
            return { previousImage, queryKey };
        },
        onError: (err, previousImage, context) => {
            console.log('Error Put Imagefood :', err);
            // throw err;
            if (context?.queryKey) {
                if (context?.previousImage != null) {
                    queryClient.setQueryData(
                        context.queryKey,
                        context.previousFood,
                    );
                } else {
                    queryClient.removeQueries({ queryKey: context.queryKey });
                }
            }
        },
        onSettled: (data, error, ImagefoodUpdated, context) => {
            console.log('PUT settled for Imagefood:', ImagefoodUpdated);
        },
    });
};
