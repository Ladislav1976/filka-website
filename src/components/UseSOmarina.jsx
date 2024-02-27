import { useGet, useMutate } from "restful-react";
import { useParams } from "react-router-dom";

export default function UseSOmarina (props) {
    // const id = useParams()
    // console.log('id', id.id)
    
    // const { data: rawFoods,
    //     refetch: refetchFood,
    //     loading: loadingFoods,
    // } = useGet({
    //     path: `/foods/${id.id}/`,
    //     // debounce: true,
    //     debounce: { wait: 200, options: { leading: true, maxWait: 300, trailing: false } } /* ms */,
    // })
    // console.log("sss",JSON.stringify(rawFoods), loadingFoods)
    const { data } = useQuery({
        queryFn: async () => {
          const { data } = await axios.get(`/foods/${id}/`
          )
        return data
        }
      })
    
    return console.log(JSON.stringify(data))
    // return { foodsRaw, refetchFood, loadingFoods } 
    // return { rawFoods, refetchFood, loadingFoods }
}
