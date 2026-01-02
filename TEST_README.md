# Backend Tests

This test suite covers the main functionality of the Express API.

## Test Coverage

### 1. Health Endpoint Test
- **Test**: `/health` endpoint returns successful status and correct message
- **Validates**: The health check endpoint returns a 200 status and the message "API funcionando 🚀"

### 2. Users Endpoint Success Test
- **Test**: `/users` endpoint successfully retrieves and returns users
- **Validates**: 
  - The endpoint returns a 200 status
  - The response contains the expected user data
  - The Prisma `findMany` method is called exactly once

### 3. Users Endpoint Error Handling Test
- **Test**: `/users` endpoint handles database errors
- **Validates**:
  - When the database throws an error, the endpoint returns a 500 status
  - The error response contains the correct error message
  - The error is properly caught and handled

### 4. BigInt Serialization Test
- **Test**: BigInt values are correctly serialized to strings
- **Validates**:
  - BigInt values in the response are converted to strings
  - The JSON response doesn't throw errors when serializing BigInt
  - The serialized values maintain their correct numeric representation

## Running the Tests

```bash
npm test
```

## Test Framework

- **Jest**: Test framework
- **Supertest**: HTTP assertion library for testing Express endpoints
- **ES Modules**: Tests use ES module syntax with Jest's experimental VM modules support

## Notes

- The Prisma client is mocked in tests to avoid database dependencies
- The BigInt.prototype.toJSON override is applied in the test file to match production behavior
- Error console output during tests is expected for the error handling test case
