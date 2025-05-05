import axios from 'axios';
import Cookies from 'js-cookie';



export async function createPostStep(axiosPrivate,step) {

    return (
        (await axiosPrivate
            .post("steps/", step).then(res => res)))

}

export async function createPutStep(axiosPrivate, step) {

    return ((await axiosPrivate
        // .put(`http://127.0.0.1:8000/steps/${step.id}/`,
        .put(`steps/${step.id}/`,
            step, 
        ).then(res => res)))



}

export async function createDeleteStep(step) {

    return ((await axios
        .delete(`http://127.0.0.1:8000/steps/${step.id}/`,

        ).then((res) => {
            return {
                status: res.status
            }
        }
        )))
}

export async function createDeleteUrl(url) {

    return ((await axios
        .delete(`http://127.0.0.1:8000/url/${url.id}/`,

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

export async function createPostUrl(url) {

    return (
        (await axios
            .post("http://127.0.0.1:8000/url/", url).then(res => res)))

}



export async function createPostUnit({ unit }) {
    console.log("createPostUnit", unit)
    return ((unit), (await axios
        .post("http://127.0.0.1:8000/unit/", {
            unit
        }).then(res => res)))
}

export async function createPostIngredient({ ingredient }) {

    return ((await axios
        .post("http://127.0.0.1:8000/ingredient/", {
            ingredient
        }).then(res => res)))
}

export async function createPostIngredients(ingredients) {
    console.log("createPostIngredients : ", ingredients)
    return ((await axios
        .post("http://127.0.0.1:8000/ingredients/",
            // id:ingredients.id,  units:ingredients.units, quantity:ingredients.quantity, ingredientName: ingredients.ingredientName, ingreposition:ingredients.ingreposition
            ingredients).then(res => res)))
}
export async function createPostFoodTag({ foodTag }) {

    return ((await axios
        .post("http://127.0.0.1:8000/foodTags/", {
            foodTag
        }).then(res => res.data)))
}

export async function createPostFood(food) {

    return ((await axios
        .post("http://127.0.0.1:8000/foods/", food).then(res => res)))
}
// export async function createPutFood(axiosPrivate,food) {
//     let isMounted = true;
//     const controller = new AbortController();
//     return ((await axios
//         .put(`http://127.0.0.1:8000/foods/${food.id}/`, food
//         ).then(res => res)))
// }

export async function createPutFood(axiosPrivate, food) {
    let isMounted = true;
    const controller = new AbortController();
    return ((await axiosPrivate
        .put(`foods/${food.id}/`, food
        ).then(res => res)))
}

export async function createDeleteFood(food) {
    return ((await axios
        .delete(`http://127.0.0.1:8000/foods/${food.id}/`,
        ).then(res => res)))
}

export async function createPostImagefood(axiosPrivate,
     {formdata} 
) {
    console.log("formdata POST:",formdata)
    return ((await axiosPrivate
        .post("imagefood/", formdata,
            {
                // withCredentials: true,
                headers: {
                   'Content-Type': 'multipart/form-data', 
                },
            }
        ).then((res) => res)
    ))
}

export async function createPutImagefood(axiosPrivate, putFormdata) {
    console.log("formdata PUT:",putFormdata)
    return (
        (await axiosPrivate
            .put(`imagefood/${putFormdata.id}/`, (putFormdata.imageForm)
                , 
                {
                    // withCredentials: false,
                    headers: {
                        "X-CSRFToken": "csrftoken",
                    },
                }
            ).then((res) => { return res }).catch(err => { console.log("Error PUT Image message :", err.message) })
        ))
}

export async function createDeleteImagefood(formdata
) {
    return (await axios
        .delete(`http://127.0.0.1:8000/imagefood/${formdata.id}/`,
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


export async function createDeleteIngredients(id) {
    return ((await axios
        .delete(`http://127.0.0.1:8000/ingredients/${id}/`,

        ).then((res) => res)))
}


export async function createPutIngredients(axiosPrivate, ingredients) {
    console.log(ingredients)
    //id,  units, quantity, ingredientName, ingreposition)
    return ((await axiosPrivate
        .put(`ingredients/${ingredients.id}/`,
            {
                id: ingredients.id, units: [ingredients.units[0].id], quantity: ingredients.quantity, ingredientName: [ingredients.ingredientName[0].id], position: ingredients.position
            }).then(res => res)))
}

export async function createPostForgotPassword(email) {
    console.log("email :", email)
    return (
        (await axios
            .post("http://127.0.0.1:8000/forgot-password/", email,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken")
                    }
                }
            )))

}

export async function putDataPrivate(axiosPrivate, controller, user) {
    console.log("queryKey :", user)
    const res = await axiosPrivate.put(`users/${user.id}/`, user, {
        signal: controller.signal,
    }).then(res => res.data)
    controller.abort();

    return await res

}

