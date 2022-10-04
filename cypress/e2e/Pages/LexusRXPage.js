import lexusRXPageElement from '../../fixtures/Locators/LexusRXPageElement.json';
import BasePage from './BasePage';

class LexusRXPage extends BasePage {

  scrollInToGallery() {
    this.scrollAndClick(lexusRXPageElement.gallerySectionElement);
  }

  verifyRXGalleryDisplayed() {
    this.elementBeenDisplayed(lexusRXPageElement.rxGalleryElement);
  }

  bookATestDrive() {
    this.scrollAndClick(lexusRXPageElement.bookATestDriveButtonElement);
  }
}

export default LexusRXPage;
