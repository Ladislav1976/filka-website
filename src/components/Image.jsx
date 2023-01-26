import style from "./Image.module.css";


//props.visible -> says if modal should appear
export default function Image(props) {
  const newImageUrlsRender = [];
const imageURLs = props.imageURLs

  if(props.imageURLs.length<1) return;
  let IDs=0

  imageURLs.forEach((image) => {  newImageUrlsRender.push(<img
    className={style.foodimage}
    key={IDs}
    src={image.image}
    alt="Image Preview"
  />) ;IDs++ })
  

    return (<div className={style.imagebox}>{newImageUrlsRender}</div>)
  }
   
