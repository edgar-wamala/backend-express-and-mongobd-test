# backend-express-and-mongobd-test
An API to allow loan request and paying using Equated Monthly Instalment (EMI)method
## Starting or Running the API
  After downloading or clonning the zipped file, unzip it and open it with VSCODE Editor
Run the following command to install all the dependencies
### npm install
Start the server by running
### node index.js

# Carry out the following tasks by using Postman or any other software for testing api

### Task1 An endpoint to allow a user to take a loan if they have no outstanding balance.


![loan1](https://user-images.githubusercontent.com/51428956/229566716-8a90ed50-7607-4733-90ed-a9c30a683dc1.JPG)

The system has allowed him to request for a loan because he has no outstanding balance

![loan2](https://user-images.githubusercontent.com/51428956/229567200-3e062d36-2f55-4c08-92cb-a2daf1c2e779.JPG)

The view on the online mongoDb atalas Storage



![loan4](https://user-images.githubusercontent.com/51428956/229567665-11aab649-a48c-4164-a1f9-8853ab0ac5a4.JPG)

The system has refused him to request for a new loan because he has an oustanding loan balance

### Task3 Allow a user to submit an instalment and receive a response with the amount paid, outstanding balance, interest paid, and principal paid.

![loan3](https://user-images.githubusercontent.com/51428956/229568246-20700a3f-b8df-46a7-bd45-48f58e05b4b2.JPG)

### Task2 An endpoint to allow a user to view their payments, interest paid, principal paid so far, and outstanding balances.

![loan5](https://user-images.githubusercontent.com/51428956/229568634-c26ad87e-e976-41e3-a5d7-fac481810727.JPG)
