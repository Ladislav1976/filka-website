import style from "./App.module.css";
import { useState } from "react";

function App() {
  return (
    <div className={style.App}>
      <header className={style.Appheader}>Filka Family</header>
      <main className={style.Appmain}></main>
    </div>
  );
}

export default App;
{
  // const [data, setData] = useState([
  //   {
  //     id: 0,
  //     name: "Pepperoni Pizza",
  //     image: "https://i.imgur.com/YBZacyX.jpeg",
  //     ingredients: ["sunka", "vajce"],
  //     process: "",
  //     likes: 5,
  //     dislikes: 1,
  //     fave: true,
  //     tags: ["italian", "meat", "baked"],
  //     date: "1 Feb 2018",
  //   },
  // ]);
}
