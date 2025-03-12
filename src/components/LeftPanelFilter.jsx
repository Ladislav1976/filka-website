import { useState, useEffect } from "react";
import style from "./LeftPanelFilter.module.css";
import useAuth from "../hooks/useAuth";

function PanelTag(props) {
    const component = props.component
    const tag = props.tag

    function handleFilterTagListArray(label) {
        return props.filterTagListArray
            .map((str) => str?.foodTag.toLowerCase())
            .includes(label)
    }

    function checkboxContainerChild() {
        if (component === "viewcomponent") {
            return style.checkboxContainerChildView
        } else { return style.checkboxContainerChild }
    }


    function labelCSS() {

        if (component == "viewcomponent") {
            return style.labelView
        }
        if (component == "foodscomponent") {
            return style.labelfoods
        }
        if (component === "editcomponent" || component === "newcomponent") {
            return style.labelEdit
        }
    }

    function buttonCSS() {

        if (component == "viewcomponent") {
            return style.buttonView
        } else { return style.buttonEdit }
    }
    return (

        <div className={checkboxContainerChild()} onClick={() => props.handleAddTagToFoodTagsList(tag.tagName)}>
            <input
                type="checkbox"
                checked={handleFilterTagListArray(tag.tagName)}
                name="foodTagSet"
                className={style.checkboxInput}
                value={tag.tagName}
                id={tag.tagName}

                onChange={() => props.handleAddTagToFoodTagsList(tag.tagName)}
            />
            <div
                className={buttonCSS()}
                htmlFor="tag"

                onClick={() => props.handleAddTagToFoodTagsList(tag.tagName)}
            />
            <div
                className={labelCSS()}

            // onClick={() => props.handleAddTagToFoodTagsList(tag.tagName)}

            >
                {tag.tagName.toUpperCase()} <b className={style.tagQuantity} >{props.foodTagsContainer ? `(${props.tagList[props.index1].tagChildren[props.index2].quantity})` : ""}</b>
            </div>
        </div>
        // </div>

    )
}



function PanelButton(props) {

    const component = props.component
    const result = setterOpenTagList(props.tag)
    const [open, setOpen] = useState(result)
    useEffect(() => { setOpen(result) }, [result])

    function setterOpenTagList(array) {
        if (!props.filterTagListArray) return
        if (!array.tagChildren) return
        if (component === "newcomponent") { return (true) }
        if (component === "editcomponent" || "viewcomponent") {
            let result = false
            for (let i = 0; i < props.filterTagListArray.length; i++) {
                for (let u = 0; u < array.tagChildren.length; u++)
                    if (props.filterTagListArray[i].foodTag.toLowerCase() === array.tagChildren[u].tagName) {
                        result = true;
                    }
            }
            return result;
        }
    }



    function labelParents() {
        if (open) { return style.labelParentsActive } else { return style.labelParentsNoNActive }
    }

    function upDownCSS() {
        if (open) { return style.down } else { return style.up }
    }

    function checkboxContainer() {
        if (component === "viewcomponent") {
            return style.checkboxContainerView
        } else { return style.checkboxContainer }
    }

    function setterOpen() {
        if (component === "editcomponent" || component === "foodscomponent" || component === "newcomponent") {
            if (!result) { setOpen(!open) } else { setOpen(true) }
        }
    }
    function sumQt(array) {
        let i = 0
        array?.tagChildren?.forEach((res) => i += (Number(res.quantity)))
        return i
    }
    let array = []

    let ID = 0
    props.tag?.tagChildren?.map((tag, index2) => {

        array.push(
            <PanelTag
                key={ID}
                tag={tag}
                index2={index2}
                index1={props.index1}
                ID={ID}
                handleFilterTagListArray={props.handleFilterTagListArray}
                handleAddTagToFoodTagsList={props.handleAddTagToFoodTagsList}
                foodTagsContainer={props.foodTagsContainer}
                component={props.component}
                tagList={props.tagList}
                filterTagListArray={props.filterTagListArray}
            />
        ); ID++;
    })


    return (
        // <><div key={`${props.tag.tagType}${props.tag.tagName}`}>
        <>
            <div className={checkboxContainer()} onClick={() => setterOpen()}>
                <div className={labelParents()}>
                    {props.tag.tagName.toUpperCase()} <b className={style.tagQuantity} >{props.foodTagsContainer ? `(${sumQt(props.tagList[props.index1])})` : ""}</b>
                </div>
                <div className={upDownCSS()}
                >&#10094;</div>
            </div>
            <div className={style.checkBoxOpenner} >
                {open && array}
            </div>

        </>
    )
}
export default function LeftPanelFilter(props) {
    const foodTagsContainer = props.foodTagsContainer
    const component = props.component

    const filterTagListArray = [...props.onFoodTagSet]
    const handleAddTagToFoodTagsList = props.handleAddTagToFoodTagsList

    const { page, setPage, pageSize, setPageSize, ordering, setOrdering } = useAuth();

    let tagList = [
        {
            tagType: "parent", tagName: "polievky", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "polievky", quantity: 0, tagChildren: null },]
        },
        {
            tagType: "parent", tagName: "maso a hydina", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "hovadzie", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "bravcove", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "kuracie", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "morčacie", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "kacacie", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "kralik", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "jahna", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "ryba", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "ine", quantity: 0, tagChildren: null },
            ]
        },

        {
            tagType: "parent", tagName: "bezmasite jedla", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "bezmasite jedla", quantity: 0, tagChildren: null },

            ]
        },
        {
            tagType: "parent", tagName: "prilohy", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "prílohy", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "omacky", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "šaláty", quantity: 0, tagChildren: null },
            ]
        },
        {
            tagType: "parent", tagName: "kolace a dezerty", quantity: 0, tagChildren:
                [
                    { tagType: "children", tagName: "torty", quantity: 0, tagChildren: null },
                    { tagType: "children", tagName: "suche kolace", quantity: 0, tagChildren: null },
                    { tagType: "children", tagName: "mokre kolace", quantity: 0, tagChildren: null },
                    { tagType: "children", tagName: "vianocne kolace", quantity: 0, tagChildren: null },
                ]
        },
        {
            tagType: "parent", tagName: "cestoviny", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "špagety", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "lazagne", quantity: 0, tagChildren: null },
            ]
        },
        { tagType: "parent", tagName: "natierky", quantity: 0, tagChildren: null },
        { tagType: "parent", tagName: "zavaraniny", quantity: 0, tagChildren: null },
        {
            tagType: "parent", tagName: "mäsové výrobky", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "klobásy a salámy", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "šunky", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "zabíjačkové špeciality", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "grilovanie", quantity: 0, tagChildren: null },
            ]
        },
        {
            tagType: "parent", tagName: "chlieb a pečivo", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "chlieb", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "rožky", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "vianočka", quantity: 0, tagChildren: null },
                { tagType: "children", tagName: "bábovka", quantity: 0, tagChildren: null },
            ]
        }]



    if (foodTagsContainer != null) {
        for (let a of foodTagsContainer) {
            for (let i of tagList) {
                if (i.tagChildren == null) {
                    if (i.tagName == a.tag_name) {
                        i.quantity = a.tag_num
                    }
                }
                if (i.tagChildren != null) {
                    if (i.tagName == a.tag_name) {
                        i.quantity = a.tag_num
                    }
                    for (let e of i.tagChildren) {
                        if (e.tagName == a.tag_name) {
                            e.quantity = a.tag_num
                        }
                    }
                }
            }

        }

    }


    let tagListRender = []
    let id = 0
    tagList.map((tag, index) => {

        tagListRender.push(
            <PanelButton
                tag={tag}
                key={id}
                index1={index}
                handleAddTagToFoodTagsList={handleAddTagToFoodTagsList}
                foodTagsContainer={foodTagsContainer}
                filterTagListArray={filterTagListArray}
                component={component}
                tagList={tagList}
            />

        )
        id++;
    })
    const [open, setOpen] = useState(false)
    console.log("open :", open)




    return (<>
        <div className={style.firstColumn} >
            <div className={component == "foodscomponent" ? style.main_container : style.displayNoN}>
                <div className={style.select_container}>
                    <label className={component == "foodscomponent" ? style.select_label : style.displayNoN} htmlFor="select_ordering" >ZORADIŤ PODĽA:</label>
                    <div id={style.select_ordering_container} className={component == "foodscomponent" ? style.select_body : style.displayNoN} >
                        <select
                            name="ordering" id="select_ordering"
                            onChange={(e) => props.orderingHandler(e)}
                            value={ordering}
                            onBlur={() => setOpen(false)}
                            onClick={() => setOpen(!open)}

                        >
                            <option  value="date">Dátumu (najstarší)</option>
                            <option  value="-date">Dátumu (najnovší)</option>
                            <option  value="name">Vzostupne (od A po Z)</option>
                            <option  value="-name">Zostupne (od Z po A)</option>
                        </select>
                        <div id={style.icon} className={style.select_icon}
                      
                        >
                            <div className={!open ? style.icon_up : style.icon_down}
                            >&#10094;</div>
                        </div>

                    </div>

                </div>
            </div>

            {tagListRender}
        </div>
    </>
    )
}
