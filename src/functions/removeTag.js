

export const removeTag = (tag,tagSet) => {
    let newFoodTagSet = new Set(tagSet);
    newFoodTagSet.delete(tag);
    return newFoodTagSet
}


