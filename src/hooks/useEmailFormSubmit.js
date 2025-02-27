



export default function useEmailFormSubmit(dataFood, dataSteps, dataIngredients, dataUrls) {
  let textingre = ""; 
  let textstep = "";
  let texturls = "";


  let name = `Nazov: \n${dataFood.name}\n`

  let ingredient = textingre.concat(dataIngredients.map((res, index) => {
    return res.unit.map((u) => {
      return res.ingredient.map((i) => {
        return (`${index + 1}. ${res.quantity} ${u.unit}  ${i.ingredient}\n`)
      }
      )
    })
  }))

  let steps = textstep.concat(dataSteps.map((res, index) => (`${index + 1}. ${res.step}\n`)))
  let urls = texturls.concat(dataUrls.map((res, index) => (`${index + 1}. ${res.url}\n`)))

  const res = (`Recept: \n\n${name}\n\nSuroviny: \n${ingredient}\n\nPostup: \n${steps}\n\nURL: \n${urls}`).split(",").join("")

  return res
}








