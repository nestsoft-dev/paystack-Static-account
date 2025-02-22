const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const https = require('https');
var jwt = require('jsonwebtoken');
const CustomerModel = require('../models/paystackUserModel');
const axios = require('axios')




const saltRounds = 10;




const registerUser = async(req,res)=>{
    try {
        const {firstname,lastname,username,password,email,phoneNumber} = req.body
        const existUser = await UserModel.findOne({email:email})
        if(!existUser)return res.status(400).send({status:false,message:"user already exist"})
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                const newUser = new UserModel({
                    firstname,lastname,username,phoneNumber,password:hash
            })

            const createdUser = await newUser.save()
            const params = {
                email: createdUser.email,
                first_name: createdUser.firstname,
                last_name: createdUser.lastname,
                phone: createdUser.phoneNumber
              };
              
              const config = {
                method: 'POST',
                url: 'https://api.paystack.co/customer',
                headers: {
                  Authorization: 'Bearer SECRET_KEY', // Replace SECRET_KEY with your actual key
                  'Content-Type': 'application/json'
                },
                data: params
              };
              
              axios(config)
                .then(async response => {
                  console.log(response.data);
                  const customer = new CustomerModel(response.data)
                  await customer.save()

                  const params = {
                    customer: customer.customer_code,
                    preferred_bank: "wema-bank",
                    last_name: createdUser.firstname,//optional
                    first_name: createdUser.lastname,//optional
                   // phone: "wema-bank",//optional
                  };
                  
                  const config = {
                    method: 'POST',
                    url: 'https://api.paystack.co/dedicated_account',
                    headers: {
                      Authorization: 'Bearer SECRET_KEY', // Replace SECRET_KEY with your actual key
                      'Content-Type': 'application/json'
                    },
                    data: params
                  };
                  
                  axios(config)
                    .then(response => {
                      console.log(response.data);
                
                      /*
                      STORE THIS IN YOUR DB BY IKENNA
                      {
                  "status": true,
                  "message": "NUBAN successfully created",
                  "data": {
                    "bank": {
                      "name": "Wema Bank",
                      "id": 20,
                      "slug": "wema-bank"
                    },
                    "account_name": "KAROKART / RHODA CHURCH",
                    "account_number": "9930000737",
                    "assigned": true,
                    "currency": "NGN",
                    "metadata": null,
                    "active": true,
                    "id": 253,
                    "created_at": "2019-12-12T12:39:04.000Z",
                    "updated_at": "2020-01-06T15:51:24.000Z",
                    "assignment": {
                      "integration": 100043,
                      "assignee_id": 7454289,
                      "assignee_type": "Customer",
                      "expired": false,
                      "account_type": "PAY-WITH-TRANSFER-RECURRING",
                      "assigned_at": "2020-01-06T15:51:24.764Z"
                    },
                    "customer": {
                      "id": 7454289,
                      "first_name": "RHODA",
                      "last_name": "CHURCH",
                      "email": "rhodachurch@email.com",
                      "customer_code": "CUS_kpb3qj71u1m0rw8",
                      "phone": "+2349053267565",
                      "risk_action": "default"
                    }
                  }
                }
                  */

                var token = jwt.sign({ id: createdUser._id }, 'ikenna',{expiresIn:'7d'});
                res.status(200).send({status:true,message:'user created',token})
                    })
                    .catch(error => {
                      console.error(error);
                    });

               
                //   {
                //     "status": true,
                //     "message": "Customer created",
                //     "data": {
                //       "email": "customer@email.com",
                //       "integration": 100032,
                //       "domain": "test",
                //       "customer_code": "CUS_xnxdt6s1zg1f4nx",
                //       "id": 1173,
                //       "identified": false,
                //       "identifications": null,
                //       "createdAt": "2016-03-29T20:03:09.584Z",
                //       "updatedAt": "2016-03-29T20:03:09.584Z"
                //     }
                //   }
        
                //the most important data is the customer id as it is needed or the customer code
                })
                .catch(error => {
                    res.status(400).send({status:false,message:error.message})
                });
            });
          
        
    } catch (error) {
        res.status(400).send({status:false,message:error.message})
    }
}


const loginUser = async(req,res)=>{
    try {
        const {email,password}= req.body
        const user = await UserModel.findOne({email:email})
        if(!user) return  res.status(400).send({status:false,message:"user not found"})
            const match = await bcrypt.compare(password, user.password);
        if(match){

            var token = jwt.sign({ id: createdUser._id }, 'ikenna',{expiresIn:'7d'});
         
            res.status(201).send({status:true,message:"user login",token})
        }else{
            res.status(400).send({status:false,message:'wrong password'})
        }
    } catch (error) {
        res.status(400).send({status:false,message:error.message})
    }
}


module.exports= {registerUser,loginUser}