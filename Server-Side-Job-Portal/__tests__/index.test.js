const request = require("supertest")
const app = require("../app")
const { sequelize, Customer } = require("../models");
const { queryInterface } = sequelize;
const { createToken } = require("../helpers/jwt");



let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwNDI4MTg0fQ.e0njSJVjZp5-gIW_cB3Rq-PpMJX0Pq68XxRxSQHuvTk"
let invalidToken;

const userTest1 = {
    email: "bondanherutomo35@gmail.com",
    password: "bondan123",
};

const userTest2 = {
    email: "bondanherutomo35@gmail.com",
    password: "bonsasdkla21123",
};

// beforeAll(async () => {
//     try {
//         const registeredUser1 = await Customer.create(userTest1);
//         validToken = createToken({
//             id: registeredUser1.id,
//             email: registeredUser1.email,
//         });

//         const registeredUser2 = await Customer.create(userTest2);
//         invalidToken = createToken({
//             id: registeredUser2.id,
//             email: registeredUser2.email,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });




describe("POST /pub/users/register", () => {
    describe("Sukses Case", () => {
        it("should create new customer and response with status code 201", async () => {
            const bodyData = {
                email: "bondaa12@gmail.com",
                password: "bondan",
                role: "Customer",
            };

            const response = await request(app).post("/pub/users/register").send(bodyData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id", expect.any(Number));
            expect(response.body).toHaveProperty("email", bodyData.email);
            expect(response.body).toHaveProperty("role", bodyData.role);

        });
    });

    //kalo gagal
    describe("Failed Case", () => {
        //email not empty
        it("should failed to create new customer because email empty", async () => {
            const bodyData = {
                email: "",
                password: "bondan",
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Email can not be empty");
        })


        //email not null
        it("should failed to create new customer because email null", async () => {
            const bodyData = {
                email: null,
                password: "bondan",
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Email can not be null");
        })

        //email not valid
        it("should failed to create new customer because email not valid", async () => {
            const bodyData = {
                email: "bondan@gmail",
                password: "bondan",
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Please enter a valid email address");
        })

        //email already in use
        it("should failed to create new customer because email already in use", async () => {
            const bodyData = {
                email: "bondan35@gmail.com",
                password: "bondan",
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Email address already in use!");
        })

        //password not empty
        it("should failed to create new customer because password empty", async () => {
            const bodyData = {
                email: "bondanherutomo35@gmail.com",
                password: "",
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Password can not be empty");
        })

        //password not null
        it("should failed to create new customer because password null", async () => {
            const bodyData = {
                email: "bondanherutomo35@gmail.com",
                password: null,
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Password can not be null");
        })

        //password must be at least 5 characters
        it("should failed to create new customer because password must be at least 5 characters", async () => {
            const bodyData = {
                email: "bondanherutomo35@gmail.com",
                password: "abc",
                role: "Customer",
            };
            const response = await request(app).post("/pub/users/register").send(bodyData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Password must be at least 5 characters long");
        })
    })
})

describe("POST pub/users/login", () => {
    describe("Successful customer login", () => {
        it("should login customer and respond with status code 200 and access token", async () => {
            const bodyData = {
                email: "bondan35@gmail.com",
                password: "bondan"
            };

            // Act
            const response = await request(app).post("/pub/users/login").send(bodyData);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("access_token");
            expect(response.body).toHaveProperty("email", bodyData.email);
        });
    });


    describe("Failed customer login", () => {

        //email_required
        it("should failed to login because email is required", async () => {
            const bodyData = {
                email: "",
                password: "bondan"
            };
            // Act
            const response = await request(app).post("/pub/users/login").send(bodyData);
            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "email is required");
        });


        //password_required
        it("should failed to login because password is required", async () => {
            const bodyData = {
                email: "bondanherutomo35@gmail.com",
                password: ""
            };
            // Act
            const response = await request(app).post("/pub/users/login").send(bodyData);
            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "password is required");
        });


        //invalid email/password
        it("should failed to login because password is invalid email/password", async () => {
            const bodyData = {
                email: "bondanherutomo35@gmail.com",
                password: "nnnnnsnsns"
            };
            // Act
            const response = await request(app).post("/pub/users/login").send(bodyData);
            // Assert
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "invalid_email/password");
        });

        it("should failed to login because invalid email/password", async () => {
            const bodyData = {
                email: "bo@gmail.com",
                password: "bondan"
            };
            // Act
            const response = await request(app).post("/pub/users/login").send(bodyData);
            // Assert
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "invalid_email/password");
        });
    });

});


describe("Successful customer login", () => {
    it("should login customer and respond with status code 200 and access token", async () => {
        const bodyData = {
            email: "bondan35@gmail.com",
            password: "bondan"
        };

        // Act
        const response = await request(app).post("/pub/users/login").send(bodyData);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("access_token");
        expect(response.body).toHaveProperty("email", bodyData.email);
    });
});



describe("test GET /pub/jobs", () => {
    test('GET /pub/jobs - 200 - empty query without pagination', async () => {
        const response = await request(app).get('/pub/jobs');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ "jobs": [], "totalPages": 0 });
    });










    // test("GET /pub/movies - 200 - filter query", async () => {
    //     const response = await request(app)

    //         .get("/pub/movies?genres=horror")

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty("count")
    //     expect(response.body).toHaveProperty("rows")

    // })

    // test("GET /pub/movies - 200 - with pagination", async () => {
    //     const response = await request(app)

    //         .get("/pub/movies?page=2")

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty("count")
    //     expect(response.body).toHaveProperty("rows")

    // })

    // test("GET /pub/movies/:id - 200 - movies detail", async () => {
    //     const response = await request(app)

    //         .get("/pub/movies/1")

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty("movie")

    // })

    // test("GET /pub/movies/:id - 404 - id not found", async () => {
    //     const response = await request(app)

    //         .get("/pub/movies/500")

    //     expect(response.status).toBe(404)
    //     expect(response.body).toHaveProperty("message", "id not found")

    // })
})



//  GET /pub/bookmarks/:id FAILED
describe("Failed Get Bookmark", () => {

    it('GET /pub/bookmarks/:id - 401 - with invalid token', async () => {
        const response = await request(app)
            .get('/pub/bookmarks/1')
            .set('Authorization', 'Bearer invalid_token');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    });


    // BOOKMARK WITHOUT TOKEN , GET BOOKMARK BY USER ID FAILED

    it('GET /pub/bookmarks/:id - 401 - without token', async () => {
        const response = await request(app)
            .get('/pub/bookmarks/1')
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    });

});

describe("Succes Get Bookmark", () => {

    it('GET /pub/bookmarks/:id - 200', async () => {
        const userId = 1; // ganti dengan user id yang valid
        const response = await request(app)
            .get(`/pub/bookmarks/${userId}`)
            .set('Authorization', `Bearer ${validToken}`); // ganti dengan access token yang valid

        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBe(true);

        if (body.length > 0) {
            expect(body[0]).toHaveProperty('Job');
        }
    });




    // BOOKMARK WITHOUT TOKEN , GET BOOKMARK BY USER ID FAILED

    // it('GET /pub/bookmarks/:id - 200 ', async () => {
    //     const response = await request(app)
    //         .get('/pub/bookmarks/1')
    //     expect(response.status).toBe(401);
    //     expect(response.body).toHaveProperty("message", "Invalid Token");
    // });

});