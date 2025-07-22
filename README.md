# ReservApp - Spring Boot Application

A Spring Boot application for managing products with REST API endpoints.

## Features

- REST API for product management
- MySQL database integration
- JPA/Hibernate for data persistence
- Lombok for reducing boilerplate code
- Maven for dependency management

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reservapp
   ```

2. **Configure MySQL Database**
   - Create a MySQL database named `reservapp`
   - Update the database credentials in `src/main/resources/application.properties`:
     ```properties
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products/{id}` - Get product by ID
- **POST** `/api/products` - Create a new product
- **DELETE** `/api/products/{id}` - Delete a product by ID

### Product JSON Structure

```json
{
  "nombre": "Product Name",
  "descripcion": "Product description",
  "tipo": "Product type",
  "imagenes": ["image1.jpg", "image2.jpg"]
}
```

## Project Structure

```
src/main/java/com/reservapp/
├── ReservappApplication.java      # Main application class
├── controller/
│   └── ProductController.java     # REST controller
├── entity/
│   └── Product.java              # JPA entity
├── repository/
│   └── ProductRepository.java    # Data access layer
└── service/
    └── ProductService.java       # Business logic layer
```

## Technologies Used

- Spring Boot 3.2.0
- Spring Data JPA
- MySQL Connector
- Lombok
- Maven 