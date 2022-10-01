# Trax-cypress-web-test-automation

Test automation solution by using Cypress with Cucumber.

Cypress is a modern way of test automation, which is more focused on developing stable automation scripts.

Cucumber is used to write test scenarios, which gives much more clarity for test scenarios.

## How to set up the project

First of all have to install NodeJS, to use this project.

Navigate to [NodeJS Download](https://nodejs.org/en/download/).

Download according to your OS (Windows, Linux, or IOS).

Once it's been downloaded, verify that it's been installed successfully by running the following command in a terminal,

#### _node --version_
This will return the version of the NodeJS, which has been installed.


If you already installed NodeJS.
Then download and save the project into your machine.
Open the terminal from that project saved folder.
Run following sequence of commands, to step up the project.
##### _npm install cypress --save-dev_
##### _npm install cypress-cucumber-preprocessor --save-dev_
##### _npm install mysqljs/mysql --save-dev_

## Cypress test execution UI
In Cypress, the default browser is Electron which is similar to Chrome. It will execute with Electron browser,
unless you specifically mention the different browser names.
Cypress comes with the test execution UI, to use it's run the following command from the terminal.
Select the test case you want to run from the test execution UI.

##### _npx cypress open_
This will open the execution UI. Run specific test cases by selecting from this UI.
![executionUI](https://user-images.githubusercontent.com/89372587/147542294-8977c5d1-9dac-45c3-9391-84e7c8936eb6.png)

## Run test cases from the terminal
1. To run all the test cases from the terminal with headless mode with Electron browser.
##### _npx cypress run_
2. To run without headless with Electron browser.
##### _npx cypress run --headed_
3. To run a specific browser without headless, Ex; with Chrome browser.
##### _npx cypress run --browser chrome --headed_
4. To run a specific browser with headless, Ex; with Chrome browser.
##### _npx cypress run --browser chrome --headless_
5. To run specific test case.
##### _npx cypress run --spec "cypress/e2e/Testcases/VerifyLexusPage.feature"_
6. Run specific test case with specific browser headless.
##### _npx cypress run --spec "cypress/e2e/Testcases/VerifyLexusPage.feature" --browser chrome --headless_
7. Run specific test case with specific browser without headless.
##### _npx cypress run --spec "cypress/e2e/Testcases/VerifyLexusPage.feature" --browser chrome --headed_

## Cypress test execution with local Docker
First navigate to project through the terminal
Enter following command to check Cypress version.
#### _npx cypress --version_
If you get Cypress version as "10.9.0", then run following command to run test inside the local Docker
sudo docker run -it -v $PWD:/e2e -w /e2e cypress/included:10.9.0
Note: if don't have the Docker locally, then this will install first and then execute the test.

## Report generations
Currenlt there is no report were configue, due to following,
Can see the report, when run by UI executer.
Can see the execution video file as well.

## Cucumber - Feature file
In a test case, the Test scenario will be written in the feature, which is supported by Cucumber.
It gives much clarity to test scenarios. So anyone can read it. Also able to use Cucumber features as well.
![feature_file](https://user-images.githubusercontent.com/89372587/147074548-72859c80-6829-489e-b982-72cc75230126.png)

## Test execution video
**By default Cypress will generate the video of the execution at #### _"cypress\videos"_.**

## Customize Cypress setting according to your needs
1. First open the Cypress test execution UI.
2. Select the setting tab.
3. Click on the configuration option.
4. Now you can see the Cypress settings
Ex; By default Cypress takes the video output of the test execution.
Can see about setting here as followed,
video: true
So if you want to turn off that option, open the "cypress.json" file and add a line as followed
"video:false"

