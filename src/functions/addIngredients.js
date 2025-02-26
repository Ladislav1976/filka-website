import React from 'react'

export const addIngredients = (ingredients,ingredientsList) => {
    if (ingredients.addedIngredient === "") {
        return;
      }
      let newIngredientsList = ingredientsList.slice()
      newIngredientsList.push({ id: ingredients.uniqueID, quantity: ingredients.addedQuantity, unit: [{ id: ingredients.uniqueID, unit: ingredients.addedUnit }], ingredient: [{ id: ingredients.uniqueID, ingredient: ingredients.addedIngredient }], statusDelete: false }
      );
      return newIngredientsList;
}

