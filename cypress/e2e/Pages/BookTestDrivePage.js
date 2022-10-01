import bookATestDrivePageElement from '../../fixtures/Locators/BookATestDriveElement.json';
import BasePage from './BasePage';

class BookTestDrivePage extends BasePage {
  setInformation(elementValue, enterInformation) {
    cy.wait(500).get(elementValue).click().type(enterInformation);
  }

  enterFirstName(enterFirstName) {
    this.setInformation(bookATestDrivePageElement.firstNameElement, enterFirstName);
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

  enterPhoneNumber(enterPhoneNumber) {
    this.setInformation(
      bookATestDrivePageElement.phoneNumberElement,
      enterPhoneNumber
    );
  }

  selectPreferedDate(informationEntered) {
    cy.wait(500).get(bookATestDrivePageElement.preferredDateElement).click();
    cy.get('[aria-label="' + informationEntered + '"]').click();
  }

  selectElementInformation(element1, element2, selectInformation) {
    cy.wait(500).get(element1).click();
    cy.get(element2).contains(selectInformation).click();
  }

  selectPreferedTime(preferredTime) {
    this.selectElementInformation(
      bookATestDrivePageElement.preferredTimeTextElement,
      bookATestDrivePageElement.preferredTimeSelectElement,
      preferredTime
    );
  }

  selectConsultant(consultantName) {
    this.selectElementInformation(
      bookATestDrivePageElement.saleConsultantTextElement,
      bookATestDrivePageElement.saleConsultantSelectElement,
      consultantName
    );
  }

  selectPax(paxValue) {
    this.selectElementInformation(
      bookATestDrivePageElement.paxTextElement,
      bookATestDrivePageElement.paxSelectElement,
      paxValue
    );
  }

  selectPrivacyPolicy() {
    cy.get(bookATestDrivePageElement.privacyPolicyCheckBox).click();
  }

  selectMarketingINformation() {
    cy.get(bookATestDrivePageElement.marketingCheckBox).click();
  }

  submitButtonEnabled() {
    cy.get(bookATestDrivePageElement.submitButtonElement).should('be.enabled');
  }
}

export default BookTestDrivePage;
