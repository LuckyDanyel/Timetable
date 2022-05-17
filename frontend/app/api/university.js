import user from "./settings";

export async function uploadData(data, url){
    
    return await user.post({
        methods: 'post',
        url,
        data,
    })
}