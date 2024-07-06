const userModel = require("../models/userModel");
const bcrypt  =require('bcrypt');

//get all user
exports.getAllUsers = async(req,res) =>{
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount : users.length,
            success:true,
            message : 'all users data',
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message : "Error in get all users"
        })
        
    }
}


exports.registerController = async(req,res)=>{
    try {
        
        const {username , email , password} = req.body;
        if(!username || !email||  !password){
            res.status(400).send({
                success:false,
                message: 'Please fill all fields',
                error
            })
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
                message: 'user already exists'
            })
        }
        const hashedpassword = await bcrypt.hash(password,10);

        //save user
        const user = new userModel({username ,email,password:hashedpassword});
        await user.save();
        return res.status(201).send({
            success:true,
            message : "New User Created"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message : 'Error in Register callback',
            success : false,
            error
        })
    }

}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Login successful
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            user
        });
    } catch (error) {
        console.error('Error in loginController:', error);
        return res.status(500).send({
            success: false,
            message: "Error in Login Callback"
        });
    }
};