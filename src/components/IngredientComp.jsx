import React from "react";
import { useGet, useMutate } from "restful-react";

// export default () => {
//   const {
//     data: rawIngredient,
//     refetch,
//     loading: loadingIngredient,
//     error,
//   } = useGet({
//     path: "/ingredient/",
//   });

//   if (error) {
//     return <p>{error.message}</p>;
//   }

//   if (loadingIngredient) {
//     return <p>loading…</p>;
//   }
//   console.log("ingredientBackEndNEW POOO:", rawIngredient);
//   return rawIngredient;

//   //   (
//   //     <div>
//   //       <p>The secret is: {data}</p>
//   //       <button onClick={() => refetch()}>Refresh</button>
//   //     </div>
//   //   );
// };
const IngredientComp = (props) => {
  const {
    rawIngredient,
    refetchIngredient,
    postIngredient,
    loadingIngredient,
    error,
  } = props.ingredient;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loadingIngredient) {
    return <p>loading…</p>;
  }

  let ingredientBackEnd = rawIngredient ?? [];
  console.log("ingredientBackEndNEW POOO separe:", ingredientBackEnd);
  return <div>{ingredientBackEnd}</div>;
};
export default IngredientComp;
