import { useState, useEffect } from "react";
import style from "./LeftPanelFilter.module.css";

function NavItem(props) {
    const component = props.component
    const tag = props.tag

    function handleFilterTagListArray(label) {
        return props.filterTagListArray
            .map((str) => str.foodTag.toLowerCase())
            .includes(label)
    }

    function checkboxContainerChild(){
        if (component === "viewcomponent") {
            return style.checkboxContainerChildView  } else { return style.checkboxContainerChild }
    }

    let array = []
    // console.log("arrayarray",array,"tag?.tagChildren",props.tag)
    // props.tag?.map((tag,index2 )=> { array.push(
    // <li className={style.navitem}>

    // </li>
    // ) })
    return (
        // <div className={style.foodMaso} key={tag.tagName}>
        <div className={checkboxContainerChild()}
            key={tag.tagName}onClick={() => props.handleAddTagToFoodTagsList(tag.tagName)}>
            <input
                type="checkbox"
                checked={handleFilterTagListArray(tag.tagName)}
                name={tag.tagName}
                className={style.checkboxInput}
                id={tag.tagName}
                key={tag.tagName + "a"}
                onChange={() => props.handleAddTagToFoodTagsList(tag.tagName)}
            />
            <div
                className={props.buttonCSS()}
                htmlFor="tag"
                key={tag.tagName + "b"}
                onClick={() => props.handleAddTagToFoodTagsList(tag.tagName)}
            />
            <label
                className={props.labelCSS()}
                htmlFor="tag"
                // onClick={() => props.handleAddTagToFoodTagsList(tag.tagName)}
                key={tag.tagName + "c"}
            >
                {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{props.foodTagsContainer ? `(${props.tagList[props.index1].tagChildren[props.index2].quantity})` : ""}</b>
            </label>
        </div>
        // </div>

    )
}



function NavBar(props) {

    const component = props.component
    const result = setterOpenTagList(props.tag)
    const [open, setOpen] = useState(result)
    useEffect(() => { setOpen(result) }, [result])

    function setterOpenTagList(array) {
        if (!props.filterTagListArray) return
        if (!array.tagChildren) return
        if (component === "foodscomponent") { return (false) }
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
    function buttonCSS() {
        // console.log(component)
        if (component == "viewcomponent") {
            return style.buttonView
        } else { return style.buttonEdit }
    }

    function labelCSS() {
        // console.log(component)
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
    function labelParents() {
        // if (component != "viewcomponent"){return}
        if (open) { return style.labelParentsActive } else { return style.labelParentsNoNActive }
        
    }

    function upDownCSS() {
        if (open) { return style.down } else { return style.up }
    }

    function checkboxContainer() {
        if (component === "viewcomponent") {
            return style.checkboxContainerView  } else { return style.checkboxContainer }
        
        // if (resp == style.labelView) {
        //     if (open) { return style.checkBoxOpennerDownView } else { return style.checkBoxOpennerUpView }
        // }
    }

    function setterOpen() {
        if (component === "editcomponent" || component === "foodscomponent" || component === "newcomponent") {
            setOpen(!open)
        }
    }
    function sumQt(array) {
        var i = 0
        array?.tagChildren?.forEach((res) => i += (Number(res.quantity)))
        return i
    }
    let array = []
    props.tag?.tagChildren?.map((tag, index2) => {
        array.push(
            <NavItem
                tag={tag}
                index2={index2}
                index1={props.index1}
                handleFilterTagListArray={props.handleFilterTagListArray}
                handleAddTagToFoodTagsList={props.handleAddTagToFoodTagsList}
                foodTagsContainer={props.foodTagsContainer}
                component={props.component}
                tagList={props.tagList}
                buttonCSS={buttonCSS}
                labelCSS={labelCSS}
                filterTagListArray={props.filterTagListArray}
            />
        )
    })
    return (
        <>
            {/* <div className={style.food} key={props.index1 + 2}> */}
            <div className={checkboxContainer()} key={props.index1} onClick={() => setterOpen()}
            >
                <label
                    className={labelParents()}
                    htmlFor="tag"

                    // onClick={() => props.handleAddTagToFoodTagsList(props.tag.tagName)}
                    key={props.index1 * 3}
                >
                    {props.tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{props.foodTagsContainer ? `(${sumQt(props.tagList[props.index1])})` : ""}</b>
                </label>
                <div className={upDownCSS()}
                >&#10094;</div>
            </div>
            {/* </div> */}
            <div className={style.checkBoxOpenner}>
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
    // const handleAddTagToFoodTagsList2 = props.handleAddTagToFoodTagsList2

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

        { tagType: "parent", tagName: "bezmasite jedla", quantity: 0, tagChildren:  [
            { tagType: "children", tagName: "bezmasite jedla", quantity: 0, tagChildren: null },

        ] },
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
        { tagType: "parent", tagName: "cestoviny", quantity: 0, tagChildren: null },
        { tagType: "parent", tagName: "natierky", quantity: 0, tagChildren: null },
        { tagType: "parent", tagName: "zavaraniny", quantity: 0, tagChildren: null },
         { tagType: "parent", tagName: "mäsové výrobky", quantity: 0, tagChildren: [
            { tagType: "children", tagName: "klobásy a salámy", quantity: 0, tagChildren: null },
            { tagType: "children", tagName: "šunky", quantity: 0, tagChildren: null },
            { tagType: "children", tagName: "zabíjačkové špeciality", quantity: 0, tagChildren: null },
            { tagType: "children", tagName: "grilovanie", quantity: 0, tagChildren: null },
        ]  },
        { tagType: "parent", tagName: "chlieb a pečivo", quantity: 0, tagChildren: [
            { tagType: "children", tagName: "chlieb", quantity: 0, tagChildren: null },
            { tagType: "children", tagName: "rožky", quantity: 0, tagChildren: null },
            { tagType: "children", tagName: "vianočka", quantity: 0, tagChildren: null },
            { tagType: "children", tagName: "bábovka", quantity: 0, tagChildren: null },
        ] }]

        

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



    function isObjectEmpty(objectName) {
        return Object.keys(objectName).length === 0
    }




    //  return  filterTagListArray
    //     .map((str) => {return array?.tagChildren?.map((res) => 
    //          str.foodTag.toLowerCase() === res.tagName.toLowerCase() )}).includes(true)
    // console.log("result :", result);
    // result.includes(true)
    // for (let i in filterTagListArray){for (let a in array.tagChildren){
    //     console.log("foodTag",i.foodTag);
    //     console.log("tagName",a.tagName)
    //     if(i.foodTag === a.tagName ){
    //     //     console.log("YES TRUE",
    //     //     array.tagName,"foodTag",i.foodTag ,"tagName", a.tagName
    //     // )
    //     ;return true}
    // }
    // return false 
    // }


    // return result
    //     .some((str) => label.map(tag => tag).includes(str.foodTag))


    // function labelCSS() {
    //     // console.log(component)
    //     if (component == "viewcomponent") {
    //         return style.labelView
    //     }
    //     if (component == "foodscomponent") {
    //         return style.labelfoods
    //     }
    //     if (component == "editcomponent") {
    //         return style.labelEdit
    //     }
    // }


    let tagListRender = []

    let IDPr1 = 1
    let IDPr2 = 200
    let IDPr3 = 300
    let IDPr4 = 400
    let IDPr5 = 500
    let IDPr6 = 600
    let IDPr7 = 700
    tagList.map((tag, index) => {

        tagListRender.push(<>
            <NavBar
                tag={tag}
                index1={index}
                // handleFilterTagListArray={handleFilterTagListArray}
                // handleFilterTagListArray2={handleFilterTagListArray2}
                handleAddTagToFoodTagsList={handleAddTagToFoodTagsList}
                foodTagsContainer={foodTagsContainer}
                filterTagListArray={filterTagListArray}
                component={component}
                tagList={tagList}
            />
            {/* <div className={style.dropwrapper}>
                <button className={style.btn} data-target="#dropdown">dropdown</button>
                <div className={style.dropmenu} id={style.dropdown}>
                    <input
                        type="checkbox"
                        checked={handleFilterTagListArray(tag.tagName)}
                        name={tag.tagName}
                        className={style.checkboxInput}
                        id={tag.tagName}
                        key={IDPr3}
                        onChange={() => handleAddTagToFoodTagsList(tag.tagName)}
                    />
                    <div
                        className={buttonCSS()}
                        htmlFor="tag"
                        key={IDPr4}
                        onClick={() => handleAddTagToFoodTagsList(tag.tagName)}
                    />
                    <label
                        className={labelCSS()}
                        htmlFor="tag"
                        onClick={() => handleAddTagToFoodTagsList(tag.tagName)}
                        key={IDPr5}
                    >
                        {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].quantity})` : ""}</b>
                    </label>
                </div>
            </div> */}

        </>
        )
        // if (tag.tagChildren == null) {

        //     tagListRender.push(<>
        // <div className={style.food} key={IDPr1}>
        //     <div className={style.checkboxContainer} key={IDPr2}>
        //         <input
        //             type="checkbox"
        //             checked={handleFilterTagListArray(tag.tagName)}
        //             name={tag.tagName}
        //             className={style.checkboxInput}
        //             id={tag.tagName}
        //             key={IDPr3}
        //             onChange={() => handleAddTagToFoodTagsList(tag.tagName)}
        //         />
        //         <div
        //             className={buttonCSS()}
        //             htmlFor="tag"
        //             key={IDPr4}
        //             onClick={() => handleAddTagToFoodTagsList(tag.tagName)}
        //         />
        //         <label
        //             className={labelCSS()}
        //             htmlFor="tag"
        //             onClick={() => handleAddTagToFoodTagsList(tag.tagName)}
        //             key={IDPr5}
        //         >
        //             {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].quantity})` : ""}</b>
        //         </label>
        //     </div>
        // </div>
        //     </>)
        // }
        // if (tag.tagChildren !== null) {
        //     // console.log("tag.tagChildren :",tag.tagChildren)
        //     tagListRender.push(<>
        //         <div className={style.food} key={IDPr1}>
        //             <div className={style.checkboxContainer} key={IDPr2}>
        //                 <input
        //                     type="checkbox"
        //                     checked={handleFilterTagListArray2(tag.tagChildren.map(ta => ta.tagName))}
        //                     name={tag.tagName}
        //                     className={style.checkboxInput}
        //                     id={tag.tagName}
        //                     key={IDPr3}
        //                     onChange={() => handleAddTagToFoodTagsList2(tag.tagChildren.map(ta => ta.tagName))}
        //                 />
        //                 <div
        //                     className={buttonCSS()}
        //                     htmlFor="tag"
        //                     key={IDPr4}
        //                     onClick={() => handleAddTagToFoodTagsList2(tag.tagChildren.map(ta => ta.tagName))}
        //                 />
        //                 <label
        //                     className={labelCSS()}
        //                     htmlFor="tag"
        //                     onClick={() => handleAddTagToFoodTagsList2(tag.tagChildren.map(ta => ta.tagName))}
        //                     key={IDPr5}
        //                 >
        //                     {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].quantity})` : ""}</b>
        //                 </label>
        //             </div>
        //         </div>
        //     </>)
        //     let IDCh1 = 10000
        //     let IDCh2 = 2000
        //     let IDCh3 = 3000
        //     let IDCh4 = 4000
        //     let IDCh5 = 5000
        //     let IDCh6 = 6000
        //     let IDCh7 = 7000
        //     tag.tagChildren.map((tag, index2) => {

        //         tagListRender.push(<>
        //             <div className={style.foodMaso} key={IDCh1}>
        //                 <div className={style.checkboxContainer} key={IDCh2}>
        //                     <input
        //                         type="checkbox"
        //                         checked={handleFilterTagListArray(tag.tagName)}
        //                         name={tag.tagName}
        //                         className={style.checkboxInput}
        //                         id={tag.tagName}
        //                         key={IDCh3}
        //                         onChange={() => handleAddTagToFoodTagsList(tag.tagName)}
        //                     />
        //                     <div
        //                         className={buttonCSS()}
        //                         htmlFor="tag"
        //                         key={IDCh4}
        //                         onClick={() => handleAddTagToFoodTagsList(tag.tagName)}
        //                     />
        //                     <label
        //                         className={labelCSS()}
        //                         htmlFor="tag"
        //                         onClick={() => handleAddTagToFoodTagsList(tag.tagName)}
        //                         key={IDCh5}
        //                     >
        //                         {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].tagChildren[index2].quantity})` : ""}</b>
        //                     </label>
        //                 </div>
        //             </div>
        //         </>)
        //         IDCh1++; IDCh2++; IDCh3++; IDCh4++; IDCh5++; IDCh6++; IDCh7++;
        //     })
        // }
        IDPr1++; IDPr2++; IDPr1++; IDPr3++; IDPr4++; IDPr5++; IDPr6++; IDPr7++;
    })










    return (<>
        <div className={style.firstColumn} key={"bla"}>
            <div key={"fdgfsdf"} >{tagListRender}</div>


        </div>
    </>
    )
}
