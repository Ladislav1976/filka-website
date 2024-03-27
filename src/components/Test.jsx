import { useGet, useMutate } from "restful-react";
import { useParams } from "react-router-dom";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
import UseSOmarina from "./UseSOmarina";
export default function Test (props) {
function HandleGet(url){
    return useQuery({queryKey:[url]})

}

const id = 1
    const {data} = HandleGet(`/foods/${id}/`)
    console.log("Data",data)
    return
}