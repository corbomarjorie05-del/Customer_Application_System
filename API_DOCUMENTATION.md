# Customer Application System API Reference

Base URL: `http://localhost:3000/api`

## 1. User Authentication

### Register
- **URL**: `/users/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password_hash": "hashed_password",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```
- **Response**: `201 Created`

### Login
- **URL**: `/users/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password_hash": "hashed_password"
  }
  ```
- **Response**: `200 OK` with user data.

---

## 2. Profile Management

### Get Profile
- **URL**: `/users/profile/:user_id`
- **Method**: `GET`
- **Response**: `200 OK` with profile details.

---

## 3. Applications

### Submit Application
- **URL**: `/applications`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "user_id": "uuid",
    "app_type": "Credit Card",
    "data_json": { "details": "additional info" }
  }
  ```
- **Response**: `201 Created`

### Get User Applications
- **URL**: `/applications/:user_id`
- **Method**: `GET`
- **Response**: `200 OK` with list of applications.

### Update Application Status
- **URL**: `/applications/:app_id/status`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "new_status": "approved",
    "changed_by_user_id": "admin_uuid"
  }
  ```
- **Response**: `200 OK`
