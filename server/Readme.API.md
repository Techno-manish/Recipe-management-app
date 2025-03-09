# Recipe Management API Documentation

## Base URL:

```
http://localhost:8000/api/v1
```

## Authentication & Users

### **Register User**

**Endpoint:** `POST /users/register`

**Request Body:**

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "data": {
    "id": "userId",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### **Login User**

**Endpoint:** `POST /users/login`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token",
  "user": {
    "id": "userId",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### **Logout User** (Protected)

**Endpoint:** `POST /users/logout`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "message": "Logout successful"
}
```

---

## Recipe Routes

### **Get All Recipes**

**Endpoint:** `GET /recipe/`

**Response:**

```json
{
  "data": [
    {
      "id": "recipeId",
      "name": "Idli",
      "description": "Idli is one of the most healthiest and popular South Indian breakfast dish.",
      "ingredients": [
        "With Idli Rice",
        "With Idli Rava",
        "Soaking rice and lentils",
        "urad dal"
      ],
      "instructions": "Step by step instructions",
      "recipeImg": "https://res.cloudinary.com/sanket12/image/upload/v1704963820/orgv0s1cvikeyw5wpjp3.jpg",
      "cookingTime": 30,
      "category": "Uncategorized",
      "order": 0,
      "userOwner": "659ed8cb9a560cebea7714f7"
    }
  ]
}
```

### **Create Recipe**

**Endpoint:** `POST /recipe/create`

**Request Body:**

```json
{
  "name": "Idli",
  "description": "Idli is one of the most healthiest and popular South Indian breakfast dish.",
  "ingredients": [
    "With Idli Rice",
    "With Idli Rava",
    "Soaking rice and lentils",
    "urad dal"
  ],
  "instructions": "Step by step instructions",
  "recipeImg": "https://res.cloudinary.com/sanket12/image/upload/v1704963820/orgv0s1cvikeyw5wpjp3.jpg",
  "cookingTime": 30,
  "category": "",
  "order": 0,
  "userOwner": "659ed8cb9a560cebea7714f7"
}
```

### **Get Recipe by ID**

**Endpoint:** `GET /recipe/:id`

### **Update Recipe**

**Endpoint:** `PUT /recipe/update/:recipeId`

### **Delete Recipe**

**Endpoint:** `DELETE /recipe/delete/:recipeId`

### **Get Random Recipe**

**Endpoint:** `GET /recipe/random`

### **Save Recipe for User**

**Endpoint:** `PUT /recipe/save`

**Request Body:**

```json
{
  "userId": "userId",
  "recipeId": "recipeId"
}
```

### **Get Saved Recipes**

**Endpoint:** `GET /recipe/savedRecipes/:userId`

---

## Category Routes

### **Get All Categories**

**Endpoint:** `GET /category/`

### **Create Category**

**Endpoint:** `POST /category/create`

**Request Body:**

```json
{
  "name": "category name",
  "order": 0
}
```

### **Get Category by ID**

**Endpoint:** `GET /category/:id`

### **Update Category**

**Endpoint:** `PUT /category/update/:id`

### **Delete Category**

**Endpoint:** `DELETE /category/delete/:id`

---

## Logger API

### **Log Schema**

Logs HTTP method, URL, and timestamp for requests.

---

## Notes

- All secured routes require authentication using JWT.
- Use `Authorization: Bearer <token>` in headers for protected routes.
- Ensure `ACCESS_TOKEN_SECRET` and `ACCESS_TOKEN_EXPIRY` are set in `.env` for JWT authentication.
