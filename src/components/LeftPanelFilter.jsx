import style from "./LeftPanelFilter.module.css";

//props.visible -> says if modal should appear
export default function LeftPanelFilter(props) {
    const foodTagsContainer = props.foodTagsContainer
    const component = props.component
   // console.log("left panel")

    //['polievky', 'jahna', 'polievky', 'jahna']
    let tagList = [
        { tagType: "parent", tagName: "polievky", quantity: 0, tagChildren: null },
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

        { tagType: "parent", tagName: "bezmasite jedla", quantity: 0, tagChildren: null},
        {
            tagType: "parent", tagName: "prilohy", quantity: 0, tagChildren: [
                { tagType: "children", tagName: "omacky", quantity: 0, tagChildren: null },
        ] },
        { tagType: "parent", tagName: "kolace a dezerty", quantity: 0, tagChildren: null },
        { tagType: "parent", tagName: "cestoviny", quantity: 0, tagChildren: null },
        { tagType: "parent", tagName: "natierky", quantity: 0, tagChildren: null }]
 //console.log("foodTagsBox 2:",foodTagsContainer)
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
        // for (let foodTag of foodTagsContainer) {
        //     console.log("foodTag",foodTag)
        //     for (let a of foodTag) {
        //         for (let i of tagList) {
        //             if (i.tagChildren == null) {
        //                 if (i.tagName == a) {
        //                     i.quantity = i.quantity+1
        //                 }
        //             }
        //             if (i.tagChildren != null) {
        //                 if (i.tagName == a) {
        //                     i.quantity = i.quantity+1
        //                 }
        //                 for (let e of i.tagChildren) {
        //                     if (e.tagName == a) {
        //                         e.quantity =e.quantity +1
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        //console.log("tagList",tagList[0])
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
    let tagListRender = []
    var css = '.label:hover{ background-color: #00ff00 }';
    tagList.map((tag, index1) => {
        if (tag.tagChildren == null) {

            tagListRender.push(<>
                <div className={style.food}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray(tag.tagName)}
                            name={tag.tagName}
                            className={style.checkboxInput}
                            id={tag.tagName}
                            key={tag.tagName}
                            onChange={() => handleAddToTagList(tag.tagName)}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            hover= {component=="viewcomponent" ? "" :""}
                            onClick={() => handleAddToTagList(tag.tagName)}
                        >
                            {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].quantity})` : ""}</b>
                        </label>
                    </div>
                </div>
            </>)
        }
        if (tag.tagChildren != null) {
            tagListRender.push(<>
                <div className={style.food}>
                    <div>
                        <input
                            type="checkbox"
                            checked={handleFilterTagListArray(tag.tagName)}
                            name={tag.tagName}
                            className={style.checkboxInput}
                            id={tag.tagName}
                            key={tag.tagName}
                            onChange={() => handleAddToTagList(tag.tagName)}
                        />
                        <label
                            className={style.label}
                            htmlFor="tag"
                            onClick={() => handleAddToTagList(tag.tagName)}
                        >
                            {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].quantity})` : ""}</b>
                        </label>
                    </div>
                </div>
            </>)
            tag.tagChildren.map((tag, index2) => {
                tagListRender.push(<>
                    <div className={style.foodMaso}>
                        <div>
                            <input
                                type="checkbox"
                                checked={handleFilterTagListArray(tag.tagName)}
                                name={tag.tagName}
                                className={style.checkboxInput}
                                id={tag.tagName}
                                key={tag.tagName}
                                onChange={() => handleAddToTagList(tag.tagName)}
                            />
                            <label
                                className={style.label}
                                htmlFor="tag"
                                onClick={() => handleAddToTagList(tag.tagName)}
                            >
                                {tag.tagName.toUpperCase()} <b className={style.tagQuantity}>{foodTagsContainer ? `(${tagList[index1].tagChildren[index2].quantity})` : ""}</b>
                            </label>
                        </div>
                    </div>
                </>)
            })
        }
    })




    return (
        <>

            <div className={style.foodtypesbox} key={tagListRender}>
                {tagListRender}

            </div>
        </>
    )
}
