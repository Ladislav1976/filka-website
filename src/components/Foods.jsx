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
import { defaultQueryFn, getFoodsPageFn, searchFoodsPageFn, getFoodTags, getImageFood } from "../hooks/use-get";



function Foods(props) {
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

    const current_time = new Date().toDateString()
    // const currentDate = new Date().toLocaleDateString('sk-SK')
    // let current_time = new Date().toLocaleDateString("en-ca", {
    //   year: "numeric",
    //   month: "numeric",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    // });

    const [getTodo, setTodo] = useState("");

    var apiKey = "6de9bfb3c9bb1f5bb3f71b73e0e0dc0d";
    var city = "Bratislava";
    let clock = 0;
    //fetchSelectedData()





    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        const hour = today.getHours();
        const minute = today.getMinutes();
        const second = today.getSeconds();

        return `${month}/${date}/${year},  ${hour}:${minute}/${second}`;
    }

    const [currentDate, setCurrentDate] = useState(getDate());

    const [filterTagSet, setFilterTagSet] = useState(new Set([]));
      const [modalErrorFlag, setModalErrorFlag] = useState(false);

    const { status: statusFoods, data: dataFoods, isFetching: isFetchingFoods, isLoading: loadingFoods, error: errorFoods, isError: isErrorFoods, isPreviousData: isPreviousDataFoods } = useQuery({
        queryKey: ["foods"],
        queryFn: () => {
            if (location?.search != null) {
                return searchFoodsPageFn(location.search)
                // if (page > 1) { return searchFoodsPageFn(location.search, page) }
                // if (page < 1) { return searchFoodsPageFn(location.search) }
            } else { return getFoodsPageFn(page) }
        }

        // keepPreviousData: true
    })

    // const {  data} = useQueries({
    //     queryKey: ["/foods/", location],
    //     queryFn: () => {
    //         if (location?.search != null) {
    //             return searchFoodsPageFn(location.search)
    //             // if (page > 1) { return searchFoodsPageFn(location.search, page) }
    //             // if (page < 1) { return searchFoodsPageFn(location.search) }
    //         } else { return getFoodsPageFn(page) }
    //     },
    //     onSuccess:()=>console.log("YES")

    //     // keepPreviousData: true
    // })





    const { status: statusFoodTags, data: dataFoodTags, isFetching: isFetchingFoodTags, error: errorFoodTags, isLoading: loadingFoodTags, isError: isErrorFoodTags } = useQuery({
        queryKey: ["foodTags"],
        // enabled: dataFoods?.results != null,
        queryFn: getFoodTags,
    })

    const postFoodTag = useMutation({
        mutationFn: createPostFoodTag,
        onError: error => { console.log("Error Post FoodTag :", error);handlerSetModalError() },
        onSuccess: (foodTagCreated, oldFoodTag) => {
            console.log("FoodTag :", foodTagCreated, "sucsesfully created!")
            queryClient.setQueryData(["foodTags"], (prev) => 
                // if (!prev) return undefined;
            // console.log("prev :",prev),
           { if (!prev) return undefined;
            return [...prev,foodTagCreated] })
            queryClient.invalidateQueries(["foodTags"])//"/steps/",newPost.id],newPost)
            addToTagList(foodTagCreated)

        }
    })

    const { status: statusImagefood, data: dataImagefood, isFetching: isFetchingImagefood, error: errorImagefood, isLoading: loadingImagefood, isError: isErrorImagefood, } = useQuery({
        queryKey: ["imagefood"],
        // enabled: dataFoods?.results != null,
        queryFn: getImageFood,
    })

    // const results = useQueries({

    //     queryKey: ["/foods/", location],
    //     queryFn: () => {
    //         if (location?.search != null) {
    //             return searchFoodsPageFn(location.search)
    //             // if (page > 1) { return searchFoodsPageFn(location.search, page) }
    //             // if (page < 1) { return searchFoodsPageFn(location.search) }
    //         } else { return getFoodsPageFn(page) }
    //     },
    //     combine: 

    // onSuccess:foods=>foods.map(food=>)
    // enabled: !!dataFoods && !!dataFoodTags,
    // queries: () => {
    //     if (dataFoods && dataFoodTags) {
    //         dataFoods.map((data) => {
    //             return {
    //                 id: data.id,
    //                 name: data.name,
    //                 image: imageFoodListDownl(data),
    //                 foodTags: itemListDownl(data.foodTags, dataFoodTags),
    //             }
    //         })
    //     }
    // }
    // })
    // console.log("results", results)

    function imageFoodListDownl(data) {

        const newBackEndImagefood = dataImagefood.filter((e) =>
            e.food === data.id);
        //sorting of imageFoodList from 1 to 999
        newBackEndImagefood.sort(function (a, b) {
            return a.imgposition - b.imgposition;
        });

        return newBackEndImagefood
    }
    // const [foodID, setFoodID] = useState()
    // const [name, setName] = useState("")
    // const [foodTagSet, setFoodTagSet] = useState(new Set());
    // const [imageURLs, setImageURLs] = useState([])
    // const [imageURLsList, setImageURLsList] = useState([])
    // const [imageURLsPost, setImageURLsPost] = useState([])

    let backEndFoodFull = dataFoods ?? [];
    let backEndFoodTags = dataFoodTags ?? [];
    let backEndImagefood = dataImagefood ?? [];


    let backEndFoods = backEndFoodFull?.results

    let foodTagsContainer = backEndFoodFull?.tags_list


    const [foods, setFoods] = useState([]);
    // const [ foodTagsContainer , setFoodTagsContainer]= useState([]);
    // let foodTagsContainer = []
    useEffect(() => {
        let food = ""
        if (statusFoods === 'success') {
            if (statusImagefood === 'success') {
                if (statusFoodTags === 'success') {
                    setFoods(handleFood())
                    // setFoodTagsContainer(itemListDownl(backEndFoods.foodTags, backEndFoodTags, "no"))
                } else {
                }
            } else {
            }
        } else {
        }
    }, [dataFoods, dataFoodTags, dataImagefood])//statusFoods,statusImagefood, statusFoodTags, 


    function itemListDownl(backEnd, backEndItems, sorting) {

        let returnList = []
        backEnd?.map((f) => {
            backEndItems.map((e) => {
                if (e.id === f) {
                    returnList.push(e);
                }
            });
        });
        //sorting of items from 1 to 999
        if (sorting) {
            returnList.sort(function (a, b) {
                return a.position - b.position;
            }
            )
        };
        return returnList
    }


    function handleFood() {

        let foodsList = []

        backEndFoods?.forEach((data) => {
            foodsList.push({
                id: data.id,
                name: data.name,
                images: itemListDownl(data.images, backEndImagefood, "yes"),
                foodTags: itemListDownl(data.foodTags, backEndFoodTags, "no"),
            })
        })
        return foodsList

    }

    const [modalNewFlag, setModalNewFlag] = useState(false);
    const [modalEditFlag, setModalEditFlag] = useState(false);

    const [foodItemEditRender, setFoodItemEditRender] = ("")

    // let filterTagListArray = [...filterTagSet];

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
                        // navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${page}${match[4]}${match[5]}${pageSize}`)}`)
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
        console.log("addToTagList(tag)",(tag))
        setPage(1)
        if (tag.foodTag === "") {
            return;
        } else if (Array.from(filterTagSet).map(res => res.foodTag.toLowerCase()).includes(tag.foodTag.toLowerCase())) {
            console.log("include",(tag));return;
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

    function setModalNewFlagTrue(flag) {
        setModalNewFlag(true);
    }

    function setModalEditFlagTrue(flag) {
        setModalEditFlag(true);
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
        const response = tagSearchInArray(dataFoodTags,foodTag)
        // let filterFoodTag = dataFoodTags.filter((element) => element.foodTag == foodTag);
        console.log("response  :",response)
        if (response === undefined) {  console.log("filterFoodTag == []  :")
            postFoodTag.mutate({ foodTag: foodTag })
        } else {console.log("filterFoodTag !== []  :",response)
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
    const nav = (<>

    </>)

    if (loadingFoods || loadingFoodTags || loadingImagefood)
        return <label htmlFor="inpFile">
            <div className={style.loadingContainer}>
                <FontAwesomeIcon
                    className={style.loadingIcon}
                    icon={faSpinner}
                    id="inpFileIcon"
                    spin ></FontAwesomeIcon>
            </div>
        </label>//<h1>Loading...</h1> 
    if (isErrorFoods) return <h1>foods: {JSON.stringify(errorFoods.message)}</h1>
    if (isErrorImagefood) return <h1>Image: {JSON.stringify(errorImagefood.message)}</h1>
    if (isErrorFoodTags) return <h1>TAGS: {JSON.stringify(errorFoodTags.message)}</h1>


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
            <header className={style.Appheader}>RECEPTY</header>
            <div className={style.droplist}>
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
            <div className={style.main}>
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
                        filterTagList={filterTagSet}
                        setModalEditFlagTrue={setModalEditFlagTrue}
                        foodItemEditRenderState={[
                            foodItemEditRender,
                            setFoodItemEditRender,
                        ]}
                        page={[page, setPage]}
                        pageSize={[pageSize, setPageSize]}
                        handleSetPage={handleSetPage}
                        isPreviousDataFoods={isPreviousDataFoods}
                        backEndFoodFull={dataFoods}
                    ></FoodItemList>
                    <div className={style.paginationBox}>
                        <nav className={style.navigationbar}>
                            <button className={style.button} onClick={() => handleSetPage(page - 1)} disabled={isPreviousDataFoods || page === 1} id={isPreviousDataFoods || page === 1 ? style["buttondisabled"] : style["buttonenabled"]}>&lt;&lt;</button>
                            {/* Removed isPreviousData from PageButton to keep button focus color instead */}
                            {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page} handleSetPage={handleSetPage} />)}
                            <button className={style.button} onClick={() => handleSetPage(page + 1)} disabled={isPreviousDataFoods || page === backEndFoods?.TotalNumOfPages} id={isPreviousDataFoods || page === backEndFoods.TotalNumOfPages ? style["buttondisabled"] : style["buttonenabled"]}>&gt;&gt;</button>


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
                </Modal>
        </>
    );
}

export default Foods;
