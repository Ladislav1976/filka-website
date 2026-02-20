export default function useEmailFormSubmit(
    dataName,
    dataSteps,
    dataIngredients,
    dataUrls,
    dataImages,
) {
    let textingre = '';
    let textstep = '';
    let texturls = '';
    function ensureArray(data) {
        if (!data) return [];
        // Ak je to objekt, ktorý má v sebe vlastnosť data (časté v React Query), vezmeme tú
        const source = data.data ? data.data : data;
        return Array.isArray(source) ? source.flat() : [source];
    }
    const name = `Nazov: \n${dataName}`;
    console.log(dataIngredients);
    const ingredient =
        dataIngredients.length > 0
            ? `Suroviny: \n${textingre.concat(
                  dataIngredients.map((res, index) => {
                      const unitsArray = ensureArray(res.unit);
                      const ingredientsArray = ensureArray(res.ingredient);
                      return unitsArray.map((u) => {
                          return ingredientsArray.map((i) => {
                              return `${index + 1}. ${res.quantity} ${u.unit}  ${
                                  i.ingredient
                              }\n`;
                          });
                      });
                  }),
              )}`
            : '';

    const steps =
        dataSteps.length > 0
            ? `Postup: \n${textstep.concat(
                  dataSteps.map((res, index) => `${index + 1}. ${res.step}\n`),
              )}`
            : '';
    const urlsTemp =
        dataUrls.length > 0
            ? texturls.concat(
                  dataUrls.map((res, index) => `${index + 1}. ${res.url}\n`),
              )
            : '';
    let urls = '';
    if (urlsTemp) {
        urls = `URL: \n${urlsTemp}`;
    }
    // const images =
    //     dataImages.length > 0
    //         ? `Obrázky: \n${dataImages.map((img) => (typeof img === 'string' ? img : <img src={img.image} alt="" />)).join('\n')}`
    //         : '';
    const images = `Fotky (vložené): \n${dataImages
        .map((res) => {
            // Ak už máš base64 string, vložíš ho takto:
            return `data:image/jpeg;base64,${res.base64Content}`;
        })
        .join('\n')}`;
    // const images = `Fotky: \n${textimages.concat(dataImages.map((res, index) => (`${index + 1}. ${res.step}\n`)))}`
    const res =
        `RECEPT: \n\n${name}\n\n${ingredient}\n\n${steps}\n\n${urls}\n\n${images}`
            .split(',')
            .join('');
    return res;
}
