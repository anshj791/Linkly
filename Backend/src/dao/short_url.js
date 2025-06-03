import urlSchema from '../models/short_url.model.js'

export const saveshorturl = (shortUrl,url,userId) =>{
        const newUrl =  urlSchema({
             full_url : url,
             short_url : shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        newUrl.save()

}

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}