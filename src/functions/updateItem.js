import { getPosition } from "./getPosition";

export function updateItem(itemObj, array) {

    let position = getPosition(itemObj.id, array);
    let newArray = array.slice();
    newArray.splice(position, 1, itemObj)

    return (newArray);
}