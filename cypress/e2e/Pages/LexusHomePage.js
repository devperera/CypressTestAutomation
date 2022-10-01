import lexusHomePageElement from '../../fixtures/Locators/LexusHomePageElement.json';
import commonDataValues from '../../fixtures/Data/CommonDataValues.json';

import BasePage from './BasePage';

class LexusHomePage extends BasePage {

  acceptAllCookies() {
    cy.wait(500).get(lexusHomePageElement.acceptAllCookiesElement).click();
  }

  scrollSelectCovid19InforLink() {
    cy.get(lexusHomePageElement.covid19LinkElement)
      .contains(commonDataValues.elementTextValue)
      .scrollIntoView()
      .click();
  }

  selectRXSUV() {
    cy.get(lexusHomePageElement.selectRXSuvElement).scrollIntoView().click();
  }


}

export default LexusHomePage;
