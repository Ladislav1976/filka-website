import { useQuery, useMutation } from "@tanstack/react-query"
import axios from 'axios';




export async function createPostStep({ id, step, stposition

}) {
console.log(" POST step ",id, step, stposition)
    return (
        (id),
         (await axios
        .post("http://127.0.0.1:8000/steps/", {
            step, stposition
        }).then(res => res.data)))

}

export async function createPutStep({ id, step, stposition }) {
    console.log("PUT step",  id, step, stposition)
    return ((await axios
        .put(`http://127.0.0.1:8000/steps/${id}/`, {
            id, step, stposition
        }).then(res => res.data)))
}

export async function createDeleteStep({ id, step, stposition }) {
    console.log("DELETE step",  id,"2", step, "3",stposition)
    return ((await axios
        .delete(`http://127.0.0.1:8000/steps/${id}/`, 
            { id, step, stposition }
    ).then((res) => { console.log("Delete res: ",res); return res.status })))
}


export async function createPostUnit({ unit, times, ingredient }) {
    return ((times), (await axios
        .post("http://127.0.0.1:8000/unit/", {
            unit,
        }).then(res => res.data)))
}

export async function createPostIngredient({ unit, times, ingredient }) {

    return ((times), (await axios
        .post("http://127.0.0.1:8000/ingredient/", {
            ingredient: ingredient
        }).then(res => res.data)))
}

export async function createPostIngredients({ volume, units, ingredientName }) {

    return ((await axios
        .post("http://127.0.0.1:8000/ingredients/", {
            volume, units, ingredientName
        }).then(res => res.data)))
}
export async function createPostFoodTag({ foodTag }) {

    return ((await axios
        .post("http://127.0.0.1:8000/foodTags/", {
            foodTag
        }).then(res => res.data)))
}

export async function createPostFood({ 
     name,
    date,
    ingredients,
    steps,
    foodTags,
    image
 }) {

    return ((image), (await axios
        .post("http://127.0.0.1:8000/foods/", {
            name,
            date,
            ingredients,
            steps,
            foodTags,
        }).then(res => res.data)))
}
export async function createPutFood({
    
    id,
    name,
    date,
    ingredients,
    steps,
    foodTags,
    image
}) {
    return ((image), (await axios
        .put(`http://127.0.0.1:8000/foods/${id}/`, {
            id,
            name,
            date,
            ingredients,
            steps,
            foodTags,
        }).then(res => res.data)))
}

export async function createPostImagefood({

    formdata
}) {

    return (
        (

            await axios
                .post("http://127.0.0.1:8000/imagefood/", formdata,
                    {
                        withCredentials: false,
                        headers: {
                            "X-CSRFToken": "csrftoken",
                        },
                    }

                ).then((res) => res.data)
        ))
}

export async function createPutImagefood({ newImage }) {

    return (

        (await axios
            .put(`http://127.0.0.1:8000/imagefood/${newImage.id}/`, newImage
                ,
            ).then((res) => res.data)
        ))
}

export async function createDeleteImagefood({
    id,
    name,
    image,
    date,
    food,
}) {
    return (await axios
        .delete(`http://127.0.0.1:8000/imagefood/${id}/`,
            id,
            name,
            image,
            date,
            food,
        ).then((res) => { return res.status }))
}

export async function createDeleteImagefood2({
queryKey
}) {
    return (await axios
        .delete(`http://127.0.0.1:8000${queryKey[0]}`,
         
        ).then((res) => { return res.status }))
}
