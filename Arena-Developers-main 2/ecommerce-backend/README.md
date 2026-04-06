# E-Commerce Backend

A Spring Boot e-commerce backend sample with REST APIs, Spring Data JPA, validation, and basic security.

## Features
- Product catalog with search and filtering
- Category entity relationship
- REST controllers with pagination
- Validation with Jakarta Bean Validation
- Basic Spring Security configuration
- OpenAPI / Swagger documentation support

## Getting Started

### Run locally

1. Open the project in your IDE.
2. Build the project:
   ```bash
   mvn clean package
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. Visit:
   - `http://localhost:8080/api/products`
   - `http://localhost:8080/swagger-ui.html`

## Database
The project uses an in-memory H2 database in development.

## Project Structure
- `src/main/java/com/ecommerce` - Application source
- `src/main/resources/application.properties` - Spring Boot configuration
- `src/test/java/com/ecommerce` - Tests
- `docker-compose.yml` - Docker compose for PostgreSQL

## Notes
This scaffold is designed as a starter backend for a complete e-commerce system. Add additional entities and security flows as required for cart, orders, users, and payment workflows.
