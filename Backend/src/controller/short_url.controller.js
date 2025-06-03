
import { Createshorturlwithout_user_service, Createshorturlwith_user_service } from "../services/short_url.service.js";
import urlSchema from "../models/short_url.model.js";
import dotenv from 'dotenv'
dotenv.config()


export const createShorturl = async (req, res) => {
  const data = req.body;
  let shortUrl;

  try {
    if (req.user) {
      shortUrl = await Createshorturlwith_user_service(data.url, req.user._id, data.slug);
    } else {
      shortUrl = await Createshorturlwithout_user_service(data.url);
    }

    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Something went wrong" });
  }
};


export const redirectShorturl = async(req,res)=>{
    const {id} = req.params;
    const url = await urlSchema.findOneAndUpdate({short_url:id},{$inc:{clicks:1}})
        if(url){
            res.redirect(url.full_url)
        }
        else{
          res.status(404).send("URL not found")
        }
}


export const CreateCustomeurl = async (req, res) =>{

   const {url ,slug} = req.body;
   const shortUrl = await Createshorturlwith_user_service(url, customUrl)
   res.status(200).send(process.env.APP_URL + shortUrl)
   

        
}