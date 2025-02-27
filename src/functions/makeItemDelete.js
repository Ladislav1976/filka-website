import { getPosition } from "./getPosition";

export const makeItemDelete = (item, array) => {
    let itemIDPosition = getPosition(item.id, array);
    let newArray = array.slice();
    newArray.splice(itemIDPosition, 1, { ...item, statusDelete: true })
    return newArray;
}
