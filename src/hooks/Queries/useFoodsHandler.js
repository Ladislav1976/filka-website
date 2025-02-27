


export const useFoodsHandler = (foods, imgs , tags) => {
console.log("CCC",foods, imgs , tags)
    function handler(a, b) {
        let list = []
        console.log("a, b",a, b)
        a?.map((f) => {
            b?.map((e) => {
                if (e.id == f) {
                    list.push(e);
                }
            });
        });
        return list
    }
    let loader = []
    if (foods.data && imgs.data && tags.data) {
      
        foods?.data?.results?.map((data) => {

            loader.push({
                id: data.id,
                name: data.name,
                images: handler([data.images[0]], imgs.data),
                foodTags: handler(data.foodTags, tags.data),
            })
        })
        

    } 

return loader
}