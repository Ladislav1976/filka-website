export default function useEmailFormSubmit(dataName, dataSteps, dataIngredients, dataUrls) {
  let textingre = ""; 
  let textstep = "";
  let texturls = "";

  const name = `Nazov: \n${dataName}`

  const ingredient = `Suroviny: \n${textingre.concat(dataIngredients.map((res, index) => {
    return res.unit.map((u) => {
      return res.ingredient.map((i) => {
        return (`${index + 1}. ${res.quantity} ${u.unit}  ${i.ingredient}\n`)
      }
      )
    })
  }))}`
  
  
  const steps = `Postup: \n${textstep.concat(dataSteps.map((res, index) => (`${index + 1}. ${res.step}\n`)))}`
  const urlsTemp = texturls.concat(dataUrls.map((res, index) => (`${index + 1}. ${res.url}\n`)))
let urls = ""
if(urlsTemp){urls =`URL: \n${urlsTemp}`}

  const res = (`Recept: \n\n${name}\n\n${ingredient}\n\n${steps}\n\n${urls}`).split(",").join("")
  return res
}








