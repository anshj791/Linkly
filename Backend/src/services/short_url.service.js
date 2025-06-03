import urlSchema from '../models/short_url.model.js';
import { getnanoId } from '../utils/helper.js';
import { getCustomShortUrl, saveshorturl } from '../dao/short_url.js';
import { CreateCustomeurl } from '../controller/short_url.controller.js';

export const Createshorturlwithout_user_service = async (url) => {
        const shortUrl = getnanoId(7)
        await saveshorturl(shortUrl,url)
     return shortUrl;
}
export const Createshorturlwith_user_service = async (url,userId,slug=null) => {
        const shortUrl = slug || getnanoId(7)
        const exits = await getCustomShortUrl(slug)
        if(exits){
                throw new Error("Slug already exists")
        }
        await saveshorturl(shortUrl,url,userId)
     return shortUrl;
}

