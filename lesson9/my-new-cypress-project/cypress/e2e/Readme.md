SAUCEDEMO PROJECT


ENVIRONMENT SETUP

1.Installing Node.js and npm

If you don't have Cypress installed, first, make sure Node.js and npm are installed.

    # Check Node.js and npm version
    node -v
    npm -v

To install Node.js and npm. Download it from here https://nodejs.org/en

   

2.Installing a Code Editor

We recommend using Visual Studio Code. Download it from here https://code.visualstudio.com/

3.Installing Cypress

Open your terminal and run the following commands:

      # Create a new directory
      mkdir my-new-cypress-project
      cd my-new-cypress-project

      # Initialize a new npm project
      npm init -y

      # Install Cypress
      npm install cypress


TEST EXECUTION

1.The following steps should get you set up for running Selenium tests locally on your machine:

2.Clone repository to your local machine 

3.Open up a terminal and navigate to the root directory of the repository.

4.Open the Cypress Test Runner with the command:

      # Open Cypress Test Runner 
      npx cypress open


TEST REPORTING

JUnit is widely used for CI/CD pipelines. To integrate JUnit, first install the Mocha JUnit reporter:

    # Install Mocha JUnit reporter
    npm install mocha-junit-reporter --save-dev
    
Modify the Cypress configuration to use the JUnit reporter:

    # cypress.json
    {
      "reporter": "mocha-junit-reporter"   //Add it to cypress.config.js
    }
    
Run your tests again and look for the JUnit report file.

     npx cypress run // Command to run tests

Open "test-results.xml" file for results

Or use another type of reports  - Mochawesome. 

TO use it modify the Cypress configuration

    const { defineConfig } = require('cypress')

    module.exports = defineConfig({
    reporter: 'mochawesome',
    })

Run your tests again and look for the JUnit report file.

     npx cypress run // Command to run tests

Open "mochawesome-report" forlder

Open "mochawesome.html" file via Reveal in Finder

Open "mochawesome.html" file in Finder



