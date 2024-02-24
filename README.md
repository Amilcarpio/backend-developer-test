# backend-developer-test

A project to build an API for a job search company. This project uses a serverless environment for the service layer, built with AWS SAM CLI. The API was built in a RESTful architecture.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm.
- You have a Windows/Linux/Mac machine.
- You have Docker and Docker Compose installed.
- You have AWS SAM CLI installed.

## Setting Up the Project

1. Clone the repository to your local machine.
2. Navigate to the project folder.
3. Install the project dependencies with `npm install`.
4. Create a `.env` file in the project root and add the following environment variables:

```
POSTGRES_DB=<your_db>
POSTGRES_USER=<your_user>
POSTGRES_PASSWORD=<your_password>
AWS_ACCESS_KEY_ID=<your_access_key_id>
AWS_SECRET_ACCESS_KEY=<your_secret_access_key>
AWS_REGION=<your_region>
AWS_S3_BUCKET=<your_s3_bucket>
AWS_S3_KEY=<your_s3_key>
```

## Running the Project
To run the project, follow these steps:

1. Build the Docker containers with `docker-compose up --build`.
2. Start the containers with `docker-compose up`.
3. In a separate terminal, enter the "api" container with `sudo docker exec -it api /bin/bash`.
4. Run the tests with `npm run test`.
5. Deploying with AWS SAM
6. To check the Swagger documentation, go to "http://localhost:3000/api-docs".
7. The pattern of AWS Bucket Key is set as "job-list.json". Please, set your own bucket to this pattern.
8. To deploy the application on AWS with SAM, ensure you have AWS SAM CLI installed on your machine. Follow these steps:
   1. Build the application with `sam build`.
   2. Deploy the application with `sam deploy`.
9. After running the server for the first time, be sure to change the `syncDatabase` parameter to false to avoid data loss.

## Contact
If you want to contact me, you can reach me at amilcar.pio@gmail.com.

## License
This project uses the following license: MIT

