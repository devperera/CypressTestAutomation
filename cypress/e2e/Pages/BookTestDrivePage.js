import bookATestDrivePageElement from '../../fixtures/Locators/BookATestDriveElement.json';
import BasePage from './BasePage';

class BookTestDrivePage extends BasePage {

  enterFirstName(enterFirstName) {
    this.setInformation(
      bookATestDrivePageElement.firstNameElement,
      enterFirstName
    );
  }

  enterLastName(enterLastName) {
    this.setInformation(
      bookATestDrivePageElement.lastNameElement,
      enterLastName
    );
  }

  enterEmailAddress(enterEmailAddress) {
    this.setInformation(
      bookATestDrivePageElement.emailAddressElement,
      enterEmailAddress
    );
  }

  selectCountryCode(countryCode) {
    this.selectElementInformation(
      bookATestDrivePageElement.countryCodeElement,
      bookATestDrivePageElement.countyList,
      countryCode
    );
  }

  enterPhoneNumber(enterPhoneNumber) {
    this.setInformation(
      bookATestDrivePageElement.phoneNumberElement,
      enterPhoneNumber
    );
  }

  selectPreferedDate(informationEntered) {
    this.selectElementByAttributeValue(
      bookATestDrivePageElement.preferredDateElement,
      '[aria-label="',
      informationEntered
    );
  }

  selectPreferedTime(preferredTime) {
    this.selectElementInformation(
      bookATestDrivePageElement.preferredTimeTextElement,
      bookATestDrivePageElement.preferredTimeSelectElement,
      preferredTime
    );
  }

  selectConsultant(consultantName) {
    if (!consultantName === null) {
      this.selectElementInformation(
        bookATestDrivePageElement.saleConsultantTextElement,
        bookATestDrivePageElement.saleConsultantSelectElement,
        consultantName
      );
    }
  }

  selectPax(paxValue) {
    this.selectElementInformation(
      bookATestDrivePageElement.paxTextElement,
      bookATestDrivePageElement.paxSelectElement,
      paxValue
    );
  }

  selectTestDriveOption(testDriveValue) {
    cy.get(bookATestDrivePageElement.modeLabel).scrollIntoView();
    this.selectElementByAttributeValue(
      bookATestDrivePageElement.testDriveDropDownElement,
      'div[data-value="',
      testDriveValue
    );
  }

  selectLicenseCheckBox() {
   this.clickOnElement(bookATestDrivePageElement.licenseCheckBox);
  }

  selectTermConditionCheckBox() {
    this.clickOnElement(bookATestDrivePageElement.termConditionCheckBox);
  }

  selectPrivacyPolicyCheckBox() {
    this.clickOnElement(bookATestDrivePageElement.privacyPolicyCheckBox);
  }

  selectMarketingInformationCheckBox() {
    this.clickOnElement(bookATestDrivePageElement.marketingCheckBox);
  }

  selectedTestModel(selectModel) {
    cy.get(bookATestDrivePageElement.testDriveModel).contains(selectModel);
  }

  submitButtonIsEnabled() {
    this.elementEnabled(bookATestDrivePageElement.submitButtonElement);
  }
}

export default BookTestDrivePage;
