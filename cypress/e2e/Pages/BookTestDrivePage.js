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
    this.scrollToTheElement(bookATestDrivePageElement.modeLabel);
    this.selectElementByAttributeValue(
      bookATestDrivePageElement.testDriveDropDownElement,
      'div[data-value="',
      testDriveValue
    );
  }

  selectLicenseCheckBox() {
   this.scrollAndClick(bookATestDrivePageElement.licenseCheckBox);
  }

  selectTermConditionCheckBox() {
    this.scrollAndClick(bookATestDrivePageElement.termConditionCheckBox);
  }

  selectPrivacyPolicyCheckBox() {
    this.scrollAndClick(bookATestDrivePageElement.privacyPolicyCheckBox);
  }

  selectMarketingInformationCheckBox() {
    this.scrollAndClick(bookATestDrivePageElement.marketingCheckBox);
  }

  selectedTestModel(selectModel) {
    this.verifyElementTextWithExpected(
      bookATestDrivePageElement.testDriveModel,selectModel,
      'Remove item'
    );
  }

  submitButtonIsEnabled() {
    this.elementEnabled(bookATestDrivePageElement.submitButtonElement);
  }
}

export default BookTestDrivePage;
