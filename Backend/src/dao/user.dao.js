import Usermodel from '../models/user.model.js';

export const findUserbyEmail = async (email) =>{
    try{
        return await Usermodel.findOne({email:email}).select('+password');
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const createUser = async (user) => {
  try {
    const create_user = await Usermodel.create(user); // This already saves
    return create_user;
  } catch (err) {
    console.log(err);
    return null;
  }
}


 


export const findUserbyId = async (id) =>{
    try{
        return await Usermodel.findById(id);
    }
    catch(err){
        console.log(err);
        return null;
    }
}



export const updateUser = async (id, user) =>{
    try{
        return await Usermodel.findByIdAndUpdate(id, user, {new:true});
    }
    catch(err){
        console.log(err);
        return null;
    }
}

