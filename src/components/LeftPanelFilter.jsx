import style from "./LeftPanelFilter.module.css";

//props.visible -> says if modal should appear
export default function LeftPanelFilter(props) {
    // const handleAddToFoodTagList = props.handleAddToFoodTagList
    const foodTagsBox = props.foodTagsBox
    let tagList = [{tagName:"polievky",quantity:0},{tagName:"maso a hydina",quantity:0},{tagName:"hovadzie",quantity:0},{tagName:"bravcove",quantity:0},{tagName:"kuracie",quantity:0},{tagName:"kacacie",quantity:0},{tagName:"kralik",quantity:0},{tagName:"jahna",quantity:0},{tagName:"ryba",quantity:0},{tagName:"ine",quantity:0},{tagName:"bezmasite jedla",quantity:0},{tagName:"prilohy",quantity:0},{tagName:"kolace a dezerty",quantity:0},{tagName:"cestoviny",quantity:0},{tagName:"natierky",quantity:0}] 
    if (foodTagsBox!=null){
        for (let foodTag of foodTagsBox){
            for (let a of foodTag){ for(let i of tagList ) {if (i.tagName==a){               
                i.quantity += 1
            }}}
        }
    }

    const filterTagListArray = props.filterTagListArray
    const handleAddToTagList = props.handleAddToTagList

    function isObjectEmpty(objectName) {
        return Object.keys(objectName).length === 0
    }

    function handleFilterTagListArray(label) {
        return filterTagListArray
            .map((str) => str.toLowerCase())
            .includes(label)

    }


    return (
        <>

            <div className={style.foodtypesbox}>
                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTszKfZHLLDSg5p19IXvQ9I8-XQbORjp8BTw&usqp=CAU"
                        alt="polievky"
                    /> */}
                    <div  >
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("polievky")}

                            className={style.checkboxInput}
                            name="polievky"
                            id="polievky"
                            key="polievky"
                            onChange={() => handleAddToTagList("polievky")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("polievky")}
                        >
                            POLIEVKY <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[0].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        src="https://www.gyron.sk/storage/article_images/f_2011020010.png"
                        alt="maso a hydina"
                    /> */}
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("maso a hydina")}
                            name="maso a hydina"
                            className={style.checkboxInput}
                            id="maso a hydina"
                            key="maso a hydina"
                            onChange={() => handleAddToTagList("maso a hydina")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("maso a hydina")}
                        >
                           <b> MASO A HYDINA </b> <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[1].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("hovadzie")}
                            name="hovadzie"
                            className={style.checkboxInput}
                            id="hovadzie"
                            key="hovadzie"
                            onChange={() => handleAddToTagList("hovadzie")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("hovadzie")}
                        >
                            HOVADZIE <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[2].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("bravcove")}
                            name="bravcove"
                            className={style.checkboxInput}
                            id="bravcove"
                            key="bravcove"
                            onChange={() => handleAddToTagList("bravcove")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("bravcove")}
                        >
                            BRAVCOVE <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[3].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kuracie")}
                            name="kuracie"
                            className={style.checkboxInput}
                            id="kuracie"
                            key="kuracie"
                            onChange={() => handleAddToTagList("kuracie")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("kuracie")}
                        >
                            KURACIE <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[4].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kacacie")}
                            name="kacacie"
                            className={style.checkboxInput}
                            id="kacacie"
                            key="kacacie"
                            onChange={() => handleAddToTagList("kacacie")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("kacacie")}
                        >
                            KACACIE  <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[5].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kralik")}
                            name="kralik"
                            className={style.checkboxInput}
                            id="kralik"
                            key="kralik"
                            onChange={() => handleAddToTagList("kralik")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("kralik")}
                        >
                            KRALIK  <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[6].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("jahna")}
                            name="jahna"
                            className={style.checkboxInput}
                            id="jahna"
                            key="jahna"
                            onChange={() => handleAddToTagList("jahna")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("jahna")}
                        >
                            JAHNA <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[7].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("ryba")}
                            name="ryba"
                            className={style.checkboxInput}
                            id="ryba"
                            key="ryba"
                            onChange={() => handleAddToTagList("ryba")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("ryba")}
                        >
                            RYBA  <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[8].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("ine")}
                            name="ine"
                            className={style.checkboxInput}
                            id="ine"
                            key="ine"
                            onChange={() => handleAddToTagList("ine")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("ine")}
                        >
                            INE  <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[9].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>

                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        // src="https://img.mimibazar.sk/s/bs/9/220205/19/i60958.jpg"
                        src="https://img.aktuality.sk/foto/MHgyODk6NTQ4MngzMzY5LzkyMHg1MTgvc21hcnQvaW1n/gjmMQVO2Q6uwVmy_2PHuUA.jpg?st=EH4nQQprrhExfzBoAJeTaJ60jCANc_0ab4UHfYAVh8U&ts=1531738202&e=0"
                        alt="bezmasite jedla"
                    //onClick={() => handleAddToFoodTagList("BEZMASITE JEDLA")}
                    /> */}
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("bezmasite jedla")}
                            name="bezmasite jedla"
                            className={style.checkboxInput}
                            id="bezmasite jedla"
                            key="bezmasite jedla"
                            onChange={() => handleAddToTagList("bezmasite jedla")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("bezmasite jedla")}
                        >
                            BEZMASITE JEDLA <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[10].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>

                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        
                        src="https://img.topky.sk/vysetrenie/big/2510233.jpg/ryza-priloha.jpg"
                        alt="prilohy"
                    //onClick={() => handleAddToFoodTagList("PRILOHY")}
                    /> */}
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("prilohy")}
                            name="prilohy"
                            className={style.checkboxInput}
                            id="prilohy"
                            key="prilohy"
                            onChange={() => handleAddToTagList("prilohy")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("prilohy")}
                        >
                            PRILOHY <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[11].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>

                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGE2i7To_F9Sl2qbNG6Fv38hZ0MAilY4l-phNS4mpieX6znGVYrl5K8C48pdjWCWbx-s&usqp=CAU"
                        alt="kolace a dezerty"
                    //onClick={() => handleAddToFoodTagList("KOLACE A DEZERTY")}
                    /> */}
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kolace a dezerty")}
                            name="kolace a dezerty"
                            className={style.checkboxInput}
                            id="kolace a dezerty"
                            key="kolace a dezerty"
                            onChange={() => handleAddToTagList("kolace a dezerty")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("kolace a dezerty")}
                        >
                            KOLACE A DEZERTY <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[12].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVgjDPFoecZAoqQkNrjFaKaF1M7Iy2K4daQ&usqp=CAU"
                        alt="cestoviny"
                    //onClick={() => handleAddToFoodTagList("CESTOVINY")}
                    /> */}
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("cestoviny")}
                            name="cestoviny"
                            className={style.checkboxInput}
                            id="cestoviny"
                            key="cestoviny"
                            onChange={() => handleAddToTagList("cestoviny")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("cestoviny")}
                        >
                            CESTOVINY <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[13].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>
                <div className={style.food}>
                    {/* <img
                        className={style.image}
                        src="https://img.aktuality.sk/foto/MHg1MTk6NDg1MHgzMjM1LzkyMHg3NjAvc21hcnQvaW1n/mS3qqABtQ1vf_Yi8XVL5Cw.jpg?st=7ygkC0k_nRu6IarjLFo0TL4_jSQ6j_LWctMX2-SUBoQ&ts=1600752583&e=0"
                        alt="natierky"
                    //onClick={() => handleAddToFoodTagList("NATIERKY")}
                    /> */}

                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("natierky")}
                            name="natierky"
                            className={style.checkboxInput}
                            id="natierky"
                            key="natierky"
                            onChange={() => handleAddToTagList("natierky")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("natierky")}
                        >
                            NATIERKY <b className={style.tagQuantity}>{foodTagsBox ? `(${tagList[14].quantity})`:"" }</b>
                        </label>
                    </div>
                </div>

            </div></>)
}
