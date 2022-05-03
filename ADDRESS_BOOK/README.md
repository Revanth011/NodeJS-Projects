Address Book 

Register/Login Routes <br /> 

| Routes                       | Description
| ---------------------------- | -------------
| /auth/register               | to Register
| /auth/login                  | to Login

To Access the Following Routes, Login/Register to get a JWT Token

| Routes                                    | Description
| ----------------------------------------- | -------------
| /contact/addContact                       | to add Contact
| /contact/addBulkContacts                  | to add Bulk Contacts - req.body Should be a Array a Objects
| /contact/getContact/:contactId            | get a Single Contact by Setting Params
| /contact/getAllContacts?page=1&limit=4    | get All Contacts
| /contact/updateContact/:contactId         | to update a Single Contact 
| /contact/deleteContact/:contactId         | to delete a Single Contact
