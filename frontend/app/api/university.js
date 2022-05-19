import { user } from "@/api/settings";

export async function uploadData(data, url){
    return await user({
        method:'post',
        url,
        data,
    })
}

export async function getData(url){
    return await user({
        method:'get',
        url,
    })
}