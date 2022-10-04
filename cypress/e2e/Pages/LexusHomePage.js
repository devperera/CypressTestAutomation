import lexusHomePageElement from '../../fixtures/Locators/LexusHomePageElement.json';
import commonDataValues from '../../fixtures/Data/CommonDataValues.json';

import BasePage from './BasePage';

class LexusHomePage extends BasePage {
  acceptAllCookies() {
    this.clickOn(lexusHomePageElement.acceptAllCookiesElement);
  }

  verifyLexusHomePageBannerWithExpected(expectedTextValue) {
    this.verifyElementTextWithExpected(
      lexusHomePageElement.bannerElement,
      expectedTextValue,''
    );
  }

  selectRXSUV() {
    this.scrollAndClick(lexusHomePageElement.selectRXSuvElement);
  }
}

export default LexusHomePage;
