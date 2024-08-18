
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
