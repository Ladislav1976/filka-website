
// import { createPostStep, createPutStep, createDeleteStep, createPostUnit, createPostIngredient, createPostIngredients, createPostFoodTag, createPostFood, createPutFood, createPostImagefood, createDeleteImagefood, createPutImagefood } from "../hooks/use-post";
// import { useQueries, useQuery, useQueryClient, useMutation, } from "@tanstack/react-query"
// const PostStepMutation = (stepsSet) => {
// // export async function PostStepMutation(stepsSet) {

    
    
//     const mutation = useMutation({
//         mutationFn: () => {
//             stepsSet?.map((res, index) => {
//                 console.log("res.id :", res)
//                 let newStep = {
//                     id: res.id,
//                     step: res.step,
//                     stposition: index + 1,
//                 }
//                 if (Number.isInteger(res.id)) {
//                     createPostStep(newStep)
//                 }
//                 else {
//                     createPutStep(newStep,)
//                 }
      
//             })
//         }
// })
//     // try {
//     //   const todo = await mutation.mutateAsync(todo)
//     //   console.log(todo)
//     // } catch (error) {
//     //   console.error(error)
//     // } finally {
//     //   console.log('done')
//     // }
//     return mutation.data
// }
// export default PostStepMutation;
import { useEffect } from "react";
import { useState } from "react";

const useMutate = (responce) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);


    // setTimeout(function () {
    //   console.log("Hello World");
    // }, 500);
    try {if (!responce.res.ok) {
        throw Error("could not fetch that resourse");
        }else{
            setData(data);
            setIsPending(false);
            setError(null);
          } }
          catch(err) {
            setIsPending(false);
            setError(err.message);
          }
    // ((responce)=>{
    //     if (!responce.res.ok) {
    //     throw Error("could not fetch that resourse");
    //     })
    //     .then((data) => {
    //     setData(data);
    //     setIsPending(false);
    //     setError(null);
    //   })
    //   .catch((err) => {
    //     setIsPending(false);
    //     setError(err.message);
    //   });}
    // setTimeout(() => {
    //   fetch(url)
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw Error("could not fetch that resourse");
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setData(data);
    //       setIsPending(false);
    //       setError(null);
    //     })
    //     .catch((err) => {
    //       setIsPending(false);
    //       setError(err.message);
    //     });
    // }, 1000);

  return { data, isPending, error };
};

export default useMutate;
