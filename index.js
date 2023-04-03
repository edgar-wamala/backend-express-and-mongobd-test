const express = require('express');
const bodyParser = require('body-parser');
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

const app = express();
app.use(bodyParser.json());
  

    
    let db

 let details =[];

 // connecting to mongodb atalas online
    
connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = getDb()

  


  }
})



// function to receive loan request user input

app.post('/loan', (req, res) => {


  const name = req.body.name
  const amount = req.body.amount

  const rate =10/(1200);
  const cal1 =amount*rate;
  const cal2 =rate+1;
  const cal3 =Math.pow(cal2, 18);
  const cal4 =cal1*cal3;
  const cal5 =cal3-1
  const EMI = Math.round(cal4/cal5);
  


  let loans2 = []

  details = loans2


  let currentTime = new Date().getTime();

  let future = currentTime+(5*60*1000);
  
  let tim = new Date(future);

  const loan ={"name":name, "amount":amount, "EMI":EMI, progress: 0, "loanBalance":amount, "deadline":tim, "integerTime":future}

  const initial ={"name":name, "month":0, "EMI":"", "interest":"", "principal":"", "loanBalance":amount, "deadline":tim}

  db.collection('loanScheme')
    .find({"name":name})
    
    .forEach(doc=> loans2.push(doc))  

    .then(() => {
      //console.log(loans2)

// next
  

  //console.log(EMI)

  if(details[0].loanBalance < 0){

    
  db.collection('loanScheme')
    .insertOne(loan)
    db.collection('loanPayment').insertOne(initial)
  
    .then(() => {

      let loans = []

      db.collection('loanScheme')
    .find({name:name})
    .forEach(doc=> loans.push(doc))
    .then(() => {

     

      res.status(200).json(details)
      console.log(loans.amount)
    })



    })
    .catch(err => {
      res.status(500).json({err: 'Could not create new document'})
    })


  }

  else{

    res.status(200).json("you have an outstanding loan balance")
  }


// close 

})
.finally(() => {



    
  db.collection('loanScheme')
    .insertOne(loan)
    db.collection('loanPayment').insertOne(initial)
  
    .then(() => {

      let loans = []

      db.collection('loanScheme')
    .find({name:name})
    .forEach(doc=> loans.push(doc))
    .then(() => {

     

      res.status(200).json(loans)
      console.log(loans.amount)
    })



    })
    .catch(err => {
      res.status(500).json({err: 'Could not create new document'})
    })




  })


  

})

  

// function to get loan balance, interest, principal, amount paid and EMI

app.get('/viewPayments', (req, res) => {

  const name = req.body.name

  let currentTime = new Date().getTime();

  let future = currentTime+(5*60*1000);
  
  let tim = new Date(future);

  let loans = []

  db.collection('loanPayment')
    .find({"name":name})
    
    .forEach(doc=> loans.push(doc))
    .then(() => {
      res.status(200).json(loans)

      console.log(tim)

      console.log(future)


      
     
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })



})

// function to handle installment payments hence EMI

app.post('/installment', (req, res) => {

  const name = req.body.name
  const EMI = req.body.EMI
   
  let loans = []

      db.collection('loanScheme')
    .find({name:name})
    .forEach(doc=> loans.push(doc))
    .then(() => {
      
     const interest2 = (10/1200)*loans[0].loanBalance;
     const interest = Math.round(interest2)
     const principal = EMI-interest;
     const loanBalance2 =loans[0].loanBalance-principal

     const progress =loans[0].progress+1

     //let def = loans[0].integerTime-new Date().getTime();
    
    let currentTime =new Date().getTime();
    let futureTime =loans[0].integerTime
     
     const payment ={ "name":loans[0].name ,"month":progress, "EMI":EMI, "interest":interest, "principal":principal, "loanBalance":loanBalance2, "deadline":loans[0].deadline}

     db.collection('loanPayment').insertOne(payment)
     
     
     db.collection('loanScheme').updateOne({ "name": loans[0].name }, { $set: { "loanBalance":loanBalance2} } );
    

     db.collection('loanScheme').updateOne({ "name": loans[0].name }, { $set: { "progress":progress} } );

     if(currentTime > futureTime){

      db.collection('loanPayment').updateOne({ "name":name }, { $set: { "debt":"bad debt"} } );
     }
    

    // console.log(def)
     res.status(200).json(payment)
      
    })


})


