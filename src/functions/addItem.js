export const addItem = (itemObj, array) => {
    let newArray = array.slice();
    newArray.push(itemObj)
    return newArray;
}

