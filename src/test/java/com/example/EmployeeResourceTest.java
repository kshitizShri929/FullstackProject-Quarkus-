// package com.example;

// import io.quarkus.test.junit.QuarkusTest;
// import org.junit.jupiter.api.Test;

// import static io.restassured.RestAssured.given;
// import static org.hamcrest.CoreMatchers.is;

// @QuarkusTest
// class EmployeeResourceTest {
//     @Test
//     void testHelloEndpoint() {
//         given()
//           .when().get("/employees")
//           .then()
//              .statusCode(200)
//              .body(is("Hello from Quarkus REST"));
//     }

// }