# API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register` 
- `POST /users/login` 
- `GET /jobs` 
- `POST /jobs` 
- `GET /jobs/:id` 
- `DELETE /jobs/:id` 
- `GET /companies`
- `POST /companies`
- `GET /companies/:id`
- `DELETE /companies/:id` 
- `GET /histories`
- `PUT /jobs/:id` 
- `PATCH /jobs/:id/status` 
&nbsp;

## 1. POST /users/register

Request:

- body:

```json
{
    "username" : "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
    
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "username" : "string",
    "email": "string",
    "phoneNumber": "string",
    "address": "string",
    "createdAt" : "date",
    "updatedAt" : "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username can not be null"
}
OR
{
  "message": "Username can not be empty"
}
OR
{
  "message": "Email can not be null"
}
OR
{
  "message": "Email can not be empty"
}
OR
{
  "message": "Please enter a valid email address"
}
OR
{
  "message": "Password can not be null"
}
OR
{
  "message": "Password can not be empty"
}
OR
{
  "message": "Password must be at least 5 characters long"
}
OR
{
  "message": "Email address already in use!"
}
```
&nbsp;


## 2. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid email/password"
}
```
&nbsp;


## 3. GET /jobs

Description:
- Get all job from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "title": "Purchasing Staff",
        "description": "Responsibilities:\nReceive purchase requests from users.\nAble to negotiate prices.\nCreate purchase order.\nMake sure the ordered goods come as requested.\nCreate documentation according to the applicable SOP.",
        "imgUrl": "https://image-service-cdn.seek.com.au/8fab484429da3904571abe6dcfda784217dd1450/ee4dce1061f3f616224767ad58cb2fc751b8d2dc",
        "companyId": 2,
        "authorId": 1,
        "jobType": "Full Time",
        "status": "Active",
        "createdAt": "2023-03-15T02:25:39.270Z",
        "updatedAt": "2023-03-15T02:25:39.270Z",
        "User": {
            "id": 1,
            "username": "Bondan",
            "email": "bondanherutomo35@gmail.com",
            "role": "Admin",
            "phoneNumber": "082111733373",
            "address": "Depok Jawa barat",
            "createdAt": "2023-03-15T02:25:39.204Z",
            "updatedAt": "2023-03-15T02:25:39.204Z"
        }
    },
    {
        "id": 2,
        "title": "Media Buying Supervisor",
        "description": "Responsibilities:\nCandidate must possess at least Bachelor's Degree in Business.\nAble to negotiate prices.\nPreferably Supervisor specialized in Marketing/Business Development or equivalent..\nCreate documentation according to the applicable SOP.",
        "imgUrl": "Preferably Supervisor specialized in Marketing/Business Development or equivalent.",
        "companyId": 1,
        "authorId": 2,
        "jobType": "Full Time",
        "status": "Active",
        "createdAt": "2023-03-15T02:25:39.270Z",
        "updatedAt": "2023-03-15T02:25:39.270Z",
        "User": {
            "id": 2,
            "username": "Vivi",
            "email": "vivialfianau@gmail.com",
            "role": "Staff",
            "phoneNumber": "082888700373",
            "address": "Depok Jawa barat",
            "createdAt": "2023-03-15T02:25:39.225Z",
            "updatedAt": "2023-03-15T02:25:39.225Z"
        }
    }
    ...,
]
```
&nbsp;

## 4. POST /jobs

Description:
- Create job

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- body:

```json
{
    "title" : "string",
    "description": "string",
    "imgUrl": "string",
    "companyId": "integer",
    "jobType": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "title" : "string",
    "description": "string",
    "imgUrl": "string",
    "companyId": "integer",
    "authorId" : "integer",
    "jobType": "string",
    "status" : "string",
    "createdAt" : "date",
    "updatedAt" : "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Job name can not be null"
}
OR
{
  "message": "Job name can not be empty"
}
OR
{
  "message": "Description job can not be null"
}
OR
{
  "message": "Description job can not be empty"
}
OR
{
  "message": "ImageUrl can not be null"
}
OR
{
  "message": "ImageUrl can not be empty"
}
OR
{
  "message": "Job type can not be null"
}
OR
{
  "message": "Job type can not be empty"
}
```
&nbsp;


## 5. GET /jobs/:id

Description:
- Get job by id from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "Purchasing Staff",
    "description": "Responsibilities:\nReceive purchase requests from users.\nAble to negotiate prices.\nCreate purchase order.\nMake sure the ordered goods come as requested.\nCreate documentation according to the applicable SOP.",
    "imgUrl": "https://image-service-cdn.seek.com.au/8fab484429da3904571abe6dcfda784217dd1450/ee4dce1061f3f616224767ad58cb2fc751b8d2dc",
    "companyId": 2,
    "authorId": 1,
    "jobType": "Full Time",
    "createdAt": "2023-03-15T02:25:39.270Z",
    "updatedAt": "2023-03-15T02:25:39.270Z"
}
```

_Response (404 - Data Not found)_

```json
{
  "message": "Data Not Found"
}
```
&nbsp;


## 6. DELETE /jobs/:id

Description :
- Remove a product data based on given id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "${job.title} success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```
&nbsp;


## 7. GET /companies

Description:
- Get all company from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "PT Perindustrian Bapak Djenggot (Orang Tua Group)",
        "companyLogo": "https://image-service-cdn.seek.com.au/523a9641b06447fe34902827e5f8d4f7e0147972/ee4dce1061f3f616224767ad58cb2fc751b8d2dc",
        "location": "Jakarta Barat",
        "email": "orangtua@gmail.com",
        "description": "OT adalah perusahaan consumer goods yang memproduksi berbagai macam produk kebutuhan sehari-hari",
        "createdAt": "2023-03-15T02:25:39.262Z",
        "updatedAt": "2023-03-15T02:25:39.262Z"
    },
    {
        "id": 2,
        "name": "PT Tirta Alam Segar",
        "companyLogo": "https://image-service-cdn.seek.com.au/8fab484429da3904571abe6dcfda784217dd1450/ee4dce1061f3f616224767ad58cb2fc751b8d2dc",
        "location": "Bekasi",
        "email": "tirtaalamsegar@gmail.com",
        "description": "WINGS Group is one of the largest and most established consumer goods manufacturer in Indonesia focusing in laundry, household, personal care, and Food & Beverage products",
        "createdAt": "2023-03-15T02:25:39.262Z",
        "updatedAt": "2023-03-15T02:25:39.262Z"
    },
    ....
]
```
&nbsp;


## 8. POST /companies

Description:
- Create company

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- body:

```json
{
    "name" : "string",
    "companyLogo": "string",
    "location": "string",
    "email": "string",
    "description": "string"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "name" : "string",
    "companyLogo": "string",
    "location": "string",
    "email": "string",
    "description": "string",
    "createdAt" : "date",
    "updatedAt" : "date"
}
```

Response (400 - Bad Request)_

```json
{
  "message": "Company name can not be null"
}
OR
{
  "message": "Company name can not be empty"
}
OR
{
  "message": "Logo url can not be null"
}
OR
{
  "message": "Logo url can not be empty"
}
OR
{
  "message": "Location can not be null"
}
OR
{
  "message": "Location can not be empty"
}
OR
{
  "message": "Description can not be null"
}
OR
{
  "message": "Description can not be empty"
}
```
&nbsp;



## 9. GET /companies/:id

Description:
- Get company by id from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "PT Perindustrian Bapak Djenggot (Orang Tua Group)",
    "companyLogo": "https://image-service-cdn.seek.com.au/523a9641b06447fe34902827e5f8d4f7e0147972/ee4dce1061f3f616224767ad58cb2fc751b8d2dc",
    "location": "Jakarta Barat",
    "email": "orangtua@gmail.com",
    "description": "OT adalah perusahaan consumer goods yang memproduksi berbagai macam produk kebutuhan sehari-hari",
    "createdAt": "2023-03-15T02:25:39.262Z",
    "updatedAt": "2023-03-15T02:25:39.262Z"
}
```

_Response (404 - Data Not found)_

```json
{
  "message": "Data Not Found"
}
```
&nbsp;


## 10. DELETE /companies/:id

Description :
- Remove companies data based on given id
Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "${company.name} success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```
&nbsp;


## 11. GET /histories

Description:
- Get all history from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "masuk company 2",
        "description": "new compnay with id 21 created",
        "updatedBy": "bondanherutomo35@gmail.com",
        "createdAt": "2023-03-26T10:18:00.156Z",
        "updatedAt": "2023-03-26T10:18:00.156Z"
    },
    {
        "id": 2,
        "name": "MASUK DESC",
        "description": "new compnay with id 20 created",
        "updatedBy": "bondanherutomo35@gmail.com",
        "createdAt": "2023-03-26T10:17:41.893Z",
        "updatedAt": "2023-03-26T10:17:41.893Z"
    },
    {
        "id": 3,
        "name": "SALES MOTOR 2",
        "description": "entity with id 43 updated",
        "updatedBy": "bondanherutomo35@gmail.com",
        "createdAt": "2023-03-26T10:02:16.908Z",
        "updatedAt": "2023-03-26T10:02:16.908Z"
    },
```,
]
```
&nbsp;

## 12. PUT /jobs/:id

Description:
- Update job

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- params:

```json
{
  "id": "integer"
}
```

Request:

- body:

```json
{
    "title" : "string",
    "description": "string",
    "imgUrl": "string",
    "companyId": "integer",
    "jobType": "string"
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "title" : "string",
    "description": "string",
    "imgUrl": "string",
    "companyId": "integer",
    "authorId" : "integer",
    "jobType": "string",
    "status": "string",
    "createdAt" : "date",
    "updatedAt" : "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Job name can not be null"
}
OR
{
  "message": "Job name can not be empty"
}
OR
{
  "message": "Description job can not be null"
}
OR
{
  "message": "Description job can not be empty"
}
OR
{
  "message": "ImageUrl can not be null"
}
OR
{
  "message": "ImageUrl can not be empty"
}
OR
{
  "message": "Job type can not be null"
}
OR
{
  "message": "Job type can not be empty"
}
OR
{
  "message": "Job status can not be null"
}
OR
{
  "message": "Job status can not be empty"
}
OR
{
  "message": "Only allowed Active, Inactive and Archived"
}
```
&nbsp;


## 13. PATCH /jobs/:id/status

Description:
- Update status

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Request:

- params:

```json
{
  "id": "integer"
}
```

Request:

- body:

```json
{
   "status" : "string"
}
```

_Response (200 - OK)_

```json
{
 
    "message": "Job status updated"


}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found",
    "name": "Data Not Found"
}

```
_Response (400 - Bad Request)_

```json
{
  "message": "Job status can not be null"
}
OR
{
  "message": "Job status can not be empty"
}
OR
{
  "message": "Only allowed Active, Inactive and Archived"
}

```
&nbsp;



## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
