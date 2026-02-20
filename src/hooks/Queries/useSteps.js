import { getDataImagesFood } from '../use-get';
import { useQuery } from '@tanstack/react-query';

export const useSteps = (axiosPrivate, ID, isSaving) => {
    return useQuery({
        queryKey: ['steps', ID],
        enabled: !!ID && !isSaving,
        queryFn: (queryKey) =>
            getDataImagesFood(axiosPrivate, queryKey.queryKey),
        placeholderData: (previousData) => previousData,
    });
};
