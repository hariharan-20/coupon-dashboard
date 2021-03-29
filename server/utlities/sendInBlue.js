const SibApiV3Sdk= require('sib-api-v3-sdk')

//adding email to send in 
const addEmailToSIB=(email)=>{
    const apikey='SIB_API_KEY',

    //setup
    const defaultClient= SibApiV3Sdk.ApiClient.instance;
    const apiKey= defaultClient.authentications['api-key'];
    apiKey.apiKey=apikey;

    //creating contact
    let apiInstance= new SibApiV3Sdk.ContactsApi();
    let createContact= new SibApiV3Sdk.CreateContact();

    createContact.email=email;
    createContact.listIds= [2];

    //call SIB api
    apiInstance/createContact(createContact).then((data)=>{
        //successful in sending mail

        res.status(200).send('success')
    }, function(error){
        res.status(500).send('failure')

    })



}

// module.exports={addEmailToSIB}