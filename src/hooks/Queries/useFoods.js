import { useQuery } from '@tanstack/react-query';
import { getDataPrivateParams } from '../use-get';

export const useFoods = (
    axiosPrivate,
    foodTags,
    search,
    ordering,
    page,
    page_size,
    user__id__in,
) => {
    return useQuery({
        queryKey: [
            'foodsList',
            foodTags,
            search,
            ordering,
            page,
            page_size,
            user__id__in,
        ],
        queryFn: (queryKey) =>
            getDataPrivateParams(
                axiosPrivate,
                queryKey.queryKey,
                foodTags,
                user__id__in,
                search,
                ordering,
                page,
                page_size,
            ),
        staleTime: 10 * (60 * 1000),
        gcTime: 15 * (60 * 1000),
        refetchOnMount: true,
        placeholderData: (previousData) => previousData,
    });
};
