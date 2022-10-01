import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import BookTestDrivePage from '../../Pages/BookTestDrivePage';
import LexusHomePage from '../../Pages/LexusHomePage';
import LexusRXPage from '../../Pages/LexusRXPage';

const lexusHomePage = new LexusHomePage();
const lexusRXPage = new LexusRXPage();
const bookATestDrivePage = new BookTestDrivePage();

Given('I navigate to the {string}', (applicationUrl) => {
  lexusHomePage.goToPage(applicationUrl);
});

And('I accept all cookies', () => {
  lexusHomePage.acceptAllCookies();
});

When('I select COVID 19 information option', () => {
  lexusHomePage.scrollSelectCovid19InforLink();
});

Then('I see {string} text available in the page', (textValue) => {
  lexusHomePage.verifyElementText('h1', textValue);
});

When('I select RX Flagship Luxury SUV option', () => {
  lexusHomePage.selectRXSUV();
});

Then('I see RX SUV gallery on the page', () => {
  lexusRXPage.verifyRXGalleryDisplayed();
});

When('I select book a test drive option', () => {
  lexusRXPage.bookATestDrive();
});

When('I enter followings details', (datatable) => {
  datatable.hashes().forEach((element) => {
    bookATestDrivePage.enterFirstName(element.FirstName);
    bookATestDrivePage.enterLastName(element.LastName);
    bookATestDrivePage.enterEmailAddress(element.EmailAddress);
    bookATestDrivePage.enterPhoneNumber(element.PhoneNumber);
    bookATestDrivePage.selectPreferedDate(element.PreferredDate);
    bookATestDrivePage.selectPreferedTime(element.PreferredTime);
    bookATestDrivePage.selectConsultant(element.PreferredSaleConsultant);
    bookATestDrivePage.selectPax(element.NumberOfPax);
  });
});

When('I checked privacy policy check boxes', () => {
  bookATestDrivePage.selectPrivacyPolicy();
});

When('I cheked marketing information check boxes', () => {
  bookATestDrivePage.selectMarketingINformation();
});

Then('I see submit button is enable', () => {
  bookATestDrivePage.submitButtonEnabled();
});
