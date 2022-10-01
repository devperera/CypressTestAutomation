# Web test automation solution by Cypress
Test automation solution by using Cypress with Cucumber.
Cypress is a modern way of test automation, which is more focused on developing stable automation scripts.
Cucumber is used to write test scenarios, which gives much more clarity to test scenarios.

## How to set up the project
First of all have to install NodeJS, to use this project.
Navigate to [NodeJS Download](https://nodejs.org/en/download/).
Download according to your OS (Windows, Linux, or IOS).
Once it's been downloaded, verify that it's been installed successfully by running the following command in a terminal,

#### _node --version_
This will return the version of the NodeJS, which has been installed.

If you already installed NodeJS.
Then download and save the project to your machine.
Open the terminal from that project saved folder.
Run the following sequence of commands, to step up the project.
##### _npm install cypress --save-dev_
##### _npm install cypress-cucumber-preprocessor --save-dev_

## Cypress test execution UI
In Cypress, the default browser is Electron which is similar to Chrome. It will execute with the Electron browser,
unless you specifically mention the different browser names.
Cypress comes with the test execution UI, to use it run the following command from the terminal.
Select the test case you want to run from the test execution UI.

## Run test cases with Cypress execution UI
Open the terminal and navigate the project folder and type the following command.
#### _npx cypress open_
This will open the UI, and select "E2E Testing" option.
![ExecutionUI001](https://user-images.githubusercontent.com/13979537/193386075-2ae6b130-bd97-465b-81fe-ea6fcad02867.png)
Now select Chrome browser and click on the "Start E2E Testing in Chrome" option.
![ExecutionUI002](https://user-images.githubusercontent.com/13979537/193386098-6a66ee9b-cd65-4683-a955-b0e8055c527b.png)
This will open the specs UI, click on the "VerifyLexusPage".
![ExecutionUI003](https://user-images.githubusercontent.com/13979537/193386107-e67d0816-b31c-47cd-a896-d772ebb0e54c.png)
Test execution UI opens and test execution starts.

## Run test cases from the terminal
1. To run all the test cases from the terminal with headless mode with the Electron browser.
##### _npx cypress run_
2. To run without headless with Electron browser.
##### _npx cypress run --headed_
3. To run a specific browser without headless, Ex; with Chrome browser.
##### _npx cypress run --browser chrome --headed_
4. To run a specific browser with headless, Ex; with Chrome browser.
##### _npx cypress run --browser chrome --headless_
5. To run a specific test case.
##### _npx cypress run --spec "cypress/e2e/Testcases/VerifyLexusPage.feature"_
6. Run a specific test case with a specific browser with headless.
##### _npx cypress run --spec "cypress/e2e/Testcases/VerifyLexusPage.feature" --browser chrome --headless_
7. Run specific test cases with a specific browser without headless.
##### _npx cypress run --spec "cypress/e2e/Testcases/VerifyLexusPage.feature" --browser chrome --headed_

## Run test cases with local Docker
First, navigate to the project through the terminal
Enter the following command to check the Cypress version.
#### _npx cypress --version_
If you get Cypress version as "10.9.0", then run the following command to run the test inside the local Docker
sudo docker run -it -v $PWD:/e2e -w /e2e cypress/included:10.9.0
Note: if you don't have the Docker locally, then this will install first and then execute the test.
      Also run as Admin, if you get permission issue.
![DockerLocal001](https://user-images.githubusercontent.com/13979537/193386376-0c553b70-c14d-4c48-bbdc-f757444eaf93.png)
![DockerLocal002](https://user-images.githubusercontent.com/13979537/193386383-a1293b0e-23ed-4a45-bd9e-9babadc1bdc2.png)

## Report generations
Currently, there is no report were configure, due to following,
Can see the report, when run by the UI executer.
Can see the execution video file as well.

## Cucumber - Feature file
In a test case, the Test scenario will be written in the feature, which is supported by Cucumber.
It gives much clarity to test scenarios. So anyone can read it. Also able to use Cucumber features as well.
![FeatureFile](https://user-images.githubusercontent.com/13979537/193392751-62e604ba-0733-4018-82e2-2cf80303ed1b.png)

## Screenshot on the failure steps
It takes a screenshot of failure steps. Screenshots can be found at "cypress/screenshots".

## Test execution video
By default, Cypress will generate the video of the entire test execution at "cypress/videos"*.

https://user-images.githubusercontent.com/13979537/193412402-63b232c8-dad3-43bb-8034-5cf6f2ddc936.mp4

## Customize the Cypress setting according to your needs
1. First open the Cypress test execution UI.
2. Select the setting tab.
3. Click on the configuration option.
4. Now you can see the Cypress settings
Ex; By default Cypress takes the video output of the test execution.
Can see about the setting here as followed,
video: true
So if you want to turn off that option, open the "cypress.json" file and add a line as followed
"video:false"
