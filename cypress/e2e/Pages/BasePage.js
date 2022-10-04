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

  verifyElementTextWithExpected(elementValue, expectedElementText) {
    cy.get(elementValue).then((actualElementText) => {
      assert.equal(
        actualElementText.text().trim(),
        expectedElementText,
        commonDataValues.elementTextMismatch
      );
    });
  }

  setInformation(elementValue, enterInformation) {
    cy.get(elementValue, {timeout: 10000})
      .click()
      .type(enterInformation);
  }

  selectElementInformation(element1, element2, selectInformation) {
    cy.get(element1, { timeout: 10000 }).click({ force: true });
    cy.wait(500).get(element2, { timeout: 10000 })
      .contains(selectInformation)
      .scrollIntoView()
      .click({ force: true });
  }

  selectElementByAttributeValue(element1, stringAttribute, selectInformation) {
    cy.get(element1, { timeout: 10000 }).click({ force: true });
    cy.wait(500).get(stringAttribute + selectInformation + '"]', { timeout: 10000 })
      .scrollIntoView()
      .click({force: true});
  }

  clickOnElement(element) {
    cy.get(element, { timeout: 10000 }).scrollIntoView().click();
  }
}

export default BasePage;
