import axios from 'axios';
import qs from 'qs';

export async function defaultQueryFn({ queryKey }) {
    const { data } = await axios.get(`http://127.0.0.1:8000${queryKey[0]}`);
    return data;
}

export async function imageExists(image_url) {
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status !== 404;
}

export async function getFood(id) {
    return await axios
        .get(`http://127.0.0.1:8000/foods/${id}/ `, {})
        .then((res) => res.data);
}

export async function getIngredients() {
    return await axios
        .get(`http://127.0.0.1:8000/ingredients/`, {})
        .then((res) => res.data);
}

export async function getIngredientsID(id) {
    return await axios
        .get(`http://127.0.0.1:8000/ingredients/${id}/ `, {})
        .then((res) => res.data);
}
export async function getIngredient() {
    return await axios
        .get(`http://127.0.0.1:8000/ingredient/`, {})
        .then((res) => res.data);
}

export async function getIngredientID(id) {
    return await axios
        .get(`http://127.0.0.1:8000/ingredient/${id}/ `, {})
        .then((res) => res.data);
}

export async function getUnit() {
    return await axios
        .get(`http://127.0.0.1:8000/unit/`, {})
        .then((res) => res.data);
}

export async function getUnitID(id) {
    return await axios
        .get(`http://127.0.0.1:8000/unit/${id}/ `, {})
        .then((res) => res.data);
}

export async function getFoodTags() {
    return await axios
        .get(`http://127.0.0.1:8000/foodTags/`, {})
        .then((res) => res.data);
}
export async function getSteps() {
    return await axios
        .get(`http://127.0.0.1:8000/steps/`, {})
        .then((res) => res.data);
}

export async function getStep(id) {
    return await axios
        .get(`http://127.0.0.1:8000/steps/${id}/ `, {})
        .then((res) => res.data);
}
export async function getImageFood() {
    return await axios
        .get(`http://127.0.0.1:8000/imagefood/`, {})
        .then((res) => res.data);
}

export async function getImage(id) {
    return await axios
        .get(`http://127.0.0.1:8000/imagefood/${id}/ `, {})
        .then((res) => {
            return res.data;
        });
}

export async function getUrl(id) {
    return await axios
        .get(`http://127.0.0.1:8000/url/${id}/ `, {})
        .then((res) => res.data);
}

export async function getDataId(queryKey) {
    return await axios
        .get(`http://127.0.0.1:8000/${queryKey[0]}/${queryKey[1]}/`, {})
        .then((res) => res.data);
}

export async function checkDataNameParams(axiosPrivate, queryKey, search) {
    let isMounted = true;
    const controller = new AbortController();
    const res = await axiosPrivate
        .get(`${queryKey[0]}/`, {
            params: search,
            signal: controller.signal,
        })
        .then((res) => res);
    // eslint-disable-next-line no-unused-vars
    isMounted = false;
    controller.abort();
    return await res;
}

export async function getData(queryKey) {
    return await axios
        .get(`http://127.0.0.1:8000/${queryKey}/`, {})
        .then((res) => res.data);
}

export async function getDataPrivate(axiosPrivate, queryKey) {
    let isMounted = true;
    const controller = new AbortController();
    const res = await axiosPrivate
        .get(`${queryKey}/`, {
            signal: controller.signal,
        })
        .then((res) => res.data);
    // eslint-disable-next-line no-unused-vars
    isMounted = false;
    controller.abort();
    return await res;
}

export async function getDataPrivateID(axiosPrivate, queryKey) {
    let isMounted = true;
    const controller = new AbortController();

    const res = await axiosPrivate
        .get(`${queryKey[0]}/${queryKey[1]}/`, {
            signal: controller.signal,
        })
        .then((res) => res.data);
    // eslint-disable-next-line no-unused-vars
    isMounted = false;
    controller.abort();
    return await res;
}

export async function getDataImagesFood(axiosPrivate, queryKey) {
    let isMounted = true;
    const controller = new AbortController();
    const res = await axiosPrivate
        .get(`${queryKey[0]}/?food=${queryKey[1]}`, {
            signal: controller.signal,
        })
        .then((res) => res.data);
    // eslint-disable-next-line no-unused-vars
    isMounted = false;
    controller.abort();

    return await res;
}

export async function getDataImagesEmail(axiosPrivate, queryKey) {
    let isMounted = true;
    const controller = new AbortController();
    const res = await axiosPrivate
        .get(`${queryKey[0]}/?food=${queryKey[1]}`, {
            signal: controller.signal,
        })
        .then((res) => res.data);
    const blob = await res.blob();
    // eslint-disable-next-line no-unused-vars
    isMounted = false;
    controller.abort();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
    // return await res
}

export async function getDataPrivateParams(
    axiosPrivate,
    queryKey,
    foodTags,
    user__id__in,
    search,
    ordering,
    page,
    page_size,
) {
    let isMounted = true;
    const controller = new AbortController();
    const res = await axiosPrivate
        .get(`${queryKey[0]}/`, {
            params: {
                foodTags,
                user__id__in,
                search,
                ordering,
                page,
                page_size,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
            signal: controller.signal,
        })
        .then((res) => res.data);
    // eslint-disable-next-line no-unused-vars
    isMounted = false;
    controller.abort();
    return await res;
}

export async function getFoodsPageFn(
    foodTags__foodTag,
    search,
    ordering,
    page,
    page_size,
) {
    return await axios
        .get(`http://127.0.0.1:8000/foods/`, {
            // params: {foodTags__foodTag: foodTags__foodTag, page:page, search:search ,page_size :pageSize},
            params: { foodTags__foodTag, search, ordering, page, page_size },
        })
        .then((res) => res.data);
}
