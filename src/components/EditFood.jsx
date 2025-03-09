import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepsInput from "./StepsInput";
import SaveLoading from "../reports/SaveLoading";
import SaveSaved from "../reports/SaveSaved";
import DeleteConfirm from "../reports/DeleteConfirm";
import SaveError from "../reports/SaveError";
import SaveErrorMissing from "../reports/SaveErrorMissing";
import Lightbox from "./Lightbox";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";

import Image from "./Image";
import UrlInput from "./Url";
import Modal from "../reports/Modal";
import ModalPreview from "../reports/ModalPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faTrash, faBackward, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useQueriesItems } from "../hooks/Queries/useQueriesItems";
import { useSteps } from "../hooks/Queries/useSteps";
import { useIngredients } from "../hooks/Queries/useIngredients";
import { useImages } from "../hooks/Queries/useImages";
import { usePutFood } from "../hooks/Mutations/usePutFood";
import { useDeleteFood } from "../hooks/Mutations/useDeleteFood";
import { usePostImage } from "../hooks/Mutations/usePostImage";
import { usePutImage } from "../hooks/Mutations/usePutImage";
import { useDeleteImage } from "../hooks/Mutations/useDeleteImage";
import { usePostTag } from "../hooks/Mutations/usePostTag";
import { usePostStep } from "../hooks/Mutations/usePostStep";
import { usePutStep } from "../hooks/Mutations/usePutStep";
import { useDeleteStep } from "../hooks/Mutations/useDeleteStep";
import { usePostIngredients } from "../hooks/Mutations/usePostIngredients";
import { useDeleteIngredients } from "../hooks/Mutations/useDeleteIngredients";
import { usePutIngredients } from "../hooks/Mutations/usePutIngredients";
import { usePostIngredient } from "../hooks/Mutations/usePostIngredient";
import { usePostUnit } from "../hooks/Mutations/usePostUnit";
import { usePostUrl } from "../hooks/Mutations/usePostUrl";
import { useDeleteUrl } from "../hooks/Mutations/useDeleteUrl";
import { usePutUrl } from "../hooks/Mutations/usePutUrl";
import useAuth from "../hooks/useAuth";




function EditFood(props) {
  const id = useParams()
  let ID = parseInt(id.id)

  const component = "editcomponent"
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const controller = new AbortController();
  const { setUsercont } = useAuth();


  const [usersQf, foodQf, ingredientQf, unitsQf, urlsQf, tagsQf] = useQueriesItems(ID, axiosPrivate, controller)
  const stepsQf = useSteps(foodQf)
  const ingredientsQf = useIngredients(foodQf, ingredientQf, unitsQf)
  const imagesQf = useImages(foodQf)


  // const [foodID, setFoodID] = useState(foodQf?.data?.id)
  // const [user, setUser] = useState(itemListDownl(foodQf?.data?.user, usersQf?.data, false),);
  // const [name, setName] = useState(foodQf?.data?.id)
  // const [ingredientsList, setIngredientsList] = useState(ingredientsListDownl(foodQf?.data, ingredientsQf?.data, unitsQf?.data, ingredientQf.data));
  // const [urlList, setUrlList] = useState(itemListDownl(foodQf?.data?.urls, urlsQf?.data, false))
  // const [foodTagSet, setFoodTagSet] = useState(new Set(itemListDownl(foodQf?.data?.foodTags, tagsQf?.data, false)));
  // const [stepsList, setStepsList] = useState(itemListDownl(foodQf?.data?.steps, stepsQf?.data, true));
  // const [imageURLsList, setImageURLsList] = useState(itemListDownl(foodQf?.data?.images, imagesQf?.data, true))
  // const [date, setDate] = useState(foodQf?.data?.date)


  const nameRef = useRef()
  const urlRef = useRef()
  const stepRef = useRef()
  const qtRef = useRef()
  const unitRef = useRef()
  const ingrRef = useRef()





  const [foodID, setFoodID] = useState("")
  const [user, setUser] = useState([]);
  const [name, setName] = useState("")
  const [ingredientsList, setIngredientsList] = useState([]);
  const [urlList, setUrlList] = useState([])
  const [foodTagSet, setFoodTagSet] = useState(new Set([]));
  const [stepsList, setStepsList] = useState([]);
  const [imageURLsList, setImageURLsList] = useState([])
  const [date, setDate] = useState("")



  function ingredientsListDownl(backEndFood, backEndIngredients, backEndUnit, backEndIngredient) {
    let ingredients = []
    backEndFood?.ingredients?.map((datatags) => {
      backEndIngredients?.map((e) => {
        if (e?.id == datatags) {
          backEndUnit?.map((u) => {
            if (u?.id == e?.units) {
              backEndIngredient?.map((i) => {
                if (i?.id == e?.ingredientName) {
                  ingredients.push({
                    id: e.id,
                    quantity: e.quantity,
                    unit: [u],
                    ingredient: [i],
                    position: e.position,
                    statusDelete: false
                  })
                }
              })
            }
          })
        }
      }
      )
    })
    ingredients.sort(function (a, b) {
      return a.position - b.position;
    })

    return ingredients
  }
  function itemListDownl(backEndFood, backEndItems, sorting) {
    let returnList = []
    backEndFood?.forEach((f) => {
      backEndItems?.map((e) => {
        if (e.id === f) {
          returnList.push({
            ...e,
            statusDelete: false
          });
          ;
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


  useEffect(() => {

    if (!usersQf.isLoading &&
      !foodQf.isLoading &&
      !ingredientQf.isLoading &&
      !unitsQf.isLoading &&
      !urlsQf.isLoading &&
      !tagsQf.isLoading &&
      !stepsQf.isLoading &&
      !ingredientsQf.isLoading &&
      !imagesQf.isLoading) {
      setFoodID(foodQf.data.id)
      setName(foodQf.data.name);
      setFoodTagSet(itemListDownl(foodQf.data.foodTags, tagsQf.data, false),);
      setStepsList(itemListDownl(foodQf.data.steps, stepsQf.data, true),);
      setIngredientsList(ingredientsListDownl(foodQf.data, ingredientsQf.data, unitsQf.data, ingredientQf.data));
      setUrlList(itemListDownl(foodQf.data.urls, urlsQf.data, false),)
      setDate(foodQf.data.date);
      setImageURLsList(itemListDownl(foodQf.data.images, imagesQf.data, true),);
      setUser(itemListDownl(foodQf.data.user, usersQf.data, false),)
      setUsercont(foodQf.data.user)
      nameRef.current?.focus();
    }
  }, [usersQf.isLoading, foodQf.isLoading, ingredientQf.isLoading, unitsQf.isLoading, urlsQf.isLoading, tagsQf.isLoading, stepsQf.isLoading, ingredientsQf.isLoading, imagesQf.isLoading
  ])


  const [images, setImages] = useState([]);


  const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
  const [modalSavedFlag, setModalSavedFlag] = useState(false);
  const [modalDeleteFlag, setModalDeleteFlag] = useState(false);
  const [modalErrorFlag, setModalErrorFlag] = useState(false);
  const [modalSaveErrorMissingFlag, setModalSaveErrorMissingFlag] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalImageDeleteErrorFlag, setModalImageDeleteErrorFlag] = useState(false);
  const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false)
  const [imgLoader, setImgLoader] = useState(0)



  const putFood = usePutFood(setModalLoadingFlag, handlerSetModalError, handlerSetModalSave)
  const deleteFood = useDeleteFood(setModalLoadingFlag, handlerSetModalError, handlerFoodDeleteConfirmed)
  const postImage = usePostImage()
  const putImage = usePutImage()
  const deleteImage = useDeleteImage()
  const postFoodTag = usePostTag(addTagTofoodTagSet, handlerSetModalError)
  const postStep = usePostStep()
  const putStep = usePutStep()
  const deleteStep = useDeleteStep()
  const postIngredients = usePostIngredients()
  const deleteIngredients = useDeleteIngredients()
  const putIngredients = usePutIngredients()
  const postIngredient = usePostIngredient()
  const postUnit = usePostUnit()
  const postUrl = usePostUrl()
  const deleteUrl = useDeleteUrl()
  const putUrl = usePutUrl()


  function nameKeyDown(event) {
    if (event.key === "Enter") {
      urlRef.current.focus();
    }
  }
  function urlKeyDown(event) {
    if (event.key === "Enter") {
      stepRef.current.focus();
    }
  }
  function stepKeyDown(event) {
    if (event.key === "Enter") {
      qtRef.current.focus();
    }
  }

  function qrKeyDown(event) {
    if (event.key === "Enter") {
      unitRef.current.focus();
    }
  }

  function unitKeyDown(event) {
    if (event.key === "Enter") {
      ingrRef.current.focus();
    }
  }

  function ingKeyDown(event) {
    if (event.key === "Enter") {
      nameRef.current.focus();
    }
  }


  function handleFoodDelete() {
    setModalDeleteFlag(true)
  }


  function handleFoodSave(e) {

    e.preventDefault();

    const filterIngredients = ingredientsList.filter((ingre) => ingre.position !== "delete")

    if (
      !name &&
      filterIngredients.length === 0 &&
      foodTagSet.size === 0 &&
      stepsList === ""
    ) {
      alert("Nazov , Suroviny, Druj jedla, Postup nie se uvedene");
    } else if (
      filterIngredients.length === 0 &&
      foodTagSet.size === 0 &&
      stepsList === ""
    ) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: , Suroviny, Druj jedla, Postup");
    } else if (!name && foodTagSet.size === 0 && stepsList === "") {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov , Druj jedla, Postup");
    } else if (!name && filterIngredients.length === 0 && stepsList === "") {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Suroviny, Postup");
    } else if (!name && filterIngredients.length === 0 && foodTagSet.size === 0) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Suroviny, Druj jedla");
    } else if (!name && filterIngredients.length === 0) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov,Suroviny");
    } else if (!name && foodTagSet.size === 0) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: ,Nazov, Druj jedla");
    } else if (!name && stepsList === "") {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Postup");
    } else if (filterIngredients.length === 0 && foodTagSet.size === 0) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny,Druj jedla");
    } else if (filterIngredients.length === 0 && stepsList === "") {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny,Postup");
    } else if (!name) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov");
    } else if (filterIngredients.length === 0) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny");
    } else if (foodTagSet.size === 0) {
      handlerSetModalErrorMissing("Doplň chýbajúce informácie: Druj jedla");
    } else if (stepsList === "") {
      handlerSetModalErrorMissing("Druj jedla nie je uvedeny");
    } else {


      makeFoodRecord({
        id: foodID,
        name: name,
        date: date,
        foodTags: ([...foodTagSet]).map((tag) => tag.id),
        user: ([...user]).map((a) => a.id),
      })
    }
    ;
  }

  function foodTagSetCheck(tag) {
    let filter = Array.from(foodTagSet).filter((f) => f.foodTag === tag)
    if (filter != "") {
      removeFromFoodTagSet(filter[0]);
    } else {
      handleAddTagToFoodTagSet(tag);
    }
  }


  function ingredientsCheckPost(ing) {
    let unitFilter = unitsQf?.data?.find((element) => (element.unit == ing.units[0].unit))
    if (unitFilter == null) {
      return postUnit.mutateAsync({ unit: ing.units[0].unit })
        .then((unit) => {
          let ingredientFilter = ingredientQf?.data?.find((element) => element.ingredient == ing.ingredientName[0].ingredient)
          if (ingredientFilter == null) {
            return postIngredient.mutateAsync({ ingredient: ing.ingredientName[0].ingredient })
              .then((ingre) => {
                return postIngredients.mutateAsync({
                  units: [unit.data.id],
                  quantity: ing.quantity,
                  ingredientName: [ingre.data.id],
                  position: ing.position
                })
              })
              .catch((err) => {
                handlerSetModalErrorMissing(err.message)
              })
          }
          else {
            return (postIngredients.mutateAsync({
              units: [unit.data.id],
              quantity: ing.quantity,
              ingredientName: [ingredientFilter.id],
              position: ing.position
            }))
          }
        })
        .catch((err) => {
          handlerSetModalErrorMissing(err)

        })
    }
    else {
      let ingredientFilter = ingredientQf?.data?.find((element) => element.ingredient == ing.ingredientName[0].ingredient)
      if (ingredientFilter == null) {
        return postIngredient.mutateAsync({ ingredient: ing.ingredientName[0].ingredient })
          .then((ingre) => {
            if (ingre.status == 201) {
              return (postIngredients.mutateAsync({
                units: [unitFilter.id],
                quantity: ing.quantity,
                ingredientName: [ingre.data.id],
                position: ing.position
              }))
            }
          })
          .catch((err) => {
            handlerSetModalErrorMissing(err.message)
          })
      }
      else {
        return (postIngredients.mutateAsync({
          quantity: ing.quantity,
          units: [unitFilter.id],
          ingredientName: [ingredientFilter.id],
          position: ing.position
        }
        ))
      }
    }
  }

  function addTagTofoodTagSet(foodTag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.add(foodTag);
    setFoodTagSet(newFoodTagSet);
  }

  function addToIngredientList(id, quantity, unit, ing) {
    if (ing === "") {
      return;
    }
    let newIngredientsList = ingredientsList.slice()
    newIngredientsList.push({ id: id, quantity: quantity, unit: [{ id: id, unit: unit }], ingredient: [{ id: id, ingredient: ing }], statusDelete: false }
    );
    setIngredientsList(newIngredientsList);
  }

  function makeIngredientsDelete(ingre) {
    setIngredientsList(makeItemDelete(ingre, ingredientsList))
  }

  function makeSteptoDelete(step) {
    console.log("step :", step)
    setStepsList(makeItemDelete(step, stepsList))
  }

  function makeUrlToDelete(url) {
    console.log("url DELETE:", url)
    setUrlList(makeItemDelete(url, urlList))
  }

  function makeItemDelete(item, array) {
    console.log("array 1:", array)
    let itemIDPosition = getPosition(item.id, array);
    let newArray = array.slice();
    newArray.splice(itemIDPosition, 1, { ...item, statusDelete: true })
    console.log("array 2:", newArray)
    return newArray;
  }


  function updateStepList(step) {
    setStepsList(updateItemList(step, stepsList))
  }

  function updateUrlList(url) {
    setUrlList(updateItemList(url, urlList))
  }

  function updateItemList(itemObj, array) {
    let position = getPosition(itemObj.id, array);
    let newArray = array.slice();
    newArray.splice(position, 1, itemObj)

    return (newArray);
  }

  function handleAddUrl(url, urlList) {
    if (url.url == "") return
    setUrlList(addItem(url, urlList))
  }


  function handleAddStep(step, stepsList) {
    if (step.step == "") return
    setStepsList(addItem(step, stepsList))
  }

  function addItem(itemObj, array) {
    let newArray = array.slice();
    newArray.push(itemObj)
    return newArray;
  }

  function handleAddTagToFoodTagSet(foodTag) {
    let filterFoodTag = tagsQf?.data?.filter((element) => element.foodTag == foodTag);
    if (filterFoodTag == "") {
      postFoodTag.mutate({ foodTag: foodTag })
    } else { addTagTofoodTagSet(filterFoodTag[0]) }
  }

  function removeFromFoodTagSet(tag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.delete(tag);
    setFoodTagSet(newFoodTagSet);
  }

  function handleDataID(res) {
    let array = []
    res.map(r => { if (r.status != 204) { array.push(r.data.id) } })
    return array
  }
  async function urlForPostHandler() {
    return Promise.all(

      urlList?.map((res) => {
        const urlVar = {
          id: res.id,
          url: res.url,
        }

        if (res.statusDelete === true && Number.isInteger(res.id)) {
          return deleteUrl.mutateAsync(urlVar)
        }
        if (Number.isInteger(res.id)) {
          return putUrl.mutateAsync(urlVar)
        }
        if (!Number.isInteger(res.id) && res.statusDelete === true) { return { status: 204 } }
        else {
          return postUrl.mutateAsync(urlVar)
        }

      })
    ).then(res => {
      return {
        status: "fullfilled",
        value: handleDataID(res)
      }
    }).catch((err) => {
      console.log("Error URL", err); handlerSetModalErrorMissing("Error URL");
      setModalLoadingFlag(false);
      handlerSetModalError()
    })

  }

  async function stepsForPostHandler() {

    return Promise.all(
      stepsList?.map((res, index) => {
        const stepVar = {
          id: res.id,
          step: res.step,
          position: index + 1,
        }

        if (res.statusDelete === true && Number.isInteger(res.id)) {
          return deleteStep.mutateAsync(stepVar)
        }
        if (Number.isInteger(res.id)) {
          return putStep.mutateAsync(stepVar)
        }
        if (!Number.isInteger(res.id) && res.statusDelete === true) { return { status: 204 } }
        else {
          return postStep.mutateAsync(stepVar)
        }

      })
    ).then(res => {
      return {
        status: "fullfilled",
        value: handleDataID(res)
      }
    }).catch((err) => {
      console.log("Error Steps", err); handlerSetModalErrorMissing("Error Steps");
      setModalLoadingFlag(false);
      handlerSetModalError()
    })


  }

  async function ingredientsForPostHandler() {

    return Promise.all(
      ingredientsList?.map((res, index) => {
        const ingreVar = {
          id: res.id,
          units: [res.unit[0]],
          quantity: res.quantity,
          ingredientName: [res.ingredient[0]],
          position: index + 1,
        }
        if (res.statusDelete === true && Number.isInteger(res.id)) {
          return (deleteIngredients.mutateAsync(ingreVar.id))
        }
        if (Number.isInteger(res.id)) {
          return putIngredients.mutateAsync(ingreVar)
        }
        if (!Number.isInteger(res.id) && res.statusDelete === true) { return { status: 204 } }
        else {
          return ingredientsCheckPost(ingreVar)
        }
      })
    ).then(res => {
      return {
        status: "fullfilled",
        value: handleDataID(res)
      }
    })
      .catch((err) => {
        console.log("Error Ingredients", err);
        handlerSetModalErrorMissing("Error Ingredients");
        setModalLoadingFlag(false);
        handlerSetModalError()
      })


  }


  async function imagiesForPostHandler(food) {

    const newDate = new Date(date).toISOString().substring(0, 10)
    const seconds = new Date(date).getUTCMilliseconds()


    return Promise.all(
      imageURLsList?.map((res, index) => {

        const imageID = res.id
        let form = new FormData();
        form.append("upload_folder", `${food.name}-${newDate}-${seconds}`);
        form.append("position", index + 1);

        let formdata = new FormData();
        formdata.append("upload_folder", `${food.name}-${newDate}-${seconds}`);
        formdata.append("image", res.imageForBackEnd);
        formdata.append("position", index + 1);

        const formdataPut = {
          id: imageID,
          imageForm: form
        }


        if (Number.isInteger(res.id) && res.statusDelete === true) {
          return deleteImage.mutateAsync(formdataPut)
        }
        if (!Number.isInteger(res.id) && res.statusDelete === false) {
          return postImage.mutateAsync({ formdata })
        }
        if (!Number.isInteger(res.id) && res.statusDelete === true) { return { status: 204 } }
        if (Number.isInteger(res.id)) {
          return putImage.mutateAsync(formdataPut)
        }

      })
    ).then(res => {

      return {
        status: "fullfilled",
        value: handleDataID(res)
      }
    }).catch((err) => {
      console.log("Error Imagies", err); handlerSetModalErrorMissing("Error Imagies");
      setModalLoadingFlag(false);
      handlerSetModalError()
    })

  }


  async function makeFoodRecord(food) {
    setModalLoadingFlag(true)
    const stepsRun = stepsForPostHandler()
    const ingredientsRun = ingredientsForPostHandler()
    const imagiesRun = imagiesForPostHandler(food)
    const urlRun = urlForPostHandler()


    const stepsRes = await stepsRun
    const ingredientsRes = await ingredientsRun
    const imagiesRes = await imagiesRun
    const urlRes = await urlRun


    Promise.all([stepsRes, ingredientsRes, imagiesRes, urlRes])
      .catch(err => {
        console.log("ERROR putFood can not be executed! Posssible Error in the following post function: Steps, Ingredients or Imagies", err);
        setModalLoadingFlag(false)
        handlerSetModalError()
      })
      .then(() => {
        putFood.mutate({
          ...food,
          steps: stepsRes.value,
          ingredients: ingredientsRes.value,
          images: imagiesRes.value,
          urls: urlRes.value,
        })
      }
      )
  }

  function foodDelete() {
    setModalDeleteFlag(false)
    setModalLoadingFlag(true)
    deleteFood.mutate({ id: foodID })
  }


  function imageURLsUpdater(imageURLsList) {
    setImageURLsList(imageURLsList);

  }

  function stepMove(move, step) {
    setStepsList(itemMove(move, step, stepsList))
  }

  function ingredientMove(move, ing) {
    setIngredientsList(itemMove(move, ing, ingredientsList))
  }

  function itemMove(move, item, array) {
    let position = getPosition(item.id, array)
    let newArray = array.slice()
    if (move > 0) {
      if (position === (-1 + array.length)) { return newArray } else {
        newArray.splice(position, 1);
        newArray.splice(position + move, 0, item);
        return newArray
      }
    }
    if (move < 0) {
      if (position === 0) { return newArray }
      else {
        newArray.splice(position, 1);
        newArray.splice(position - 1, 0, item);
        return newArray
      }
    }
  }


  function handlerFoodDeleteCancel() {
    setModalDeleteFlag(false)
    navigate(`/recepty/${id.id}/edit`)
  }

  function handlerFoodDeleteConfirmed() {
    setModalSavedFlag(true)
    setTimeout(() => {
      setModalSavedFlag(false)
      navigate(`/recepty/?page_size=${20}`);
    }, 1000)
  }

  function handlerSetModalSave() {
    setModalSavedFlag(true)
    setTimeout(() => {
      setModalSavedFlag(false);
      navigate(`/recepty/${ID}/`);
    }, 1000)
  }
  function handlerSetModalError() {
    setModalErrorFlag(true)
    setTimeout(() => {
      setModalErrorFlag(false)
    }, 3000)
  }

  function handlerSetModalErrorMissing(message) {
    setModalMessage(message)
    setTimeout(() => {
      setModalMessage("")
    }, 3000)
  }
  function closeModal(e) {
    setModalLightboxFlag(false)
    setIsVisibleEdit(false)
  }

  function getPosition(elementToFind, arrayElements) {

    let i;
    for (i = 0; i < arrayElements.length; i += 1) {
      if (arrayElements[i].id === elementToFind) {
        return i;
      }
    }
    return null;
  }

  const [imagePosition, setImagePosition] = useState("")


  function handlerImage(imageToAdd) {
    let position = getPosition(imageToAdd.id, imagesQf?.data)
    setImagePosition(position)
  }

  function makeImageDelete(image) {
    console.log(image)
    let imageIDPosition = getPosition(image.id, imageURLsList);
    let newImageURLsList = imageURLsList.slice();
    newImageURLsList.splice(imageIDPosition, 1, { ...image, statusDelete: true })
    setImageURLsList(newImageURLsList);
  }

  // images for Posting
  useEffect(() => {
    let newImageUrlsPost = imageURLsList.slice()
    let uniqueID = new Date().toISOString()

    if (images.length < 1) return;
    let position = imageURLsList.length + 1
    images.forEach(
      (image, index) => {
        newImageUrlsPost.push({
          id: `${uniqueID}${index}`,
          image: URL.createObjectURL(image),
          imageForBackEnd: image,
          position: position,
          statusDelete: false
        }); position++
      }, setImageURLsList(newImageUrlsPost)
    )

  }, [images]);


  function onImageChange(e) {
    setImages([...e.target.files]);
  }


  return (<>
    {(!usersQf.isSuccess || !foodQf.isSuccess || !ingredientQf.isSuccess || !unitsQf.isSuccess || !urlsQf.isSuccess || !tagsQf.isSuccess || !stepsQf.isSuccess || !ingredientsQf.isSuccess || !imagesQf.isSuccess) ? (

      <div className={style.loadingContainer}>
        <FontAwesomeIcon
          className={style.loadingIcon}
          icon={faSpinner}
          id="inpFileIcon"
          spin ></FontAwesomeIcon>
      </div>
    ) : (
      <form className={style.main}
      // onSubmit={(e) => {
      //   e.preventDefault();
      // const formData = new FormData(e.currentTarget);
      // const formValues = Object.fromEntries(formData)
      //   handleFoodSave(e);
      // }}
      >

        <div className={style.boxcontainer}>
          <div className={style.messagebox}>
            {modalMessage}</div>

          <div className={style.buttonBox} >

            <div className={style.foodButton} id={style.foodButtonSave}
            // datatooltip="Uloziť"
            >
              <FontAwesomeIcon
                onClick={(e) => handleFoodSave(e)}
                icon={faCartPlus}

              />
            </div>
            <div className={style.foodButtonDelete}
            // datatooltip="Vymazať"
            >
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleFoodDelete}
              /></div>
            <div className={style.foodButton}
            >
              <FontAwesomeIcon
                onClick={() => navigate(-1)}
                icon={faBackward}

              />
            </div>
          </div>
        </div>
        <div className={imgLoader > 0 ? style.unvisible : style.fooodbox} >
        <div className={style.fooodboxMidpanel} >

          <LeftPanelFilter
            onFoodTagSet={foodTagSet}
            handleAddTagToFoodTagsList={foodTagSetCheck}
            foodTagsBox={null}
            component={component}
          />

          <div className={style.secondColumn}>
            <div className={style.ingredients}>
              <p>Suroviny:</p>
              <IngredientInput
                addToIngredientList={addToIngredientList}
                ingredientMove={ingredientMove}
                ingredientsList={ingredientsList}
                handlerSetModalErrorMissing={handlerSetModalErrorMissing}
                removeFromIngredientList={makeIngredientsDelete}
                component={component}
                qtRef={qtRef}
                unitRef={unitRef}
                ingrRef={ingrRef}
                qrKeyDown={qrKeyDown}
                unitKeyDown={unitKeyDown}
                ingKeyDown={ingKeyDown}
              ></IngredientInput>
            </div>
            <input
              className={style.imageinput}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif"
              id="inpFile"
              onChange={onImageChange}
              display="none"
            />
            <div className={style.imageIconBox}>
              <label htmlFor="inpFile" className={style.imageIcon}
                datatooltip="Pridať fotografiu">
                <FontAwesomeIcon
                  icon={faCircleArrowUp}
                  id="inpFileIcon"
                ></FontAwesomeIcon>
              </label>
            </div>
            {!imageURLsList && <p className={style.numOfFiles} id="numOfFiles">
              No Files chosen
            </p>}
            <div className={style.imagebox}>
              <Image onImgLoader={[imgLoader, setImgLoader]} imageURLs={imageURLsList} makeImageDelete={makeImageDelete} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage} component={component} ></Image>
            </div>
          </div>
          <div className={style.thirdColumn}>

            <div className={style.urlName}>
              <p>URL :</p>
            </div>
            <UrlInput
              urlList={urlList}
              component={component}
              deleteUrl={makeUrlToDelete}
              updateUrlList={updateUrlList}
              handleAddUrl={handleAddUrl}
              urlRef={urlRef}
              urlKeyDown={urlKeyDown}
            >

            </UrlInput>
            <div className={style.urlName}>
              <p>Postup :</p>
            </div>
            <StepsInput
              stepMove={stepMove}
              handleAddStep={handleAddStep}
              updateStepList={updateStepList}
              stepsList={stepsList}
              deleteStep={makeSteptoDelete}
              component={component}
              stepRef={stepRef}
              stepKeyDown={stepKeyDown}
            ></StepsInput>
          </div>
          <div className={style.fooodnamebox} >
            <label className={style.name} htmlFor="name">Nazov:</label>
            <input
              className={style.foodname}
              id="name"
              name="name"
              ref={nameRef}
              value={name}
              onKeyDown={nameKeyDown}
              type="text"
              maxLength="300"
              onChange={(e) => setName(e.target.value)}

            />
            <div className={style.name}> </div>
          </div>
          <div className={style.date}>
            Vytvorené: <br /> {user.map(res => res.first_name)} {user.map(res => res.last_name)}<br />{new Date(date).toLocaleDateString('sk-SK')}
          </div>
          {/* </div> */}

        </div>
        </div>
      </form>
    )}
    <Modal visible={modalLoadingFlag} setModalFlag={setModalLoadingFlag}>
      <SaveLoading
      ></SaveLoading>
    </Modal>
    <Modal visible={modalSavedFlag} setModalFlag={setModalSavedFlag}>
      <SaveSaved
      ></SaveSaved>
    </Modal>
    <Modal visible={modalDeleteFlag} setModalFlag={setModalDeleteFlag}>
      <DeleteConfirm
        foodDelete={foodDelete}
        handlerFoodDeleteCancel={handlerFoodDeleteCancel}></DeleteConfirm>
    </Modal>
    <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
      <SaveError
      ></SaveError>
    </Modal>
    <Modal visible={modalSaveErrorMissingFlag} setModalFlag={setModalSaveErrorMissingFlag}>
      <SaveErrorMissing
        modalMessage={modalMessage} />

    </Modal>
    <ModalPreview visible={modalLightboxFlag} setModalFlag={setModalLightboxFlag}>
      <Lightbox
        imageURLsList={[imageURLsList, setImageURLsList]}
        closeModal={closeModal}
        handlerImage={handlerImage}
        getPosition={getPosition}
        modalImageDeleteErrorFlag={modalImageDeleteErrorFlag}
        isVisibleEdit={[isVisibleEdit, setIsVisibleEdit]}
        imagePosition={[imagePosition, setImagePosition]}
        imageURLsUpdater={imageURLsUpdater}
        component={component}
      >
      </Lightbox>
    </ModalPreview>

  </>
  )
}
export default EditFood;
