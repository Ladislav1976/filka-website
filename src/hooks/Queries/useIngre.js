/* eslint-disable array-callback-return */
import { getDataId } from '../use-get';
import { useQueries } from '@tanstack/react-query';

function ingredientsDownl(backEndIngredients, backEndUnit, backEndIngredient) {
    let ingredients = [];

    backEndIngredients.map((e) => {
        backEndUnit.map((u) => {
            if (u.id === e.units) {
                backEndIngredient?.map((i) => {
                    if (i.id === e.ingredientName) {
                        ingredients.push({
                            id: e.id,
                            quantity: e.quantity,
                            unit: [u],
                            ingredient: [i],
                            position: e.position,
                            statusDelete: false,
                        });
                    }
                });
            }
        });
    });

    ingredients.sort(function (a, b) {
        return a.position - b.position;
    });

    return ingredients;
}

export const useIngre = (food, ingredient, unit) => {
    const readyToFetch =
        !food.isLoading && !ingredient.isLoading && !unit.isLoading;

    const ingredientQueries = readyToFetch
        ? (food?.data?.ingredients || []).map((id) => ({
              queryKey: ['ingredients', id],
              queryFn: () => getDataId(['ingredients', id]),
              staleTime: Infinity,
          }))
        : [];

    const stepQueries = readyToFetch
        ? (food?.data?.steps || []).map((id) => ({
              queryKey: ['steps', id],
              queryFn: () => getDataId(['steps', id]),
              staleTime: Infinity,
          }))
        : [];
    return useQueries({
        queries: [...ingredientQueries, ...stepQueries],

        combine: (results) => {
            if (!results) return;
            return {
                // data: results?.map((result) => result.data),
                data: ingredientsDownl(results, unit.data, ingredient.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            };
        },
    });
};
