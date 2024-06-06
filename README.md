# Project5 - Yoga Application

Fifth project of OpenClassrooms Java/Angular Fullstack Training Course.

The original source code comes from [this repository in the OpenClassrooms Student Center](https://github.com/OpenClassrooms-Student-Center/Testez-une-application-full-stack).

## Development server

### Ressources

#### Postman collection

A Postman collection is available `ressources/postman/yoga.postman_collection.json`

Import can be done by following the documentation: 

https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman

#### MySQL

SQL script for creating the schema is available `ressources/sql/script.sql`

By default the admin user account is:
- login: yoga@studio.com
- password: test!1234

### Global Setup

_Requirements:_
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [OpenJDK8](https://openjdk.org/install/) or [Oracle JDK8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [MySQL Database](https://dev.mysql.com/doc/mysql-getting-started/en/)
- An IDE for Java ([Eclipse](https://eclipseide.org/)/[IntelliJ](https://www.jetbrains.com/idea/download/?section=windows)/etc.)

### Setup DB

TODO

#### Setup Back

TODO

#### Setup Front

TODO

## How to run tests

### Front unit and integration tests

Go to the root of the front app (project5-yoga-app/front) and open a terminal.

If you want to run a single test file:

> npx jest yourfile.ts 

If you want to run all tests:

> npx jest

### Back unit and integration tests

Open your IDE and use maven with the following command to run all tests:

> mvn clean test

You can also create a run configuration on a test class if you only want to run its specific tests.

### Front e2e tests

Go to the root of the front app (project5-yoga-app/front) and open a terminal.

> npm run e2e

Cypress should open and ask you which browser you want to use for your tests.

![Cypress Homepage](ressources/img/cypress1.PNG)

Once chosen, go to the specs menu on the left and then you can select which e2e test you want to run.

![Cypress menus](ressources/img/cypress2.PNG)

## How to generate coverage tests

### Front unit and integration tests

Go to the root of the front app (project5-yoga-app/front) and run the following command in terminal:

> npx jest --coverage

Results should show up in the terminal.

### Back unit and integration tests

Open your IDE and use maven with the following command:

> mvn clean test

You can find the report in the target folder: `target/site/jacoco/index.html` by opening the index.html file in a browser.

### Front e2e tests

Go to the root of the front app (project5-yoga-app/front) and run the following commands in terminal:

> npm run e2e
> npm run e2e:coverage

Results should show up in the terminal.

You can find a more detailed report in the coverage folder `coverage/lcov-report/index.html` by opening the index.html file in a browser.

(_If the coverage results seem low, you can try running e2e tests first through cypress so that the results are correctly updated._)