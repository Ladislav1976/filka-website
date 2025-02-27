import style from "./Foods.module.css";
import { useState, useEffect } from "react";
import Modal from "../reports/Modal";
import NewFood from "./NewFood";
import EditFood from "./EditFood";
import FoodItemList from "./FoodItemList";
import TagInput from "./TagInput";
import LeftPanelFilter from "./LeftPanelFilter";
import SaveError from "../reports/SaveError";
import PageButton from "./PageButton"
import React from "react";
import { useQueries, useQuery, useQueryClient, useMutation, } from "@tanstack/react-query"
import { createPostFoodTag } from "../hooks/use-post";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useGet, useMutate } from "restful-react";
// import { RestfulProvider, error } from "restful-react";
import { render } from "@testing-library/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { defaultQueryFn, getFoodsPageFn, searchFoodsPageFn, getData, getImage, getFoodTags, getImageFood } from "../hooks/use-get";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useFoods } from "../hooks/Queries/useFoods";
import { useImagesList } from "../hooks/Queries/useImagesList";
import { useTags } from "../hooks/Queries/useTags";
import { usePostTag } from "../hooks/Mutations/usePostTag";


function Foods(props) {
    const axiosPrivate = useAxiosPrivate()
    const controller = new AbortController();
    const queryClient = useQueryClient();
    const component = "foodscomponent"
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const location = useLocation()
    const [loc, setLoc] = useState(location)
    useEffect(() => {
        setLoc(location)
    }, [location])

    const foodsQf = useFoods(location, page)
    const imagesQf = useImagesList(foodsQf)
    const tagsQf = useTags()
    const postFoodTag = usePostTag(addToTagList,handlerSetModalError)

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
    const [imgLoader,setImgLoader] = useState(0)


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




    let backEndFoodFull = foodsQf.data ?? [];
    let backEndFoodTags = tagsQf.data ?? [];
    let backEndFoods = foodsQf?.data?.results ?? [];
    let foodTagsContainer = foodsQf?.data?.tags_list ?? [];



    function handleSetPage(page) {
        setPage(page)
        const contentNext = backEndFoodFull.next;
        const contentPrevious = backEndFoodFull.previous;
        const ra = /(\?.+)/
        //  const re = /(\?|&)(page=)(\d+)(\?|&)(page_size=)(\d+)/
        //const rs = /(\?)(.+)(\?|&)(page=)(\d+)(\?|&)(page_size=)(\d+)/
        const rb = /(\?)(.*\w*)(&*)(page=)(\d+)(\&)(page_size=)(\d+)/

        let matchColplete;
        let match;
        if (contentNext != null) {
            if (matchColplete = ra.exec(contentNext)) {
                if (match = rb.exec(matchColplete[0])) {
                    console.log("match", match)
                    if (page > 1) {
                        navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[3]}${match[4]}${page}${match[6]}${match[7]}${pageSize}`)}`)
     
                    }
                    else {
                        navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[6]}${match[7]}${pageSize}`)}`)
                    }
                }
            }
        } else {
            if (matchColplete = ra.exec(contentPrevious)) {
                if (match = rb.exec(matchColplete[0])) {
                    if (page > 1) {
                        navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[3]}${match[4]}${page}${match[6]}${match[7]}${pageSize}`)}`)
                    }
                    else {
                        navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[6]}${match[7]}${pageSize}`)}`)
                    }
                }
                else {
                    navigate(`/recepty/${matchColplete[0]}`)
                }
            }
        }
    }

    function addToTagList(tag) {
        console.log("addToTagList(tag)", (tag))
        setPage(1)
        if (tag.foodTag === "") {
            return;
        } else if (Array.from(filterTagSet).map(res => res.foodTag.toLowerCase()).includes(tag.foodTag.toLowerCase())) {
            console.log("include", (tag)); return;
        }

        let newTagList = new Set(filterTagSet);
        const re = /(\?search=)/
        const contentCurrent = backEndFoodFull.current;
        let match;
        if (contentCurrent != null) {
            match = re.exec(contentCurrent)
            if (match) {
                newTagList = [tag];
            } else {
                newTagList.add(tag);
            }
        }
        let filter = (`?foodTags__foodTag=${Array.from(newTagList).map(res => res.foodTag).join("&")}&page_size=${pageSize}`)
        navigate(`/recepty/${filter}`)
        setFilterTagSet(newTagList);
    }

 
    function searchAddToTagList(tag) {
        console.log("tag", tag)
        let search = (`?search=${tag}`)
        navigate(`/recepty/${search}`)
        let newTagList = [{ id: 0, foodTag: tag }];
        console.log("newTagList", newTagList)
        setFilterTagSet(newTagList);

    }

    function removeFromTagSet(tag) {
        let newFilterTagSet = new Set(filterTagSet)
        newFilterTagSet.delete(tag)
        setFilterTagSet(newFilterTagSet);
        if (newFilterTagSet.size == 0) {
            navigate(`/recepty/?page_size=${pageSize}`)
        }
        else {
            let filter = (`?foodTags__foodTag=${Array.from(newFilterTagSet).map((str) => str.foodTag.toLowerCase()).join("&")}`)
            navigate(`/recepty/${filter}`)
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
                if (str.foodTag.toLowerCase()
                    .includes(label)) { response = str }
            })
        return response
    }

    function dataFoodTagsCheck(foodTag) {
        const response = tagSearchInArray(backEndFoodTags, foodTag)
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

    function handleNavigateToNovyRecept() {
        navigate(`/recepty/novy_recept/`)
    }
    function handlePageSize(event) {
        setPageSize(event.target.value);
        setPage(1)

    }

    useEffect(() => {
        handleSetPage(page)
    }, [pageSize])

    const pagesArray = Array(backEndFoodFull.TotalNumOfPages).fill().map((_, index) => index + 1)
   
    // if (foodsQf.isLoading || imagesQf.isLoading || tagsQf.isLoading)
    //     // if (dataFoods.isLoading || dataFoodTags.isLoading || dataImagefood.isLoading)
    //     return <label htmlFor="inpFile">
    //         <div className={style.loadingContainer}>
    //             <FontAwesomeIcon
    //                 className={style.loadingIcon}
    //                 icon={faSpinner}
    //                 id="inpFileIcon"
    //                 spin ></FontAwesomeIcon>
    //         </div>
    //     </label>
    //<h1>Loading...</h1> 
    // if (isErrorFoods) return <h1>foods: {JSON.stringify(errorFoods.message)}</h1>
    // if (isErrorImagefood) return <h1>Image: {JSON.stringify(errorImagefood.message)}</h1>
    // if (isErrorFoodTags) return <h1>TAGS: {JSON.stringify(errorFoodTags.message)}</h1>


    // const pagesArray = Array(rawFoods.TotalNumOfPages).fill().map((_, index) => index + 1)

    // console.log("pagesArray", pagesArray)
    // const nav = (
    //   <nav className="nav-ex2">
    //     <button onClick={prevPage} disabled={isPreviousDataFoods || page === 1}>&lt;&lt;</button>
    //     {/* Removed isPreviousData from PageButton to keep button focus color instead */}
    //     {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page}  setPage={setPage} />)}
    //     <button onClick={nextPage} disabled={isPreviousDataFoods || page === rawFoods.TotalNumOfPages}>&gt;&gt;</button>
    //   </nav>)

    return (
        <> 
        {(foodsQf.isLoading || imagesQf.isLoading || tagsQf.isLoading) ? (<label htmlFor="inpFile">
            <div className={style.loadingContainer}>
                <FontAwesomeIcon
                    className={style.loadingIcon}
                    icon={faSpinner}
                    id="inpFileIcon"
                    spin ></FontAwesomeIcon>
            </div>
        </label>) 
        : (<> <div className={style.droplist}>
                {/* <div>{current_time}</div> */}
                <main className={style.Appmain}>
                    <TagInput
                        filterTagListState={[filterTagSet, setFilterTagSet]}
                        searchAddToTagList={searchAddToTagList}
                        removeFromTagList={removeFromTagSet}
                    />
                </main>
                <div className={style.foodButton} onClick={handleNavigateToNovyRecept}>
                    NOVY RECEPT
                </div>
            </div>
            <div className={ style.main}>
                <LeftPanelFilter
                    onFoodTagSet={filterTagSet}
                    handleAddTagToFoodTagsList={filterTagSetCheck}
                    // handleAddTagToFoodTagsList2={foodTagListCheck2}
                    foodTagsContainer={foodTagsContainer}
                    component={component}
                />
                <div  >
                    <FoodItemList
                        foods={foods}
                        imgLoader = {[imgLoader,setImgLoader]}
                        filterTagList={filterTagSet}
                        pageSize={[pageSize, setPageSize]}
                        handleSetPage={handleSetPage}
                    ></FoodItemList>
                    <div className={style.paginationBox}>
                        <nav className={style.navigationbar}>
                            <button className={style.button} onClick={() => handleSetPage(page - 1)} disabled={foodsQf.isPreviousData || page === 1} id={foodsQf.isPreviousData || page === 1 ? style["buttondisabled"] : style["buttonenabled"]}>&lt;&lt;</button>
                            {/* Removed isPreviousData from PageButton to keep button focus color instead */}
                            {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page} handleSetPage={handleSetPage} />)}
                            <button className={style.button} onClick={() => handleSetPage(page + 1)} disabled={foodsQf.isPreviousData || page === backEndFoods?.TotalNumOfPages} id={foodsQf.isPreviousData || page === backEndFoods.TotalNumOfPages ? style["buttondisabled"] : style["buttonenabled"]}>&gt;&gt;</button>


                        </nav>
                        <div className={style.navdisplay}>({backEndFoodFull.FirstItemsOnPage} - {backEndFoodFull.LastItemsOnPage})  z  {backEndFoodFull.TotalItems}

                            <select
                                className={style.unit}
                                onChange={handlePageSize}
                                value={pageSize}
                            >
                                <option>2</option>
                                <option>4</option>
                                <option>6</option>
                                <option>8</option>
                                <option>10</option>

                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
                <SaveError
                ></SaveError>
            </Modal></>)}
        </>
    );
}

export default Foods;
