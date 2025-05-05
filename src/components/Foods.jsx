import style from "./Foods.module.css";
import { useState, useEffect } from "react";
import Modal from "../reports/Modal";
import FoodItemList from "./FoodItemList";
import TagInput from "./TagInput";
import LeftPanelFilter from "./LeftPanelFilter";
import SaveError from "../reports/SaveError";
import React from "react";
import { Link, useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useFoods } from "../hooks/Queries/useFoods";
import { useImagesList } from "../hooks/Queries/useImagesList";
import { useTags } from "../hooks/Queries/useTags";
import { usePostTag } from "../hooks/Mutations/usePostTag";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function Foods(props) {
    const component = "foodscomponent"
      const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const foodTags__foodTagPar = searchParams.get('foodTags__foodTag')
    const searchPar = searchParams.get('search')
    const pageSizePar = searchParams.get('page_size')
    const pagePar = searchParams.get('page')
    const orderingPar = searchParams.get('ordering')

    const { page, setPage, pageSize, setPageSize, ordering, setOrdering } = useAuth();



    const location = useLocation()
    console.log("location :",location)


    const foodsQf = useFoods(axiosPrivate, foodTags__foodTagPar, searchPar, orderingPar,pagePar, pageSizePar)
    const imagesQf = useImagesList(axiosPrivate, foodsQf)
    const tagsQf = useTags(axiosPrivate)


    const postFoodTag = usePostTag(addToTagList, handlerSetModalError)

    const [foods, setFoods] = useState([])
    const [imgLoader, setImgLoader] = useState(0)
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (tagsQf.data != undefined) { searchLoader() }
    }, [tagsQf.data])


    
    useEffect(() => {
        if (!searchPar ||!orderingPar || !pagePar|| !pageSizePar) { 
            setSearchParams({ordering:ordering,page:page,page_size :pageSize})}
    }, [])
    
    useEffect(() => {
        if (imgLoader === 0) {
          setLoad(true); 
        }
      }, [imgLoader, foods.length]);




    function paramsUpdater(params) {
        if (foodTags__foodTagPar != null) { return params.foodTags__foodTag = foodTags__foodTagPar }
        if (searchPar != null) { return params.search = searchPar }
    }

    function orderingHandler(e) {
        setOrdering(e.target.value)
        let params = {}
        paramsUpdater(params)
        params.ordering = e.target.value
        params.page = 1
        params.page_size = pageSize
        setPage(1)
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





console.log("foodsQf :",foodsQf)
console.log("imagesQf :",imagesQf)
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
        setSearchParams({ foodTags__foodTag: foodTags__foodTag, ordering: ordering, page: 1, page_size: pageSize })
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
            setSearchParams({ ordering: ordering, page: 1, page_size: pageSize })
        }
        else {
            let foodTags__foodTag = (`${Array.from(newFilterTagSet).map(res => res.foodTag).join("&")}`)
            setSearchParams({ foodTags__foodTag: foodTags__foodTag, ordering: ordering, page: 1, page_size: pageSize })
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
            addToTagList(response)
        }
    }

    function filterTagSetCheck(foodTag) {

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

                            <div className={style.foodButton} onClick={() => navigate(`/recepty/novy_recept/`, { state: { foods: location } })}>
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
                                filterTagList={filterTagSet}
                                location={location}
                                onImgLoader={[imgLoader, setImgLoader]}
                                pageSizeChange={pageSizeChange}
                                pageChange={pageChange}
                                page={page}
                                pageSize={pageSize}
                                foodsQf={foodsQf}
                                load={load}
                            ></FoodItemList>
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
