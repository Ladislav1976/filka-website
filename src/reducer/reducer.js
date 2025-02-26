import React from 'react'
import { ACTION_TYPES } from './actionTypes';
// import { addStep } from '../functions/addStep';
import { addItem } from '../functions/addItem';
import { updateItem } from '../functions/updateItem';
import { itemMove } from '../functions/itemMove';
import { makeItemDelete } from '../functions/makeItemDelete';
import { addIngredients } from '../functions/addIngredients';
import { removeTag } from '../functions/removeTag';
import { addTag } from '../functions/addTag';

export const INITIAL_STATE = {
    id: "",
    name: "",
    ingredientsList: [],
    urlList: [],
    stepsList: [],
    tagsSet: new Set([]),
    date: "",
    imagesList: [],
};

export const STATE_LIST = {
    ID: "id",
    NAME: "name",
    INGREDIENTS: "ingredientsList",
    URLS: "urlList",
    STEPS: "stepsList",
    TAGS: "tagsSet",
    DATE: "date",
    IMAGES: "imagesList",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case ACTION_TYPES.ADD_STEP:
            return {
                ...state,
                [action.payload.name]: addItem(action.payload.value, state.stepsList),
            };
        case ACTION_TYPES.UPDATE_STEP:
            return {
                ...state,
                [action.payload.name]: updateItem(action.payload.value, state.stepsList),
            };
        case ACTION_TYPES.MOVE_UP_STEP:
            return {
                ...state,
                [action.payload.name]: itemMove(-1, action.payload.value, state.stepsList),
            };
        case ACTION_TYPES.MOVE_DOWN_STEP:
            return {
                ...state,
                [action.payload.name]: itemMove(1, action.payload.value, state.stepsList),
            };
        case ACTION_TYPES.DELETE_STEP:
            return {
                ...state,
                [action.payload.name]: makeItemDelete(action.payload.value, state.stepsList),
            };
        case ACTION_TYPES.ADD_URL:
            return {
                ...state,
                [action.payload.name]: addItem(action.payload.value, state.urlList),
            };
        case ACTION_TYPES.UPDATE_URL:
            return {
                ...state,
                [action.payload.name]: updateItem(action.payload.value, state.urlList),
            };
        case ACTION_TYPES.DELETE_URL:
            return {
                ...state,
                [action.payload.name]: makeItemDelete(action.payload.value, state.urlList),
            };
        case ACTION_TYPES.DELETE_IMAGE:
            return {
                ...state,
                [action.payload.name]: makeItemDelete(action.payload.value, state.imagesList),
            };
        case ACTION_TYPES.ADD_INGREDIENTS:
            return {
                ...state,
                [action.payload.name]: addIngredients(action.payload.value, state.ingredientsList),
            };
        case ACTION_TYPES.MOVE_UP_INGREDIENTS:
            return {
                ...state,
                [action.payload.name]: itemMove(-1, action.payload.value, state.ingredientsList),
            };
        case ACTION_TYPES.MOVE_DOWN_INGREDIENTS:
            return {
                ...state,
                [action.payload.name]: itemMove(1, action.payload.value, state.ingredientsList),
            };
        case ACTION_TYPES.DELETE_INGREDIENTS:
            return {
                ...state,
                [action.payload.name]: makeItemDelete(action.payload.value, state.ingredientsList),
            };
        case ACTION_TYPES.ADD_TAG:
            return {
                ...state,
                [action.payload.name]: addTag(action.payload.value, state.tagsSet),
            };
        case ACTION_TYPES.REMOVE_TAG:
            return {
                ...state,
                [action.payload.name]: removeTag(action.payload.value, state.tagsSet),
            };
    }
}
