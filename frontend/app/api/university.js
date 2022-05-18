import { user } from "@/api/settings";

export async function uploadData(data, url){
    return await user({
        method:'post',
        url,
        data,
    })
}