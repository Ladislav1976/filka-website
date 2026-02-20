import { getDataImagesFood } from '../use-get';
import { useQuery } from '@tanstack/react-query';

export const useIngredients = (axiosPrivate, ID, isSaving) => {
    return useQuery({
        queryKey: ['ingredients', ID],
        enabled: !!ID && !isSaving,
        queryFn: (queryKey) =>
            getDataImagesFood(axiosPrivate, queryKey.queryKey),
        placeholderData: (previousData) => previousData,
    });
};
// return useQueries({
//     queries:
//         items.isLoading === false
//             ? // ingredient.isLoading === false &&
//               // unit.isLoading === false
//               (items.data.foodQf?.ingredients || []).map((id) => ({
//                   queryKey: ['ingredients', id],
//                   queryFn: (queryKey) =>
//                       getDataPrivateID(axiosPrivate, queryKey.queryKey),
//               }))
//             : [],

//     combine: (results) => {
//         // if (!results) return
//         return {
//             data: results.map((result) => result.data),
//             // data: results.map((result) => ingredientsDownl(result.data, unit.data, ingredient.data)),
//             // data: ingredientsDownl(results, unit, ingredient),
//             isPending: results.some((result) => result.isPending),
//             isLoading: results.some((result) => result.isLoading),
//             isSuccess: results.some((result) => result.isSuccess),
//             status: results.some((result) => result.status),
//             isFetched: results.some((result) => result.isFetched),
//         };
//     },
// });
// };
