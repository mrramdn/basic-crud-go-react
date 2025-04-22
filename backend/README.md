# Backend (Go)

This is the Go backend for the Inventory App, following Clean Architecture principles.

## Setup

### 1. Create the MySQL Database
Before running the backend, create your MySQL database manually (GORM will create tables, but not the database itself):

```sql
CREATE DATABASE inventory_db;
```

Or use your preferred database name (and match it in the .env file).

### 2. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following content:

```
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_HOST=127.0.0.1:3306
DB_NAME=inventory_db
```

### 3. Install Dependencies
Run this in the `backend` folder:

```
go mod tidy
```

### 4. Start the Backend Server
Run:

```
go run main.go
```

You should see: `Server running at :8080`

### 5. Testing
- The API will be available at `http://localhost:8080/api/items`
- You can use Postman, curl, or the frontend app to test the endpoints.

### Troubleshooting
- If you get an error like `Unknown database 'inventory_db'`, make sure you created the database in MySQL.
- If you get connection errors, check your `.env` values and ensure MySQL is running.

## Structure
- `handlers/` - HTTP layer
- `services/` - Business logic
- `repositories/` - DB access (GORM)
- `models/` - Data structures
- `config/` - Env/config loading

## API
RESTful JSON endpoints for inventory management.

## DB
Uses MySQL. AutoMigrate will bootstrap the schema. Use golang-migrate for versioning.
