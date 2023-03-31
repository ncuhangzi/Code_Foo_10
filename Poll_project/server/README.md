# Server

## Getting Started

1. Clone the repository
2. Install dependencies: npm install
3. Run the server: npm start
    
## Configuration   
Please make sure that the root directory contains the `.env` file, which contains `MOGODB_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.   

- MongoDB Atlas [Docs](https://www.mongodb.com/cloud/atlas/register)
- Cloudinary [Docs](https://cloudinary.com/)  

### Running the server.

```bash
    npm start
```
     
The server will be running on localhost:8080   
    
## Available Endpoints   

```
    /api/v1/users
```   
**GET** `/users`
Returns a list of all users in the system.   
**Parameters**   
None   
**Response**   
__Success__   
Status code: 200 OK   
```json
[
    {
        "_id": "ObjectId",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/avatar",
    },
    {
        "id": "ObjectId",
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/avatar"
    }
]
```
__Error__   
Status code: 500 Internal Server Error   

**POST** `/users`
Creates a new user in the system.   
**Parameters**   
_Body_   
```json    
    {
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/avatar"
    }
```    
**Response**   
__Success__   
Status code: 200 OK   
```json
    {
        "_id": "ObjectId",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/avatar",
    }
```
__Error__   
Status code: 500 Internal Server Error  
```json
    {
        "message": "error.message"
    }
```   
**GET** `/users/:id`   
Find an user with his Id.   
**Parameters**    
- `id` - The ID to find the user.   

**Response**   
__Success__   
Status code: 200 OK   
```json
    {
        "_id": "ObjectId",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "avatar": "https://lh3.googleusercontent.com/a/avatar",
    }
```
__Error__   
Status code: 500 Internal Server Error   


```
    /api/v1/polls
```
**GET** `/polls`
Returns a list of all polls in the system.   
**Parameters**   
None   
**Response**   
__Success__   
Status code: 200 OK   
```json
[
    {
        "_id": "ObjectId",
        "creator": "John Doe",
        "titel": "What is your favorite Fruit?",
        "option":[
            {"label":"Apple","votes":2},
            {"label":"Banana","votes":5}],
        "topicType": "TV Show",
        "votes":7,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    },
    {
        "_id": "ObjectId",
        "creator": "John Doe",
        "titel": "Have you ever play Mario?",
        "option":[
            {"label":"Yes","votes":10},
            {"label":"No","votes":3}],
        "topicType": "Game",
        "votes":13,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    }
]
```   
__Error__   
Status code: 500 Internal Server Error   
    
**GET** `/polls/:id`
Returns details of a poll in the system.   
**Parameters**   
- `id` - The ID to find a poll.   

**Response**   
__Success__   
Status code: 200 OK   
```json
    {
        "_id": "ObjectId",
        "creator": "John Doe",
        "titel": "What is your favorite Fruit?",
        "option":[
            {"label":"Apple","votes":2},
            {"label":"Banana","votes":5}],
        "topicType": "TV Show",
        "votes":7,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    },
```   
__Error__   
Status code: 500 Internal Server Error   
     
**POST** `/polls`
Create a new poll in the system.   
**Parameters**   
_Body_   
```json
    {
        "creator": "John Doe",
        "titel": "What is your favorite Fruit?",
        "option":[
            {"label":"Apple","votes":0},
            {"label":"Banana","votes":0}],
        "topicType": "TV Show",
        "votes":0,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    }

```
**Response**   
__Success__   
Status code: 200 OK   
```json   
    {
        "_id": "ObjectId",
        "creator": "John Doe",
        "titel": "What is your favorite Fruit?",
        "option":[
            {"label":"Apple","votes":0},
            {"label":"Banana","votes":0}],
        "topicType": "TV Show",
        "votes":0,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    }
```   
__Error__   
Status code: 500 Internal Server Error   

**PATCH** `/polls/:id`
Update a poll with given information in the system.   
**Parameters**   
- `id` - The ID of the poll to update.   

_Body_   
```json
    {
        "creator": "John Doe",
        "titel": "What is your favorite Fruit?",
        "option":[
            {"label":"Apple","votes":3},
            {"label":"Banana","votes":2}],
        "topicType": "TV Show",
        "votes":5,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    }

```
**Response**   
__Success__   
Status code: 200 OK     
```json   
    {
        "_id": "ObjectId",
        "creator": "John Doe",
        "titel": "What is your favorite Fruit?",
        "option":[
            {"label":"Apple","votes":0},
            {"label":"Banana","votes":0}],
        "topicType": "TV Show",
        "votes":0,
        "photo": "https://lh3.googleusercontent.com/a/avatar",
    }
```   
__Error__   
Status code: 500 Internal Server Error   

**DELETE** `/polls/:id`
Delete a poll in the system.   
**Parameters**   
- `id` - The ID of the poll to delete.   

**Response**   
__Success__   
Status code: 200 OK     
__Error__   
Status code: 500 Internal Server Error    

## License

MIT
