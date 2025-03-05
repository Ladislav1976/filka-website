import style from "./PageButton.module.css";

function PageButton(props) {
    const page = props.page
    const pg = props.pg
    return <button
        className={style.button}
        id={pg === page  ? style["buttoncurrentpage"] : style[""]}
        
        onClick={() => props.pageChange(pg)}>{pg}
    </button>
}

export default PageButton
