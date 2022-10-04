import lexusRXPageElement from '../../fixtures/Locators/LexusRXPageElement.json';
import BasePage from './BasePage';

class LexusRXPage extends BasePage {

  scrollInToGallery() {
    cy.get(lexusRXPageElement.gallerySectionElement).scrollIntoView()
  }

  verifyRXGalleryDisplayed() {
    this.elementBeenDisplayed(lexusRXPageElement.rxGalleryElement);
  }

  bookATestDrive() {
    cy.get(lexusRXPageElement.bookATestDriveButtonElement)
      .scrollIntoView()
      .click();
  }
}

export default LexusRXPage;
