import { useGet, useMutate } from "restful-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export default function UseSOmarina (props) {
//     const id = useParams()
//     console.log (typeof (id.id))
//     console.log('id', id.id)

// const { data: rawFoods,
//     refetch: refetchFood,
//     loading: loadingFoods,
// } = useGet({
//     path: `/foods/${id.id}/`,
//     // debounce: true,
//     debounce: { wait: 200, options: { leading: true, maxWait: 300, trailing: false } } /* ms */,
// })
// console.log("sss",JSON.stringify(rawFoods), loadingFoods).
// return useQuery({
//   queryKey: [`/foods/${id.id}/`],
//   enabled: !!id.id,
// })

// return useQuery({
//   queryKey: [`/foods/`],

// })
const url = props.url
console.log(url)

return useQuery({queryKey:[url]}
      // const { data } = await axios.get(`/foods/${id.id}/`
      )
    // return data
    // },  

    
    // onError: (error) => {
    //   console.log(error)
    // },
    // onSuccess: (data) => {
    //   console.log(data)
    // },
    // onSettled: (data, error) => {
    //   console.log(data, error)
    // },
  // })

// return console.log(JSON.stringify(data))

// return { rawFoods, refetchFood, loadingFoods }


// export default function UseSOmarina 
//   ({ postId }) {
//     // const id = useParams()
//     // console.log(`/foods/${id.id}/`)
// const id = "1"
//     console.log (typeof (id))
//     const { status, data, error, isFetching } = 
//       useQuery({
//         queryKey: [`/foods/${postId}`],
//         enabled: !!postId,
//       })

 
// return 
//     // ...
  }

