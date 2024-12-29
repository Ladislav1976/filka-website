
import axios from "axios"

export async function defaultQueryFn({ queryKey }) {

    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`,
    )
    return data
}


export async function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;

}


export async function getFood(id) {
  
  return (await axios.get(`http://127.0.0.1:8000/foods/${id}/ `, {
  }
  ).then((res) => res.data))  
}

export async function getIngredients() {
  
  return (await axios.get(`http://127.0.0.1:8000/ingredients/`, {
  }
  ).then((res) => res.data))  
}

export async function getIngredientsID(id) {
  
  return (await axios.get(`http://127.0.0.1:8000/ingredients/${id}/ `, {
  }
  ).then((res) => res.data))  
}
export async function getIngredient() {
  
  return (await axios.get(`http://127.0.0.1:8000/ingredient/`, {
  }
  ).then((res) => res.data))  
}

export async function getIngredientID(id) {
  return( (await axios.get(`http://127.0.0.1:8000/ingredient/${id}/ `, {
  }
  ).then((res) => res.data)))  
}

export async function getUnit() {
  return (await axios.get(`http://127.0.0.1:8000/unit/`, {
  }
  ).then((res) => res.data))  
}

export async function getUnitID(id) {
  
  return (await axios.get(`http://127.0.0.1:8000/unit/${id}/ `, {
  }
  ).then((res) => res.data))  
}

export async function getFoodTags() {
  
  return (await axios.get(`http://127.0.0.1:8000/foodTags/`, {
  }
  ).then((res) => res.data))  
}
export async function getSteps() {
  return (await axios.get(`http://127.0.0.1:8000/steps/`, {
  }
  ).then((res) => res.data))  
}

export async function getStep(id) {
  return (await axios.get(`http://127.0.0.1:8000/steps/${id}/ `, {
  }
  ).then((res) => res.data))  
}
export async function getImageFood() {
  
  return (await axios.get(`http://127.0.0.1:8000/imagefood/`, {
  }
  ).then((res) => res.data))  
}

export async function getImage(id) {
  
  return (await axios.get(`http://127.0.0.1:8000/imagefood/${id}/ `, {
  }
  ).then((res) => res.data))  
}

export async function getUrl(id) {
  
  return (await axios.get(`http://127.0.0.1:8000/url/${id}/ `, {
  }
  ).then((res) => res.data))  
}

export async function searchFoodsPageFn(search) {

    return (await axios.get(`http://127.0.0.1:8000/foods/${search} `, {
    }
    ).then((res) => res.data))  
}

export async function getFoodsPageFn(pageNumber) {
  console.log("getFoodsPageFn", pageNumber)
  return (await axios.get(`http://127.0.0.1:8000/foods/?page=${pageNumber} `, {
  }    
  ).then((res) => res.data))}
    
  // export async function queryFnFoodTagId({ queryKey }) {
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`
  //   )

  //   return data
  // }


  // export function queryFnFoodTagToId( data ) {
  //   console.log("data",data);
  //   //   return data.id
  // }

  // export async function queryFnFoodStep({ queryKey }) {
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //   )
  //   // .then((users) => users.map((user) => user.id))
  //   return data.step
  // }

  // export async function queryFnFoodIngredient({ queryKey }) {
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //   )
  //   // .then((users) => users.map((user) => user.id))
  //   return data.ingredient
  // }