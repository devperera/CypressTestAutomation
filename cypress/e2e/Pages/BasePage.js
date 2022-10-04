import commonDataValues from '../../fixtures/Data/CommonDataValues.json';

class BasePage {
  goToPage(pageUrl) {
    cy.visit(pageUrl);
  }

  scrollToTheElement(cssLocator) {
    cy.get(cssLocator).scrollIntoView();
  }

  elementBeenDisplayed(element) {
    cy.get(element).should('be.visible');
  }

  elementEnabled(element) {
    cy.get(element).should('be.enabled');
  }

  verifyElementTextWithExpected(
    elementValue,
    expectedElementText,
    stringReplace
  ) {
    cy.get(elementValue).then((actualElementText) => {
      actualElementText = actualElementText.text().replace(stringReplace, '');
      assert.equal(
        actualElementText,
        expectedElementText,
        commonDataValues.elementTextMismatch
      );
    });
  }

  setInformation(elementValue, enterInformation) {
    cy.get(elementValue)
      .click()
      .type(enterInformation);
  }

  selectElementInformation(element1, element2, selectInformation) {
    cy.get(element1).click({ force: true });
    cy.get(element2)
      .contains(selectInformation)
      .scrollIntoView()
      .click({ force: true });
  }

  selectElementByAttributeValue(element1, stringAttribute, selectInformation) {
    cy.get(element1).click({ force: true });
    cy.get(stringAttribute + selectInformation + '"]')
      .scrollIntoView()
      .click({ force: true });
  }

  scrollAndClick(element) {
    cy.get(element).scrollIntoView().click({ force: true });
  }

  clickOn(element) {
    cy.get(element).scrollIntoView().click();
  }
}

export default BasePage;
