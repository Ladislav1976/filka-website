import style from "./LeftPanelFilter.module.css";

//props.visible -> says if modal should appear
export default function LeftPanelFilter(props) {
    // const handleAddToFoodTagList = props.handleAddToFoodTagList
    // const foodTagSetArray = props.foodTagSetArray
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
                    <img
                        className={style.image}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTszKfZHLLDSg5p19IXvQ9I8-XQbORjp8BTw&usqp=CAU"
                        alt="POLIEVKY"
                    //   onClick={() => handleAddToFoodTagList("POLIEVKY")}
                    // onClick={() =>  handleAddToTagList("POLIEVKY") } 
                    // checked={handleFilterTagListArray("POLIEVKY")}
                    // checked={foodTagSetArray.includes("POLIEVKY")}
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("polievky")}

                            className={style.checkboxInput}
                            name="POLIEVKY"
                            id="POLIEVKY"
                            key="POLIEVKY"
                            onChange={() => handleAddToTagList("POLIEVKY")}
                        // onChange={() => handleAddToFoodTagList("POLIEVKY")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("POLIEVKY")}
                        >
                            POLIEVKY
                        </label>
                    </div>
                </div>
                <div className={style.food}>
                    <img
                        className={style.image}
                        src="https://www.gyron.sk/storage/article_images/f_2011020010.png"
                        alt="MASO A HYDINA"
                    // onClick={() => handleAddToFoodTagList("MASO A HYDINA")}
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("maso a hydina")}
                            name="MASO A HYDINA"
                            className={style.checkboxInput}
                            id="MASO A HYDINA"
                            key="MASO A HYDINA"
                            onChange={() => handleAddToTagList("MASO A HYDINA")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("MASO A HYDINA")}
                        >
                            MASO A HYDINA
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("hovadzie")}
                            name="HOVADZIE"
                            className={style.checkboxInput}
                            id="HOVADZIE"
                            key="HOVADZIE"
                            onChange={() => handleAddToTagList("HOVADZIE")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("HOVADZIE")}
                        >
                            HOVADZIE
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("bravcove")}
                            name="BRAVCOVE"
                            className={style.checkboxInput}
                            id="BRAVCOVE"
                            key="BRAVCOVE"
                            onChange={() => handleAddToTagList("BRAVCOVE")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("BRAVCOVE")}
                        >
                            BRAVCOVE
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kuracie")}
                            name="KURACIE"
                            className={style.checkboxInput}
                            id="KURACIE"
                            key="KURACIE"
                            onChange={() => handleAddToTagList("KURACIE")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("KURACIE")}
                        >
                            KURACIE
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kacacie")}
                            name="KACACIE"
                            className={style.checkboxInput}
                            id="KACACIE"
                            key="KACACIE"
                            onChange={() => handleAddToTagList("KACACIE")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("KACACIE")}
                        >
                            KACACIE
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kralik")}
                            name="KRALIK"
                            className={style.checkboxInput}
                            id="KRALIK"
                            key="KRALIK"
                            onChange={() => handleAddToTagList("KRALIK")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("KRALIK")}
                        >
                            KRALIK
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("jahna")}
                            name="JAHNA"
                            className={style.checkboxInput}
                            id="JAHNA"
                            key="JAHNA"
                            onChange={() => handleAddToTagList("JAHNA")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("JAHNA")}
                        >
                            JAHNA
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("ryba")}
                            name="RYBA"
                            className={style.checkboxInput}
                            id="RYBA"
                            key="RYBA"
                            onChange={() => handleAddToTagList("RYBA")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("RYBA")}
                        >
                            RYBA
                        </label>
                    </div>
                </div>
                <div className={style.foodMaso}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("ine")}
                            name="INE"
                            className={style.checkboxInput}
                            id="INE"
                            key="INE"
                            onChange={() => handleAddToTagList("INE")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("INE")}
                        >
                            INE
                        </label>
                    </div>
                </div>

                <div className={style.food}>
                    <img
                        className={style.image}
                        // src="https://img.mimibazar.sk/s/bs/9/220205/19/i60958.jpg"
                        src="https://img.aktuality.sk/foto/MHgyODk6NTQ4MngzMzY5LzkyMHg1MTgvc21hcnQvaW1n/gjmMQVO2Q6uwVmy_2PHuUA.jpg?st=EH4nQQprrhExfzBoAJeTaJ60jCANc_0ab4UHfYAVh8U&ts=1531738202&e=0"
                        alt="BEZMASITE JEDLA"
                    //onClick={() => handleAddToFoodTagList("BEZMASITE JEDLA")}
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("bezmasite jedla")}
                            name="BEZMASITE JEDLA"
                            className={style.checkboxInput}
                            id="BEZMASITE JEDLA"
                            key="BEZMASITE JEDLA"
                            onChange={() => handleAddToTagList("BEZMASITE JEDLA")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("BEZMASITE JEDLA")}
                        >
                            BEZMASITE JEDLA
                        </label>
                    </div>
                </div>

                <div className={style.food}>
                    <img
                        className={style.image}
                        
                        src="https://img.topky.sk/vysetrenie/big/2510233.jpg/ryza-priloha.jpg"
                        alt="PRILOHY"
                    //onClick={() => handleAddToFoodTagList("PRILOHY")}
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("prilohy")}
                            name="PRILOHY"
                            className={style.checkboxInput}
                            id="PRILOHY"
                            key="PRILOHY"
                            onChange={() => handleAddToTagList("PRILOHY")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("PRILOHY")}
                        >
                            PRILOHY
                        </label>
                    </div>
                </div>

                <div className={style.food}>
                    <img
                        className={style.image}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGE2i7To_F9Sl2qbNG6Fv38hZ0MAilY4l-phNS4mpieX6znGVYrl5K8C48pdjWCWbx-s&usqp=CAU"
                        alt="KOLACE A DEZERTY"
                    //onClick={() => handleAddToFoodTagList("KOLACE A DEZERTY")}
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("kolace a dezerty")}
                            name="KOLACE A DEZERTY"
                            className={style.checkboxInput}
                            id="KOLACE A DEZERTY"
                            key="KOLACE A DEZERTY"
                            onChange={() => handleAddToTagList("KOLACE A DEZERTY")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("KOLACE A DEZERTY")}
                        >
                            KOLACE A DEZERTY
                        </label>
                    </div>
                </div>
                <div className={style.food}>
                    <img
                        className={style.image}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVgjDPFoecZAoqQkNrjFaKaF1M7Iy2K4daQ&usqp=CAU"
                        alt="CESTOVINY"
                    //onClick={() => handleAddToFoodTagList("CESTOVINY")}
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("cestoviny")}
                            name="CESTOVINY"
                            className={style.checkboxInput}
                            id="CESTOVINY"
                            key="CESTOVINY"
                            onChange={() => handleAddToTagList("CESTOVINY")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("CESTOVINY")}
                        >
                            CESTOVINY
                        </label>
                    </div>
                </div>
                <div className={style.food}>
                    <img
                        className={style.image}
                        src="https://img.aktuality.sk/foto/MHg1MTk6NDg1MHgzMjM1LzkyMHg3NjAvc21hcnQvaW1n/mS3qqABtQ1vf_Yi8XVL5Cw.jpg?st=7ygkC0k_nRu6IarjLFo0TL4_jSQ6j_LWctMX2-SUBoQ&ts=1600752583&e=0"
                        alt="NATIERKY"
                    //onClick={() => handleAddToFoodTagList("NATIERKY")}
                    />

                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray("natierky")}
                            name="NATIERKY"
                            className={style.checkboxInput}
                            id="NATIERKY"
                            key="NATIERKY"
                            onChange={() => handleAddToTagList("NATIERKY")}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList("NATIERKY")}
                        >
                            NATIERKY
                        </label>
                    </div>
                </div>

            </div></>)
}
