// import style from "./PageButton.module.css";
import style from "./PageButton.module.css";

function PageButton({ pg, page, handleSetPage }) {
    return <button
        className={style.button}
        // background={pg == page ? "#558113" : "#fd0000"}
        id={pg === page  ? style["buttoncurrentpage"] : style[""]}
        
        onClick={() => handleSetPage(pg)}>{pg}
    </button>
}

export default PageButton
