import { getPosition } from "./getPosition"

export const itemMove = (move, item, array) => {
  let position = getPosition(item.id, array)

  let newArray = array.slice()
  if (move > 0) {
    if (position === (-1 + array.length)) { return newArray } else {
      newArray.splice(position, 1);
      newArray.splice(position + move, 0, item);
      return newArray
    }
  }
  if (move < 0) {
    if (position === 0) { return newArray }
    else {
      newArray.splice(position, 1);
      newArray.splice(position - 1, 0, item);
      return newArray
    }
  }
}
