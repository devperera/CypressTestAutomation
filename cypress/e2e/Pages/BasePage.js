import commonDataValues from '../../fixtures/Data/CommonDataValues.json';

class BasePage {
  goToPage(pageUrl) {
    cy.visit(pageUrl);
  }

  verifyElementText(elementValue, expectedElementText) {
    cy.get(elementValue).then((actualElementText) => {
      assert.equal(
        actualElementText.text().trim(),
        expectedElementText,commonDataValues.elementTextMismatch
      );
    });
  }

  scrollToTheElement(cssLocator) {
    cy.get(cssLocator).scrollIntoView();
  }

  elementBeenDisplayed(element) {
    cy.get(element).should('be.visible');
  }
}

export default BasePage;
