import style from "./Foods.module.css";
import { useState, useEffect } from "react";
import Modal from "../reports/Modal";
import FoodItemList from "./FoodItemList";
import TagInput from "./TagInput";
import LeftPanelFilter from "./LeftPanelFilter";
import SaveError from "../reports/SaveError";
import PageButton from "./PageButton"
import React from "react";
import { useQueryClient, } from "@tanstack/react-query"
import { Link, useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { useGet, useMutate } from "restful-react";
// import { RestfulProvider, error } from "restful-react";
import { render } from "@testing-library/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useFoods } from "../hooks/Queries/useFoods";
import { useImagesList } from "../hooks/Queries/useImagesList";
import { useTags } from "../hooks/Queries/useTags";
import { usePostTag } from "../hooks/Mutations/usePostTag";
import useAuth from "../hooks/useAuth";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";


function Foods(props) {
    const component = "foodscomponent"
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const foodTags__foodTagPar = searchParams.get('foodTags__foodTag')
    const searchPar = searchParams.get('search')
    const pageSizePar = searchParams.get('page_size')
    const pagePar = searchParams.get('page')
    const orderingPar = searchParams.get('ordering')

    const { page,setPage, pageSize, setPageSize,ordering, setOrdering} = useAuth();



    const location = useLocation()
    const foodsURL = location


    const foodsQf = useFoods(foodTags__foodTagPar, searchPar, orderingPar,pagePar, pageSizePar)
    const imagesQf = useImagesList(foodsQf)
    const tagsQf = useTags()

    console.log("foodQf :",foodsQf)
    const postFoodTag = usePostTag(addToTagList, handlerSetModalError)


    useEffect(() => {
        if (tagsQf.data !=undefined) { searchLoader() }
    }, [tagsQf.data])

    function paramsUpdater(params) {
        if (foodTags__foodTagPar != null) { return params.foodTags__foodTag = foodTags__foodTagPar }
        if (searchPar != null) { return params.search = searchPar }
    }

function orderingHandler(e){
    setOrdering(e.target.value)
    let params = {}
    paramsUpdater(params)
    params.ordering = e.target.value
    params.page = 1
    params.page_size = pageSize

    setSearchParams(params)
}
    function pageSizeChange(e) {
        setPageSize(e.target.value)
        let params = {}
        paramsUpdater(params)
        params.ordering = ordering
        params.page = 1
        params.page_size = e.target.value
        setSearchParams(params)
        setPage(1)
    }

    function pageChange(newpage) {
        setPage(newpage)
        let params = {}
        paramsUpdater(params)
        params.ordering = ordering
        params.page = newpage
        params.page_size = pageSize
        setSearchParams(params)
    }



    function searchLoader() {
        if (foodTags__foodTagPar) {
            const searchtag = foodTags__foodTagPar.split("&")
            searchtag.map((tag) => filterTagSetCheck(tag))
        }
        if (searchPar) {
            const searchtag = searchPar.split("&")
            searchtag.map((tag) => searchAddToTagList(tag))
        }
    }


    function handler(a, b) {
        let list = []
        a?.map((f) => {
            b?.map((e) => {
                if (e.id == f) {
                    list.push(e);
                }
            });
        });
        return list
    }


    const [foods, setFoods] = useState([])
    const [imgLoader, setImgLoader] = useState(0)


    useEffect(() => {

        let foods = []
        if (!foodsQf.isLoading && !imagesQf.isLoading && !tagsQf.isLoading) {
            foodsQf?.data?.results?.map((data) => {

                foods.push({
                    id: data.id,
                    name: data.name,
                    images: handler([data.images[0]], imagesQf.data),
                    foodTags: handler(data.foodTags, tagsQf.data),

                })
            })
            setFoods(foods)
            setImgLoader(foods.length)
        }
    }, [foodsQf.data, imagesQf.data, tagsQf.data])

    const [filterTagSet, setFilterTagSet] = useState(new Set([]));
    const [modalErrorFlag, setModalErrorFlag] = useState(false);



    function addToTagList(tag) {

        if (tag.foodTag === "") {
            return;
        } else if (Array.from(filterTagSet).map(res => res.foodTag.toLowerCase()).includes(tag.foodTag.toLowerCase())) {
            return;
        }

        let newTagList = new Set(filterTagSet);
        newTagList.add(tag);
        let foodTags__foodTag = Array.from(newTagList).map(res => res.foodTag).join("&")
        setSearchParams({ foodTags__foodTag: foodTags__foodTag, ordering: ordering ,page: 1, page_size: pageSize })
        setFilterTagSet(newTagList);
        setPage(1)
    }



    function searchAddToTagList(tag) {
        setSearchParams({ search: tag, page: 1, page_size: pageSize })
        setPage(1)
        let newTagList = [{ id: 0, foodTag: tag }];
        setFilterTagSet(newTagList);

    }

    function removeFromTagSet(tag) {
        let newFilterTagSet = new Set(filterTagSet)
        newFilterTagSet.delete(tag)
        setFilterTagSet(newFilterTagSet);
        if (newFilterTagSet.size == 0) {
            setSearchParams({ordering: ordering , page: 1, page_size: pageSize })
        }
        else {
            let foodTags__foodTag = (`${Array.from(newFilterTagSet).map(res => res.foodTag).join("&")}`)
            setSearchParams({ foodTags__foodTag: foodTags__foodTag, ordering: ordering ,page: 1, page_size: pageSize })
        }

    }


    function handlerSetModalError() {
        setModalErrorFlag(true)
        setTimeout(() => {
            setModalErrorFlag(false)
        }, 3000)
    }

    function tagSearchInArray(array, label) {

        let response;
        array
            .map((str) => {
                if (str?.foodTag.toLowerCase()
                    .includes(label)) { response = str }
            })
        return response
    }

    function dataFoodTagsCheck(foodTag) {
        const response = tagSearchInArray(tagsQf?.data, foodTag)
        if (response === undefined) {
            postFoodTag.mutate({ foodTag: foodTag })
        } else {
            console.log("response :", response)
            addToTagList(response)
        }
    }

    function filterTagSetCheck(foodTag) {
        console.log("Filter foodTag :", foodTag)
        const response = tagSearchInArray([...filterTagSet], foodTag)
        if (response === undefined) { dataFoodTagsCheck(foodTag) } else {
            removeFromTagSet(response)
        }
    }

    // const pagesArray = Array(foodsQf?.data?.TotalNumOfPages).fill().map((_, index) => index + 1)

    return (
        <>
            {(foodsQf.isLoading || imagesQf.isLoading || tagsQf.isLoading) ? (
                
                <div className={style.loadingContainer}>
                    <FontAwesomeIcon
                        className={style.loadingIcon}
                        icon={faSpinner}
                        id="inpFileIcon"
                        spin ></FontAwesomeIcon>
                </div>
           )
                : (<> 
             <div className={style.foodsmain}>
                <div className={style.searchbox}>
                
                {/* <div>Zoradit podla</div>
                <select
            className={style.ordering}
            onChange={(e) => orderingHandler(e)}
            value={ordering}
          >
            <option value="date">Najnovsi</option>
            <option value="-date">Najstarsi</option>
            <option value="name">A-Z</option>
            <option value="-name">Z-A</option>
 

          </select> */}
                    <TagInput
                        filterTagListState={[filterTagSet, setFilterTagSet]}
                        searchAddToTagList={searchAddToTagList}
                        removeFromTagList={removeFromTagSet}
                    />

                    <div className={style.foodButton} onClick={() => navigate(`/recepty/novy_recept/`, { state: { foods: foodsURL } })}>
                    Nový recept
                    </div>
                </div>
                    <div className={style.main}>

                        <LeftPanelFilter
                            onFoodTagSet={filterTagSet}
                            handleAddTagToFoodTagsList={filterTagSetCheck}
                            // handleAddTagToFoodTagsList2={foodTagListCheck2}
                            foodTagsContainer={foodsQf?.data?.tags_list}
                            orderingHandler={orderingHandler}
                            component={component}
                        />

          
                            <FoodItemList
                                foods={foods}
                                imgLoader={[imgLoader, setImgLoader]}
                                filterTagList={filterTagSet}
                                foodsURL={foodsURL}

                                pageSizeChange={pageSizeChange}
                                pageChange={pageChange}
                                page={page}
                                pageSize={pageSize}
                                foodsQf={foodsQf}
                            ></FoodItemList>

               
                        {/* <div className={style.paginationBox}>
                                <nav className={style.navigationbar}>
                                    <button className={style.button} onClick={() => pageChange(page - 1)} disabled={!foodsQf?.data?.previous || page === 1} id={!foodsQf?.data?.previous || page === 1 ? style["buttondisabled"] : style["buttonenabled"]}>&lt;&lt;</button>
                                    {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page} pageChange={pageChange} />)}
                                    <button className={style.button} onClick={() => pageChange(page + 1)} disabled={page === foodsQf?.data?.TotalNumOfPages} id={page === foodsQf?.data?.TotalNumOfPages ? style["buttondisabled"] : style["buttonenabled"]}>&gt;&gt;</button>
                                </nav>
                                <div className={style.navdisplay}>({foodsQf?.data?.FirstItemsOnPage} - {foodsQf?.data?.LastItemsOnPage})  z  {foodsQf?.data?.TotalItems}

                                    <select
                                        className={style.pageSize}
                                        onChange={(e) => pageSizeChange(e)}
                                        value={pageSize}
                                    >
                                        <option>2</option>
                                        <option>4</option>
                                        <option>6</option>
                                        <option>8</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>40</option>

                                    </select>
                                </div>
                            </div> */}
                    </div>

                    <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
                        <SaveError
                        ></SaveError>
                    </Modal>
                    </div> </>)}
        </>
    );
}

export default Foods;
