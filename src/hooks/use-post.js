import axios from 'axios';
import Cookies from 'js-cookie';



export async function createPostStep(axiosPrivate,step) {

    return (
        (await axiosPrivate
            .post("steps/", step).then(res => res)))

}

export async function createPutStep(axiosPrivate,step) {

    return ((await axiosPrivate
        .put(`steps/${step.id}/`,
            step
        ).then(res => res)))
}

export async function createDeleteStep(axiosPrivate,step) {

    return ((await axiosPrivate
        .delete(`steps/${step.id}/`,

        ).then((res) => {
            return {
                status: res.status
            }
        }
        )))
}

export async function createDeleteUrl(axiosPrivate,url) {

    return ((await axiosPrivate
        .delete(`url/${url.id}/`,

        ).then((res) => {
            return {
                status: res.status
            }
        }
        )))
}

export async function createPutUrl(axiosPrivate,url) {

    return ((await axiosPrivate
        .put(`url/${url.id}/`,
            url
        ).then(res => res)))
}

export async function createPostUrl(axiosPrivate,url) {

    return (
        (await axiosPrivate
            .post("url/", url).then(res => res)))

}



export async function createPostUnit(axiosPrivate,{ unit }) {
    console.log("createPostUnit", unit)
    return ((unit), (await axiosPrivate
        .post("unit/", {
            unit
        }).then(res => res)))
}

export async function createPostIngredient(axiosPrivate,{ ingredient }) {

    return ((await axiosPrivate
        .post("ingredient/", {
            ingredient
        }).then(res => res)))
}

export async function createPostIngredients(axiosPrivate,ingredients) {
    console.log("createPostIngredients : ", ingredients)
    return ((await axiosPrivate
        .post("ingredients/",
            // id:ingredients.id,  units:ingredients.units, quantity:ingredients.quantity, ingredientName: ingredients.ingredientName, ingreposition:ingredients.ingreposition
            ingredients).then(res => res)))
}
export async function createPostFoodTag(axiosPrivate,{ foodTag }) {

    return ((await axiosPrivate
        .post("foodTags/", {
            foodTag
        }).then(res => res.data)))
}

export async function createPostFood(axiosPrivate,food) {

    return ((await axiosPrivate
        .post("foods/", food).then(res => res)))
}
export async function createPutFood(axiosPrivate,food) {
    return ((await axiosPrivate
        .put(`foods/${food.id}/`, food
        ).then(res => res)))
}

export async function createDeleteFood(axiosPrivate,food) {
    return ((await axiosPrivate
        .delete(`foods/${food.id}/`,
        ).then(res => res)))
}

export async function createPostImagefood(axiosPrivate,
    { formdata }
) {
    return ((await axiosPrivate
        .post("imagefood/", formdata,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            }
        ).then((res) => res)
    ))
}

export async function createPutImagefood(axiosPrivate,putFormdata) {
    return (
        (await axiosPrivate
            .put(`imagefood/${putFormdata.id}/`, (putFormdata.imageForm)
                , {
                    
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            ).then((res) => { return res }).catch(err => { console.log("Error PUT Image message :", err.message) })
        ))
}

export async function createDeleteImagefood(axiosPrivate,formdata
) {
    return (await axiosPrivate
        .delete(`imagefood/${formdata.id}/`,
            formdata.imageForm,
            // {
            //     withCredentials: false,
            //     headers: {
            //         "X-CSRFToken": "csrftoken",
            //     },
            // }

        ).then((res) => {
            return {
                status: res.status
            }
        }))
    // .catch(err=>{console.log("Error DELETE Image message :",err.message)})
}

export async function createDeleteImagefood2(
    queryKey
) {
    return (await axios
        .delete(`http://127.0.0.1:8000${queryKey[0]}`,

        ).then((res) => { return res.status }))
}

export async function createPostFunction(
    queryKey
) {
    console.log("queryKey POST", queryKey)
    return (await axios
        .post(`http://127.0.0.1:8000${queryKey}/`,

        ).then((res) => res))
}


export async function createDeleteIngredients(axiosPrivate,id) {
    return ((await axiosPrivate
        .delete(`ingredients/${id}/`,

        ).then((res) => res)))
}


export async function createPutIngredients(axiosPrivate,ingredients) {

    //id,  units, quantity, ingredientName, ingreposition)
    return ((await axiosPrivate
        .put(`ingredients/${ingredients.id}/`,
            {
                id: ingredients.id, units: [ingredients.units[0].id], quantity: ingredients.quantity, ingredientName: [ingredients.ingredientName[0].id], position: ingredients.position
            }).then(res => res)))
}

export async function createPostForgotPassword(email) {
console.log("email :",email)
    return (
        (await axios
            .post("http://127.0.0.1:8000/forgot-password/", email,
                {    headers: {
                                        "Accept": "application/json",
                                        "Content-Type": "application/json",
                                        "X-CSRFToken": Cookies.get("csrftoken")
                                    }}
            )))

}

export async function putDataPrivate(axiosPrivate, controller, user) {
    console.log("queryKey :",user)
    const res = await axiosPrivate.put(`users/${user.id}/`, user,{
      signal: controller.signal,
    }).then(res => res.data)
    controller.abort();
  
    return await res
  
  }

