
import axios from "axios"


export async function defaultQueryFn({ queryKey }) {

  const { data } = await axios.get(
    `http://127.0.0.1:8000${queryKey[0]}`,
  )
  return data
}


export async function imageExists(image_url) {

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
  console.log("getIngredientID :", id)
  return ((await axios.get(`http://127.0.0.1:8000/ingredient/${id}/ `, {
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
  ).then((res) => {return res.data} )
  )
}

export async function getUrl(id) {

  return (await axios.get(`http://127.0.0.1:8000/url/${id}/ `, {
  }
  ).then((res) => res.data))
}

export async function getDataId( queryKey) {

  return await axios.get(`http://127.0.0.1:8000/${queryKey[0]}/${queryKey[1]}/`, {

  }).then(res => res.data)
}

export async function getData( queryKey) {

  return await axios.get(`http://127.0.0.1:8000/${queryKey}/`, {

  }).then(res => res.data)
}

export async function getDataPrivate(axiosPrivate, controller, queryKey) {
  console.log("queryKey :",queryKey)
  const res = await axiosPrivate.get(`${queryKey}/`, {
    signal: controller.signal,


  }).then(res => res.data)
  controller.abort();

  return await res

}



export async function getFoodsPageFn(foodTags__foodTag,search,ordering,page,page_size) {
  return (await axios.get(`http://127.0.0.1:8000/foods/`, {
    // params: {foodTags__foodTag: foodTags__foodTag, page:page, search:search ,page_size :pageSize},
    params: { foodTags__foodTag,search, ordering, page  ,page_size,},
  }
  ).then((res) => res.data))
}

