const express = require('express')
const https = require('https')
const app = express()
const port = 3000


/*
to be able to create user static account
 the user has to be created and stored in your database then be getting 
 the user data, use mongose to store usermodel

*/


const CreatePaystackUser = async()=>{
    const params = {
        email: "customer@email.com",
        first_name: "Zero",
        last_name: "Sum",
        phone: "+2348123456789"
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
        .then(response => {
          console.log(response.data);
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
          console.error(error);
        });
}


const CreatingStaticBankAccount = async()=>{

const params = {
    customer: 481193,
    preferred_bank: "wema-bank",
    last_name: "wema-bank",//optional
    first_name: "wema-bank",//optional
    phone: "wema-bank",//optional
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
    })
    .catch(error => {
      console.error(error);
    });
}



const CreatingDedicatedAccountMethod2 = async ()=>{

const postData = {
    email: "janedoe@test.com",
    first_name: "Jane",
    middle_name: "Karen",
    last_name: "Doe",
    phone: "+2348100000000",
    preferred_bank: "wema",
    country: "NG"
  };
  
  const config = {
    method: 'POST',
    url: 'https://api.paystack.co/dedicated_account/assign',
    headers: {
      Authorization: 'Bearer SECRET_KEY', // Replace with your actual secret key
      'Content-Type': 'application/json'
    },
    data: postData
  };
  
  axios(config)
    .then(response => {
      console.log(response.data);

    //   {
    //     "status": true,
    //     "message": "Assign dedicated account in progress"
    //   }
    })
    .catch(error => {
      console.error(error);
    });
}


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))




/*

echo "# paystack-Static-account" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/nestsoft-dev/paystack-Static-account.git
git push -u origin main

*/