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

Then('I see {string} banner.', (expectedTextValue) => {
  lexusHomePage.verifyLexusHomePageBannerWithExpected(expectedTextValue);
});

When('I select RX Flagship Luxury SUV option', () => {
  lexusHomePage.selectRXSUV();
});

And('I scroll into gallery', () => {
  lexusRXPage.scrollInToGallery();
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
    bookATestDrivePage.selectCountryCode(element.CountryCode);
    bookATestDrivePage.enterPhoneNumber(element.PhoneNumber);
    bookATestDrivePage.selectPreferedDate(element.PreferredDate);
    bookATestDrivePage.selectPreferedTime(element.PreferredTime);
    bookATestDrivePage.selectConsultant(element.PreferredSaleConsultant);
    bookATestDrivePage.selectPax(element.NumberOfPax);
    bookATestDrivePage.selectTestDriveOption(element.TestDriveOption);
  });
});

When('I checked a driving license checkbox', () => {
  bookATestDrivePage.selectPrivacyPolicyCheckBox();
});

When('I checked a term condition checkbox', () => {
  bookATestDrivePage.selectPrivacyPolicyCheckBox();
});

When('I checked a privacy policy checkbox', () => {
  bookATestDrivePage.selectPrivacyPolicyCheckBox();
});

When('I checked a marketing information checkbox', () => {
  bookATestDrivePage.selectMarketingInformationCheckBox();
});

Then('I see {string} model already selected', (selectModel) => {
  bookATestDrivePage.selectedTestModel(selectModel);
});

Then('I see submit button is enable', () => {
  bookATestDrivePage.submitButtonEnabled();
});
