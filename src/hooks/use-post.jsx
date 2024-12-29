import { useQuery, useMutation } from "@tanstack/react-query"
import axios from 'axios';




export async function createPostStep(step) {

    return (
        (await axios
            .post("http://127.0.0.1:8000/steps/", step).then(res => res)))

}

export async function createPutStep(step) {

    return ((await axios
        .put(`http://127.0.0.1:8000/steps/${step.id}/`,
            step
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

export async function createPutUrl(url) {

    return ((await axios
        .put(`http://127.0.0.1:8000/url/${url.id}/`,
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
export async function createPutFood(food) {
    return ((await axios
        .put(`http://127.0.0.1:8000/foods/${food.id}/`, food
        ).then(res => res)))
}

export async function createDeleteFood(food) {
    return ((await axios
        .delete(`http://127.0.0.1:8000/foods/${food.id}/`,
        ).then(res => res)))
}

export async function createPostImagefood(
    { formdata }
) {
    return ((await axios
        .post("http://127.0.0.1:8000/imagefood/", formdata,
            {
                withCredentials: false,
                headers: {
                    "X-CSRFToken": "csrftoken",
                },
            }
        ).then((res) => res)
    ))
}

export async function createPutImagefood(putFormdata) {
    return (
        (await axios
            .put(`http://127.0.0.1:8000/imagefood/${putFormdata.id}/`, (putFormdata.imageForm)
                , {
                    withCredentials: false,
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


export async function createPutIngredients(ingredients) {

    //id,  units, quantity, ingredientName, ingreposition)
    return ((await axios
        .put(`http://127.0.0.1:8000/ingredients/${ingredients.id}/`,
            {
                id: ingredients.id, units: [ingredients.units[0].id], quantity: ingredients.quantity, ingredientName: [ingredients.ingredientName[0].id], position: ingredients.position
            }).then(res => res)))
}



