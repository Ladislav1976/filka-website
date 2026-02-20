import { useFoods } from './useFoods';
import { useMemo } from 'react';

export const useFoodsDownload = (
    axiosPrivate,
    foodTags,
    searchPar,
    orderingPar,
    pagePar,
    pageSizePar,
    user__id__in,
) => {
    const foodsQf = useFoods(
        axiosPrivate,
        foodTags,
        searchPar,
        orderingPar,
        pagePar,
        pageSizePar,
        user__id__in,
    );

    const isLoading = foodsQf.isLoading;

    const isFetching = foodsQf.isFetching;

    const isError = foodsQf.isError;

    const isSuccess = foodsQf.isSuccess;

    console.log(foodsQf.data);
    const memoizedData = useMemo(() => {
        if (!foodsQf.data) return null;

        return {
            ...foodsQf.data,
            tagsQf: foodsQf.data.tagsQf || [],
            usersQf: foodsQf.data.usersQf || [],
            tagGroupQf: foodsQf.data.tagGroupQf || [],
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, foodsQf.data]);
    return {
        data: memoizedData,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    };
};
