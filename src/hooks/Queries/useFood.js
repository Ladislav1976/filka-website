import { getData ,getDataId} from "../use-get";
import {  useQuery } from "@tanstack/react-query"

function foodTagHandler(food, foodTagList, userList) {
    let list1 = []
    let list2 = []

    food?.foodTags?.map((f) => {
        foodTagList?.map((e) => {
            if (e.id === f) {
                list1.push(e);
            }
        })
    });
    food?.user?.map((f) => {
            userList?.map((e) => {
            if (e.id === f) {
                list2.push(e);
            }
        })
    });
    return { ...food, foodTags: list1,user:list2 }
}

export const useFood = (ID) => {
    return useQuery({
        queryKey: ["foods", ID],
        // enabled: !!ID ,
        // && !!tags && !!users,
        queryFn: (queryKey) => getDataId(queryKey.queryKey),
        // select: (data) => { return foodTagHandler(data, tags.data, users.data) },
    });


};