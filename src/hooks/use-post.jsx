import { useQuery, useMutation } from "@tanstack/react-query"
import axios from 'axios';
// window.axios = require('axios');

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// /**
//  * Next we will register the CSRF Token as a common header with Axios so that
//  * all outgoing HTTP requests automatically have it attached. This is just
//  * a simple convenience so we don't have to attach every token manually.
//  */

// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }



export async function createPostStep({ step, position }) {
    console.log("a", step, position)
    return ((position), (await axios
        .post("http://127.0.0.1:8000/steps/", {
            step,
        }).then(res => res.data)))

}

export async function createPutStep({ id, step, position }) {
    console.log("a", id, step, position)
    return ((await axios
        .put(`http://127.0.0.1:8000/steps/${id}/`, {
            step
        }).then(res => res.data)))
}

export async function createDeleteStep({ id, step }) {
    console.log("a", id, step)
    return ((await axios
        .delete(`http://127.0.0.1:8000/steps/${id}/`,
        ), (id, step)))
}


export async function createPostUnit({ unit,times ,ingredient}) {
    return ((times), (await axios
        .post("http://127.0.0.1:8000/unit/", {
            unit,
        }).then(res => res.data)))
}

export async function createPostIngredient({ unit,times ,ingredient}) {
    console.log("a", unit,times ,ingredient)
    return ((times), (await axios
        .post("http://127.0.0.1:8000/ingredient/", {
            ingredient:ingredient
        }).then(res => res.data)))
}

export async function createPostIngredients({ volume, units, ingredientName}) {
    console.log("a", volume, units, ingredientName)
    return ((await axios
        .post("http://127.0.0.1:8000/ingredients/", {
            volume, units, ingredientName
        }).then(res => res.data)))
}
export async function createPostFoodTag({ foodTag}) {
    console.log("a", foodTag)
    return ((await axios
        .post("http://127.0.0.1:8000/foodTags/", {
            foodTag
        }).then(res => res.data)))
}

export async function createPostFood({ foodTag}) {
    console.log("a", foodTag)
    return ((await axios
        .post("http://127.0.0.1:8000/foods/", {
            foodTag
        }).then(res => res.data)))
}
export async function createPutFood( {  id,
    name,
    date,
    ingredients,
    steps,
    foodTags} ) {
    return ((await axios
        .put(`http://127.0.0.1:8000/foods/${id}/`, {
            id,
            name,
            date,
            ingredients,
            steps,
            foodTags
        }).then(res => res.data)))
}

export async function createPostImagefood( {  
    // id,
    // name,
    // date,
    // ingredients,
    // steps,
    // foodTags,
    formdata} ) {
       
        return (
    // (
    // id,
    //         name,
    //         date,
    //         ingredients,
    //         steps,
    //         foodTags
            // ),
            (
                
                await axios
        .post("http://127.0.0.1:8000/imagefood/",            formdata        ,
        { headers: { "X-CSRFToken": "csrftoken" ,
            },
          }
        
        )))
}

export async function createDeleteImagefood( { 
    id,
    name,
    image,
    date,
    food,
 } ) {
    return (await axios
        .delete(`http://127.0.0.1:8000/imagefood/${id}/`,   
        id,
        name,
        image,
        date,
        food,
        ))
}


