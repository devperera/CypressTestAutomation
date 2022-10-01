import mobileReportPageElement from '../../../fixtures/Locators/mobileReportPageElement.json';
import globalElements from '../../../fixtures/Locators/globalElements.json'
import BasePage from '../basePage';
import mobileReportQueries from '../../../fixtures/Queries/mobileReportQueries.js';
import testData from '../../../fixtures/Data/mobileReportTestData.json';
import mobileReportConstants from '../../../fixtures/Constants/mobileReportConstants.json';
import { recurse } from 'cypress-recurse';

const moment = require('moment');

class MobileReportPage extends BasePage {
  getMobileReportTitleByTitle(pageTitle) {
    return cy
      .contains(mobileReportPageElement.pageTitle, pageTitle)
      .scrollIntoView();
  }

  getGraphElement(graphName) {
    return cy
      .contains(mobileReportPageElement.graphElement, graphName)
      .scrollIntoView();
  }

  getActionsElement() {
    return cy.get(mobileReportPageElement.actionButton).scrollIntoView();
  }

  getOptionElement() {
    return cy.get(mobileReportPageElement.optionElement).scrollIntoView();
  }

  openMenu() {
    this.getOptionElement().click()
  }

  getMenuOptionItems() {
    return cy.get(mobileReportPageElement.optionItems);
  }

  validateFullReportMenu() { 
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.images).should('be.visible');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.recent).should('be.visible');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.live).should('not.exist');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.full).should('not.exist');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.survey).should('not.exist');
  }

  validateLiveOnlyReportMenu() { 
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.images).should('be.visible');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.recent).should('be.visible');
  }

  validateLiveFirstFullReportMenu() { 
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.images).should('be.visible');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.recent).should('be.visible');
  }

  validateLiveFirstLiveReportMenu() { 
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.images).should('be.visible');
    this.getMenuOptionItems().contains(mobileReportConstants.menuOption.recent).should('be.visible');
  }

  selectViewImagesOption() {
    this.getOptionElement()
      .click()
      .get(mobileReportPageElement.viewImageOption)
      .click();
  }

  selectRecentVisitsOption() {
    this.getOptionElement()
      .click()
      .get(mobileReportPageElement.recentVisitOption)
      .click();
  }

  selectGraphElement(graphName) {
    this.getGraphElement(graphName).click();
  }

  selectActionsButton() {
    this.getActionsElement().click();
  }

  getReportElement(elementText) {
    return cy
      .contains(mobileReportPageElement.clickableElement, elementText)
      .scrollIntoView();
  }

  getBackButtonElement() {
    return cy.get(mobileReportPageElement.backButtonElement);
  }

  getBackButtonElementInView() {
    return this.getBackButtonElement()
      .last()
      .scrollIntoView();
  }

  getReportButton() {
    return cy.get(mobileReportPageElement.reportButton);
  }

  getReportButtonInView() {
    return this.getReportButton()
      .last()
      .scrollIntoView();
  }

  getCategoryTitles() {
    return cy.get(mobileReportPageElement.categoryTitles);
  }

  selectCategoryByName(categoryName) {
    this.getCategoryTitles()
      .contains(categoryName)
      .click();
  }

  getCategoryDetailsElementByCategoryName(categoryName) {
    return cy.contains(categoryName)
      .parents(mobileReportPageElement.categoryElement)
      .find(mobileReportPageElement.categoryDetails);      
  }

  clickOnCategoryDetailsElementByCategoryName(categoryName) {
    this.getCategoryDetailsElementByCategoryName(categoryName)
      .should('be.visible')
      .click();
  }
  
  openCategoryPage(categoryName) {
    this.selectCategoryByName(categoryName);
    this.clickOnCategoryDetailsElementByCategoryName(categoryName);
  }

  validateCategoryPageHeader(categoryName) {
    this.getPageTitleElement()
      .should('be.visible')
      .and('contain', categoryName);
    this.getBackButtonElement().should('be.visible');
    this.getOptionElement().should('be.visible');
    this.getReportButton().should('be.visible');
    this.getPopupHeader().should('not.exist');
  }

  waitForCarouselsToAppear() {
    recurse(
      () => this.getCarousels(),
      (carousels) => carousels.length !== 0,
      {
        delay: 1000
      }
    )
    .then( carousels => {
      cy.wrap(carousels).should('be.visible');
    });
  }

  getCarousels() {
    return cy.get(mobileReportPageElement.mobRepCarousels);
  }

  validateNumberOfCarousels(expectedNumber) {
    this.getCarousels()
      .should('be.visible')
      .its('length').should('equal', expectedNumber);
  }

  validateGridPresence() {
    cy.get(mobileReportPageElement.mobRepContentTables)
      .its('length').should('equal', 1);
  }

  defineExpectedCategoryPageCarouselData(carouselIndex) {
    switch(carouselIndex) {
      case 0:
        return {"name": "facingsSOS",
                "color": testData.mobRepFlow.colors.graphs.green,
                "kpiLevel2Value": 1,
                "columns": testData.mobRepFlow.categoryGridColumnOrder.shelfShare};
      case 1:
        return {"name": "linearSOS",
                "color": testData.mobRepFlow.colors.graphs.yellow,
                "kpiLevel2Value": 12};
      case 2:
        return {"name": "oos",
                "color": testData.mobRepFlow.colors.graphs.blue,
                "kpiLevel2Value": 107,
                "columns": testData.mobRepFlow.categoryGridColumnOrder.oosDistribution};
      case 3:
        return {"name": "productPresence",
                "color": testData.mobRepFlow.colors.graphs.red,
                "kpiLevel2Value": 108,
                "columns": testData.mobRepFlow.categoryGridColumnOrder.oosDistribution};
      default:
        expect(carouselIndex).to.be.within(0,3);
    }
  }

  getCarousel(carouselIndex) {
    return this.getCarousels()
      .eq(carouselIndex);
  }

  isCarouselIndexValid(carouselIndex) {
    expect(carouselIndex).to.be.within(0,3);
  }

  selectCarousel(carouselIndex) {
    return this.getCarousel(carouselIndex).click();
  }

  tofixFloat(score) {
    if (score === parseInt(score, 10)) {
      return (score);
    } else {
      return (parseFloat(score).toFixed(2));
    }
  }

  toPercentage(score, unit) {
    const percentage = parseFloat(score * 100);
    return (this.tofixFloat(percentage) + unit);
  }

  scoreFormatter(score, unit) {
    if (score === null) {
      return '0.00';
    } else {
      return this.toPercentage(score, unit);
    }
  }

  getCarouselScoreElement(carouselIndex) {
    return this.getCarousel(carouselIndex).find(mobileReportPageElement.scoreValues, { timeout: 10000 });
  }

  validateScoreValueIsLoaded() {
   return this.getCarouselScoreElement(0)
      .then( score => {
        cy.wrap(score).find('text').invoke('text')
          .then( actualScore => {
            cy.wrap(score).find('title').invoke('text')
              .then( finalScore => {
                if (actualScore.replace('pt.', '') === finalScore || actualScore.replace('%', '') === finalScore) {
                  return true;
                } else {
                  return false;
                }
              });
          });
      });
  }

  waitForScoreToBecomeFinal() {
    this.waitForCarouselsToAppear();
    this.getCarouselScoreElement(0).should('be.visible');
    recurse(
      () => this.validateScoreValueIsLoaded(),
      (result) => result === true,
      {
        delay: 1000
      }
    )
  }

  validateCarouselScoreValue(carouselIndex, score, unit) {
    this.getCarouselScoreElement(carouselIndex, { timeout:5000 }).should('contain', this.scoreFormatter(score, unit));
  }

  getCarouselTargetElement(carouselIndex) {
    return this.getCarousel(carouselIndex).find(mobileReportPageElement.targetValues);
  }

  validateCarouselTargetValue(carouselIndex, target, unit) {
    if (target !== null) {
      this.getCarouselTargetElement(carouselIndex).should('exist');
      this.getCarouselTargetElement(carouselIndex).should('contain', 'Target ' + this.scoreFormatter(target, unit));
    } else {
      this.getCarouselTargetElement(carouselIndex).should('not.exist');
    }
  }

  getCarouselScoreDeltaElement(carouselIndex) {
    return this.getCarousel(carouselIndex)
      .find(mobileReportPageElement.graphElement)
      .last();
  }

  getKpiResultsBySessionKpiDenominatorOwnManFromDb(sessionPk, kpiLevel2Fk, denominatorId) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKpiResultsBySessionKpiDenominatorOwnMan, values: [sessionPk, kpiLevel2Fk, denominatorId]});
  }

  getKpiResultsBySessionKpiDenominatorOwnManProductsFromDb(sessionPk, kpiLevel2Fk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKpiResultsBySessionKpiDenominatorOwnManProducts, values: [sessionPk, kpiLevel2Fk, testData.mobRepFlow.energyCategoryPk]});
  }

  getScoreValueFromDb(sessionPk, kpiLevel2Fk, denominatorId) {
    return this.getKpiResultsBySessionKpiDenominatorOwnManFromDb(sessionPk, kpiLevel2Fk, denominatorId)
      .then( kpiLevel2Data => {
        expect(kpiLevel2Data.length).to.not.be.greaterThan(1);
        if(kpiLevel2Data.length === 1) {
          return kpiLevel2Data[0].result;
        } else {
          return null;
        }
      });
  }

  calculateExpectedCarouselScoreDeltaValue(currentSessionPk, prevSessionPk, kpiLevel2Fk, denominatorId) {
    return this.getScoreValueFromDb(currentSessionPk, kpiLevel2Fk, denominatorId)
      .then( curScoreValue => {
        this.getScoreValueFromDb(prevSessionPk, kpiLevel2Fk, denominatorId)
          .then( prevScoreValue => {
            if (prevScoreValue === null) {
              return '----';
            } else {
              return this.toPercentage(curScoreValue - prevScoreValue, '%');
            }
          }).then( expectedDelta => {
            if (expectedDelta !== '0%') {
              if (expectedDelta.charAt(0) !== '-') {
                return ('+' + expectedDelta);
              }
            }
          });
      });
  }

  validateCarouselScoreDeltaValue(sessionPk, prevSessionPk, carouselIndex, kpiLevel2Fk, denominatorId) {
    this.calculateExpectedCarouselScoreDeltaValue(sessionPk, prevSessionPk, kpiLevel2Fk, denominatorId)
      .then( expectedDelta => {
        this.getCarouselScoreDeltaElement(carouselIndex)
          .then( scoreDelta => {
            cy.wrap(scoreDelta).should('contain', expectedDelta);
          });
      });
  }

  validateCarouselColor(carouselIndex, color) {
    this.getCarousel(carouselIndex)
      .find('path')
      .eq(1)
      .invoke('attr','style')
      .then( carouselStyle => {
        cy.wrap(carouselStyle
          .replace(/fill: /, '')
          .replace(/;/, ''))
          .should('equal', color);
      });
  }

  validateCarouselCaption(carouselIndex, name) {
    this.getTranslations()
      .then( translation => {
        this.getCarousel(carouselIndex)
          .find(mobileReportPageElement.graphElement)
          .first()
          .should('contain', JSON.parse(translation).mobileReports.reportsNames[name]);
      });
  }

  validateCategoryPageCarousel(carouselIndex) { 
    this.isCarouselIndexValid(carouselIndex);
    this.getKpiResultsBySessionKpiDenominatorOwnManFromDb(testData.mobRepFlow.sessionPk, this.defineExpectedCategoryPageCarouselData(carouselIndex).kpiLevel2Value, testData.mobRepFlow.energyCategoryPk)
      .then( kpiLevel2Data => {
        this.validateCarouselScoreValue(carouselIndex, kpiLevel2Data[0].result, '%');
        this.validateCarouselTargetValue(carouselIndex, kpiLevel2Data[0].target, '%');
        this.validateCarouselScoreDeltaValue(testData.mobRepFlow.sessionPk, testData.mobRepFlow.prevSessionPk, carouselIndex, this.defineExpectedCategoryPageCarouselData(carouselIndex).kpiLevel2Value, testData.mobRepFlow.energyCategoryPk);
        this.validateCarouselColor(carouselIndex, this.defineExpectedCategoryPageCarouselData(carouselIndex).color);
        this.validateCarouselCaption(carouselIndex, this.defineExpectedCategoryPageCarouselData(carouselIndex).name);
      });
  }

  validateEveryCategoryPageCarousel() {
    this.getCarousels()
      .each( (element, carouselIndex) => {
          this.validateCategoryPageCarousel(carouselIndex);
      });
  }

  getUpperLevelKpiFromDb(carouselIndex) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKPIsConfig, values: ['category report', 'upper level kpi', this.defineExpectedCategoryPageCarouselData(carouselIndex).kpiLevel2Value]});
  }

  getGridKpiFromDb(upperLevelKpiLevel2Fk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKPIsConfigByParent, values: [upperLevelKpiLevel2Fk]});
  }

  getGridColumnsFromDb(report_template_fk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getCustomTableColumns, values: [report_template_fk]});
  }

  getProductByPkIncludingDeletedFromDb(productPk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getProductByPkIncludingDeleted, values: [productPk]});
  }

  getExpectedKpiLevel2ResultsByProductsFromDb(sessionPk, carouselIndex) {
    return this.getUpperLevelKpiFromDb(carouselIndex)
      .then( upperLevelKpi => {
        this.getGridKpiFromDb(upperLevelKpi[0].pk).as('gridKpiFromDb')
          .then( gridKpiFk => {
            this.getKpiResultsBySessionKpiDenominatorOwnManProductsFromDb(sessionPk, gridKpiFk[0].kpi_level_2_fk);
          });
      });
  }

  getExpectedProductDataFromDb(sessionPk, carouselIndex) {
    let productData = [];
    return this.getExpectedKpiLevel2ResultsByProductsFromDb(sessionPk, carouselIndex)
      .each( kpiLevel2Result => {
          this.getProductByPkIncludingDeletedFromDb(kpiLevel2Result.numerator_id)
            .then( products => {
              return productData.push({name: products[0].name, result: kpiLevel2Result.result, prodFk: kpiLevel2Result.numerator_id});
            });
      }).then( () => {
          return productData;
      });
  }

  getGridRows() {
    return cy.get(mobileReportPageElement.gridLines);
  }

  validateGridRowCount() {
    cy.get('@expectedCurrentProductData')
      .then( products => {
        this.getGridRows().its('length').should('equal',products.length);
      });
  }

  getGridColumns() {
    return cy.get(mobileReportPageElement.gridColumnNames);
  }

  getExpectedGridColumnDataFromDb(carouselIndex) {
    return this.getUpperLevelKpiFromDb(carouselIndex)
      .then( upperLevelKpi => {
        this.getGridColumnsFromDb(upperLevelKpi[0].custom_templates_fk);
      });
  }

  validateGridColumnNames(carouselIndex) {
    this.getExpectedGridColumnDataFromDb(carouselIndex)
      .then( gridColumnsDb => {
        this.getGridColumns()
          .each( (column, index) => {
            cy.wrap(column).should('contain', gridColumnsDb[index].column_name);
          });
      });
  }

  validateGridActualValue(column, productData) {
    return cy.get('@rowCells')
      .eq(column)
      .should('contain', this.tofixFloat(productData.result) + '$');
  }

  validateGridScoreValue(column, productData) {
    return cy.get('@rowCells')
      .eq(column)
      .should('contain', this.tofixFloat(productData.result) + '%');
  }

  defineTextColorBasedOnScoreValue(scoreValue) {
    switch(true) {
      case (0 < scoreValue && scoreValue <= 0.33):
        return testData.mobRepFlow.colors.text.red;
      case (0.34 <= scoreValue && scoreValue <= 0.66):
        return testData.mobRepFlow.colors.text.yellow;
      case (0.67 <= scoreValue && scoreValue <= 0.98):
        return testData.mobRepFlow.colors.text.blue;
      case (0.99 <= scoreValue && scoreValue <= 1):
        return testData.mobRepFlow.colors.text.green;
      default:
        return false;
    }
  }

  getExpectedScoreTextColor(column) {
    return cy.get('@rowCells')
      .eq(column)
      .find(mobileReportPageElement.gridText)
      .invoke('prop', 'textContent')
      .then( scoreText => {
        return this.defineTextColorBasedOnScoreValue(Number(scoreText.replace('%', '')));
      });
  }

  getGridCellStyle(column) {
    return cy.get('@rowCells')
      .eq(column)
      .find(mobileReportPageElement.gridText)
      .invoke('attr', 'style');
  }

  hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }

  getRGBColorFromStyle(attribute) {
    if (attribute.includes("#")) {
      return this.hexToRgb(/.*color: ([^;]*)/.exec(attribute)[1]);
    } else {
      return /.*color: ([^;]*)/.exec(attribute)[1];
    }
  }

  transformGridScoreTextColor(column) {
    return this.getGridCellStyle(column)
      .then( style => {
        return this.getRGBColorFromStyle(style);
      });
  }

  validateGridScoreTextColor(column) {
    this.transformGridScoreTextColor(column)
      .then( actualTextColor => {
        this.getExpectedScoreTextColor(column)
          .then( expectedTextColor => {
            expect(actualTextColor).to.equal(expectedTextColor);
          });
      });
  }

  getKPIResultsBySessionKPINumeratorFromDb(sessionPk, kpiLevel2Fk, numeratorId) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKPIResultsBySessionKPINumerator, values: [sessionPk, kpiLevel2Fk, numeratorId]});
  }

  calculateGridDeltaValue(productData) {
    return cy.get('@gridKpiFromDb')
      .then( gridKpiFromDb => {
        this.getKPIResultsBySessionKPINumeratorFromDb(testData.mobRepFlow.sessionPk, gridKpiFromDb[0].kpi_level_2_fk, productData.prodFk)
          .then( currentResults => {
            expect(currentResults.length).not.to.be.greaterThan(1);
            this.getKPIResultsBySessionKPINumeratorFromDb(testData.mobRepFlow.prevSessionPk, gridKpiFromDb[0].kpi_level_2_fk, productData.prodFk)
              .then( previousResults => {
                expect(previousResults.length).not.to.be.greaterThan(1);
                if (previousResults.length === 0) {
                  return '';
                } else {
                  return this.tofixFloat(currentResults[0].result - previousResults[0].result) + 'pt';
                }
              });
          });
      });
  }

  validateGridDeltaValue(column, productData) {
    return cy.get('@rowCells')
      .then( rowCells => {
        this.calculateGridDeltaValue(productData)
        .then( expectedDelta => {
          cy.wrap(rowCells[column]).should('contain', expectedDelta);
        });
      });
  }

  validateShelfShareCellData(productData) {
    let skuMatch;
    
    this.getGridRows()
      .each( rowElement => {
        cy.wrap(rowElement)
          .find(mobileReportPageElement.gridCell).as('rowCells')
          .eq(testData.mobRepFlow.categoryGridColumnOrder.shelfShare.brandVariantSize)
          .invoke('prop', 'textContent')
          .then( firstColumnText => {
            if (firstColumnText.trim() === productData.name) {
              skuMatch = true;
              this.validateGridActualValue(testData.mobRepFlow.categoryGridColumnOrder.shelfShare.actual, productData);
              this.validateGridScoreValue(testData.mobRepFlow.categoryGridColumnOrder.shelfShare.score, productData);
              this.validateGridScoreTextColor(testData.mobRepFlow.categoryGridColumnOrder.shelfShare.score);
              this.validateGridDeltaValue(testData.mobRepFlow.categoryGridColumnOrder.shelfShare.delta, productData);
            }
          });
      }).then( ()=> {
        expect(skuMatch).to.equal(true);
      });
  }

  validateShelfShareGrid() {  
    cy.get('@expectedCurrentProductData')
      .each( currentProductData => {
        this.validateShelfShareCellData(currentProductData);
      });
  }

  expectedDistributionResult(result) {
    switch(result) {
      case 1:
        return "OOS";
      case 2:
        return "DISTRIBUTED";
      case 3:
        return "EXTRA";
      default:
        expect(result).to.be.within(1,3);
    }
  }

  validateGridProductPresenceValue(column, productData) {
    return cy.get('@rowCells')
      .eq(column)
      .find(globalElements.traxIcon)
      .invoke('attr', 'data-cy')
      .should('equal', this.expectedDistributionResult(productData.result));
  }

  validateOosDistributionCellData(currentProductData, previousProductData) {
    let skuMatch;

    this.getGridRows()
      .each( rowElement => {
        cy.wrap(rowElement)
          .find(mobileReportPageElement.gridCell).as('rowCells')
          .eq(testData.mobRepFlow.categoryGridColumnOrder.oosDistribution.skus)
          .invoke('prop', 'textContent')
          .then( firstColumnText => {
            if (firstColumnText.trim() === currentProductData.name) {
              skuMatch = true;
              this.validateGridProductPresenceValue(testData.mobRepFlow.categoryGridColumnOrder.oosDistribution.current, currentProductData);
              this.validateGridProductPresenceValue(testData.mobRepFlow.categoryGridColumnOrder.oosDistribution.previous, previousProductData);
            }
          });
      })
      .then( ()=> {
        expect(skuMatch).to.equal(true);
      });
  }

  validateOosDistributionGrid() {  
    cy.get('@expectedCurrentProductData')
      .then( expectedCurrentProductData => {
        cy.get('@expectedPreviousProductData')
          .then( expectedPreviousProductData => {
            cy.wrap(expectedCurrentProductData)
              .each( (currentProductData, index) => {
                this.validateOosDistributionCellData(currentProductData, expectedPreviousProductData[index]);
              });
          });
      });
  }

  validateNoDataGrid() {
    cy.get(mobileReportPageElement.noDataGrid).should('contain', testData.mobRepFlow.noData);
  }

  validateGrid(carouselIndex) {
    this.isCarouselIndexValid(carouselIndex);
    this.selectCarousel(carouselIndex)
      .then( () => {
        if (carouselIndex !== 1) {
          this.getExpectedProductDataFromDb(testData.mobRepFlow.sessionPk, carouselIndex).as('expectedCurrentProductData');
          this.getExpectedProductDataFromDb(testData.mobRepFlow.prevSessionPk, carouselIndex).as('expectedPreviousProductData');
          this.validateGridRowCount();
          this.validateGridColumnNames(carouselIndex);
          if (carouselIndex === 0) {
            this.validateShelfShareGrid()
          } else {
            this.validateOosDistributionGrid();
          }
        } else {
          this.validateNoDataGrid();
        }
      });
  }

  selectProductFromGridByProductName(column, currentProductDataName) {
    this.getGridRows()
      .each( rowElement => {
        cy.wrap(rowElement)
          .find(mobileReportPageElement.gridCell)
          .then( rowCells => {
            cy.wrap(rowCells[column])
              .invoke('prop', 'textContent')
              .then( firstColumnText => {
                if (firstColumnText.trim() === currentProductDataName) {
                  cy.wrap(rowCells[column]).click();
                }
              });
          });
      });
  }

  getProductImageFromDb(productPk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getProductImage, values: [productPk]});
  }

  validateProductImage() {
    cy.get('@productData')
      .then( productData => {
        this.getProductImageFromDb(productData[0].pk)
          .then( imageDataFromDb => {
            cy.get(mobileReportPageElement.productImage, { timeout: 5000})
              .should('be.visible')
              .invoke('attr', 'src')
              .should('contain', imageDataFromDb[0].image_path);
          });
      });
  }

  validateNonEmptyBarCode() {
    cy.get(mobileReportPageElement.productBarcode)
      .invoke('attr', 'src')
      .should('not.be.empty');
  }

  getBrandByPkIncludingDeletedFromDb(brandPk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getBrandByPkIncludingDeleted, values: [brandPk]});
  }

  defineExpectedProductDetailIconsAndTitles(type) {
    switch(type) {
      case "brand": 
        return {"dataSection": 0,
          "icon": "trax-icons-brand",
          "title": "Brand"};
      case "category":
        return {"dataSection": 1,
          "icon": "trax-icons-category",
          "title": "Category"};
      case "ean":
        return {"dataSection": 2,
          "icon": "trax-icons-e-a-n-code",
          "title": "EAN code"};
      default:
        throw new Error("Unknown product detail type");
    }
  }

  validateProductDataIconTitleAndValue(dataSection, icon, title, value) {
    cy.get(mobileReportPageElement.productDetailsDataItems)
      .then( productDetailsDataItems => {
        cy.wrap(productDetailsDataItems[dataSection])
          .find(globalElements.traxIcon)
          .invoke('attr', 'class')
          .should('contain', icon);
        cy.wrap(productDetailsDataItems[dataSection])
          .find(mobileReportPageElement.productDataTitle)
          .should('contain', title + ':');
        cy.wrap(productDetailsDataItems[dataSection])
          .find(mobileReportPageElement.productDataValue)
          .should('contain', value);
      });
  }

  validateBrand() {
    let expectedBrandUi = this.defineExpectedProductDetailIconsAndTitles("brand");
    cy.get('@productData')
      .then( productData => {
      this.getBrandByPkIncludingDeletedFromDb(productData[0].brand_fk)
        .then( expectedBrand => {
          this.validateProductDataIconTitleAndValue(expectedBrandUi.dataSection, expectedBrandUi.icon, expectedBrandUi.title, expectedBrand[0].name);
        });
      });
  }

  validateCategory() {
    let expectedCategoryUi = this.defineExpectedProductDetailIconsAndTitles("category");
    this.validateProductDataIconTitleAndValue(expectedCategoryUi.dataSection, expectedCategoryUi.icon, expectedCategoryUi.title, testData.mobRepFlow.categoryUnderTestName);
  }

  validateEan() {
    let expectedEanUi = this.defineExpectedProductDetailIconsAndTitles("ean");
    cy.get('@productData')
      .then( productData => {
        this.validateProductDataIconTitleAndValue(expectedEanUi.dataSection, expectedEanUi.icon, expectedEanUi.title, productData.ean_code);
      });
  }

  openProductPageFromGrid(carouselIndex) {
    this.isCarouselIndexValid(carouselIndex);
    this.selectCarousel(carouselIndex);
    this.getExpectedProductDataFromDb(testData.mobRepFlow.sessionPk, carouselIndex)
      .then( expectedCurrentProductData => {
        this.getProductByPkIncludingDeletedFromDb(expectedCurrentProductData[0].prodFk).as('productData')
        .then( productData => {
          this.selectProductFromGridByProductName(0, productData[0].name);
        });
    });
  }

  validateProductDetailsPage() {
    this.validatePopupHeader(testData.mobRepFlow.prodDetailsHeader);
    this.validateProductImage();
    this.validateNonEmptyBarCode();
    this.validateBrand();
    this.validateCategory();
    // this.validateEan(); - can not be seen on the report (!)
  }

  selectBackButton() {
    this.getBackButtonElementInView().click({force:true});
  }

  prepareMobRepProbeDataDb() {
    cy.readFile('cypress/fixtures/Assets/MobileReports/mobRepProbeData.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareMobRepStaticDb() {
    cy.readFile('cypress/fixtures/Assets/MobileReports/mobRepStatic.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareMobRepStaticNewDb() {
    cy.readFile('cypress/fixtures/Assets/MobileReports/mobRepStaticNew.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareMobRepReportDb() {
    cy.readFile('cypress/fixtures/Assets/MobileReports/mobRepReport.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareSupervisorReportingDb() {
    cy.readFile('cypress/fixtures/Assets/SupervisorDashboard/supervisorReporting.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareSupervisorStaticDb() {
    cy.readFile('cypress/fixtures/Assets/SupervisorDashboard/supervisorStatic.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareSupervisorProbeDataDb() {
    cy.readFile('cypress/fixtures/Assets/SupervisorDashboard/supervisorProbeData.sql')
      .then( queries => {
        cy.task('queryDb', {sql: queries});
      });
  }

  prepareMobRepData() {
    this.prepareSupervisorProbeDataDb();
    this.prepareSupervisorReportingDb();
    this.prepareSupervisorStaticDb();
    this.prepareMobRepProbeDataDb();
    this.prepareMobRepReportDb();
    this.prepareMobRepStaticDb();
    this.prepareMobRepStaticNewDb();
  }

  getRecalculatedStatusFromDb(sessionUid) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSessionRecalcStatus, values: [sessionUid]});
  }

  getRecalculatedStatus(sessionUid) {
    return this.getRecalculatedStatusFromDb(sessionUid)
      .then( recalcRecordDb => {
        if (recalcRecordDb.length != 0) {
          if (recalcRecordDb[0].recalc_done != null) {
             return "Recalculated";
          } else {
              return "Recalculating";
          }
        } else {
            return "Not recalculated";
        }
      });
  }

  transformRecalcDateFormat(sessionUid) {
    return this.getRecalculatedStatusFromDb(sessionUid)
      .then( recalcRecordDb => {
        return this.transformDateFormatForMRHeader(recalcRecordDb[0].recalc_done);
      });
  }

  getReportHeaderBasedOnRecalculatedStatus(mainTitle, sessionUid){
    this.getRecalculatedStatus(sessionUid)
      .then( recalculatedStatus => {
        if (recalculatedStatus === "Recalculated") {
          this.transformRecalcDateFormat(sessionUid)
            .then( recalcDoneDateUI => {
              return mainTitle + "\nRecalculated\n  | " + recalcDoneDateUI;
            });
        } else if (recalculatedStatus === "Recalculating") {
            return mainTitle + "\nRecalculating...";
        } else {
            return mainTitle;
        }
      });
  }

  getMobileReportSubHeader() {
    return cy.get(mobileReportPageElement.mobRepStoreName);
  }

  getPageTitleElement() {
    return cy.get(mobileReportPageElement.pageTitle)
  }

  getCategoriesElement() {
    return cy.get(mobileReportPageElement.categoriesTitle)
  }

  getCarouselCountOnFullVisitSummaryBySessionPkFromDb(sessionPk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getCarouselCountOnFullVisitSummaryBySessionPkFromDb, values: [sessionPk]});
  }

  validateVisitSummaryUI(sessionPk) {
    this.getPageTitleElement().should('be.visible');
    this.getMobileReportSubHeader().should('be.visible');
    this.getOptionElement().should('be.visible');
    this.getActionsElement().should('be.visible');
    this.getCategoriesElement().should('contain', testData.mobRepFlow.visitSummaryCategoriesHeader);
    this.getCategoryTitles().its('length').should('be.greaterThan', 0);
    this.getPopupHeader().should('not.exist');
    this.getBackButtonElement().should('not.exist');
    this.getReportButton().should('not.exist');
    this.getCarouselCountOnFullVisitSummaryBySessionPkFromDb(sessionPk)
      .then( carouselNrDb => {
        this.validateNumberOfCarousels(carouselNrDb[0].count);
      });
  }
  
  validateMobileReportHeaderBackgroundImage(image) {
    cy.get(mobileReportPageElement.mobRepHeader)
      .should('have.css', 'background-image')
      .and('contain', image);
  }

  validateMobileReportHeaderBackgroundByPageTitle(pageTitle) {
    switch (pageTitle) {
      case mobileReportConstants.reportIndication.full.caption:
        this.validateMobileReportHeaderBackgroundImage(mobileReportConstants.reportIndication.full.background);
        break;
      case mobileReportConstants.reportIndication.live.caption:
        this.validateMobileReportHeaderBackgroundImage(mobileReportConstants.reportIndication.live.background);
        break;
      default:
        throw new Error("Unexpected page title");
    }
  }

  validateMobileReportHeaderIcon(icon) {
    this.getPageTitleElement()
      .find('img')
      .invoke('attr','src')
      .should('contain', icon);
  }

  validateMobileReportHeaderIconByPageTitle(pageTitle) {
    switch (pageTitle) {
      case mobileReportConstants.reportIndication.full.caption:
        this.validateMobileReportHeaderIcon(mobileReportConstants.reportIndication.full.icon);
        break;
      case mobileReportConstants.reportIndication.live.caption:
        this.validateMobileReportHeaderIcon(mobileReportConstants.reportIndication.live.icon);
        break;
      default:
        throw new Error("Unexpected page title");
    }
  }

  getStoreDataByStorePkFromDb(storePk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getStoreById, values:[storePk]});
  }

  getSalesRepByIdFromDb(salesRepId) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSalesRepsByIds, values:[salesRepId]});
  }

  getSessionByStoreIdSalesRepIdVisitDateFromDb(storeId, salesRepId, visitDate) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSessionByStoreSalesRepVisitDate, values:[storeId, salesRepId, visitDate]});
  }

  getMobileReportSubHeaderLines() {
    return this.getMobileReportSubHeader()
      .invoke('text')
      .then( text => {
        return text.split('\n        \n        \n');
      });
  }

  getStoreNameFromMobileReportHeader() {
    return this.getMobileReportSubHeaderLines()
      .then( text => {
        return text[0].split('•')[0].trim();
      }); 
  }

  getSalesRepNameFromMobileReportHeader() {
    return this.getMobileReportSubHeaderLines()
      .then( text => {
        return text[0].split('•')[1].trim();
      }); 
  }

  getVisitDateFromMobileReportHeader() {
    return this.getMobileReportSubHeaderLines()
      .then( text => {
        return text[1].trim();
      }); 
  }

  validateStoreNameInMobileReportHeader(storeId) {
    this.getStoreDataByStorePkFromDb(storeId)
      .then( storeDb => {
        this.getStoreNameFromMobileReportHeader()
          .then( actualStoreName => {
            expect(storeDb[0].name).to.equal(actualStoreName);
          });
      });
  }

  validateSalesRepNameInMobileReportHeader(salesRepId) {
    this.getSalesRepByIdFromDb(salesRepId)
      .then( salesRepDb => {
        this.getSalesRepNameFromMobileReportHeader()
          .then( actualSalesRep => {
            expect(`${salesRepDb[0].first_name} ${salesRepDb[0].last_name}`).to.equal(actualSalesRep);
          });
      });
  }

  transformDateFormatForMRHeader(dateDb) {
    return moment(new Date(dateDb)).format('D MMM YYYY, h:mm A');
  }
  transformDateFormatToGetImageDate(dateDb) {
    return moment(new Date(dateDb)).format('YYYY MM DD');
  }

  transformDateFormatToGetImageDateAndTime(dateDb) {
    return moment(new Date(dateDb)).format('YYYY-MM-DD HH-mm-ss');
  }
  
  transformDateFormatUtcOffset(dateDb) {
    return moment(new Date(dateDb)).subtract(moment(dateDb).utcOffset());
  }

  validateVisitDateInMobileReportHeader(storeId, salesRepId, visitDate) {
    this.getSessionByStoreIdSalesRepIdVisitDateFromDb(storeId, salesRepId, visitDate)
      .then( sessionDataDb => {
        // (Cypress.env.CI !== undefined) is a prep for Jenkins run, will be updated when tests are hooked into CI
        if (Cypress.env.CI !== undefined) {
          return this.transformDateFormatForMRHeader(this.transformDateFormatUtcOffset(sessionDataDb[0].start_time));
        } else {
          return this.transformDateFormatForMRHeader(sessionDataDb[0].start_time);
        }
      })
      .then( time => {
        this.getVisitDateFromMobileReportHeader()
          .then( actualVisitDate => {
            expect(time).to.equal(actualVisitDate);
          });
      });
  }

  defineExpectedVisitSummaryCarouselData(carouselIndex) {
    switch(carouselIndex) {
      case 0:
        return {"name": "score",
                "color": testData.mobRepFlow.colors.graphs.green};
      case 1:
        return {"name": "oos",
                "color": testData.mobRepFlow.colors.graphs.blue,
                "kpiLevel2Value": 107};
      default:
        expect(carouselIndex).to.be.within(0,1);
    }
  }

  getResultBySession(sessionPk, application, page, module, kpi, numeratorId) {
    return cy.task('queryDb', {sql: mobileReportQueries.getResultBySession, values: [sessionPk, application, page, module, kpi, numeratorId]});
  }

  validateVisitSummaryPageCarousel(carouselIndex) {
    if (carouselIndex === 0) {
      this.getResultBySession(testData.mobRepFlow.sessionPk, 'Mobile Reports', 'visit summary', 'store level kpi', 'score', 1)
        .then( kpiLevel2Data => {
          this.validateCarouselScoreValue(carouselIndex, kpiLevel2Data[0].result, 'pt');
          this.validateCarouselTargetValue(carouselIndex, kpiLevel2Data[0].target, 'pt');
        });
    } else {
      this.getKpiResultsBySessionKpiDenominatorOwnManFromDb(testData.mobRepFlow.sessionPk, this.defineExpectedVisitSummaryCarouselData(carouselIndex).kpiLevel2Value, testData.mobRepFlow.energyCategoryPk)
        .then( kpiLevel2Data => {
          this.validateCarouselScoreValue(carouselIndex, kpiLevel2Data[0].result, '%');
          this.validateCarouselTargetValue(carouselIndex, kpiLevel2Data[0].target, '%');
        });
    }
    this.validateCarouselScoreDeltaValue(testData.mobRepFlow.sessionPk, testData.mobRepFlow.prevSessionPk, carouselIndex, this.defineExpectedVisitSummaryCarouselData(carouselIndex).kpiLevel2Value, testData.mobRepFlow.energyCategoryPk);
    this.validateCarouselColor(carouselIndex,this.defineExpectedVisitSummaryCarouselData(carouselIndex).color);
    this.validateCarouselCaption(carouselIndex, this.defineExpectedVisitSummaryCarouselData(carouselIndex).name);
  }

  validatePreviousVisitSummaryPageCarousel() {
    this.getResultBySession(testData.mobRepFlow.prevSessionPk, 'Mobile Reports', 'visit summary', 'store level kpi', 'score', 1)
      .then( resultsDb => {
        expect(resultsDb.length).to.equal(0);
      });
    this.getKpiResultsBySessionKpiDenominatorOwnManFromDb(testData.mobRepFlow.prevSessionPk, this.defineExpectedVisitSummaryCarouselData(1).kpiLevel2Value, testData.mobRepFlow.ssdCategoryPk)
      .then( kpiLevel2Data => {
        this.validateCarouselScoreValue(0, kpiLevel2Data[0].result, '%');
        this.validateCarouselTargetValue(0, kpiLevel2Data[0].target, '%');
      });
    this.validateCarouselScoreDeltaValue(testData.mobRepFlow.prevSessionPk, null, 0, this.defineExpectedVisitSummaryCarouselData(1).kpiLevel2Value, testData.mobRepFlow.ssdCategoryPk);
    this.validateCarouselColor(0,this.defineExpectedVisitSummaryCarouselData(1).color);
    this.validateCarouselCaption(0, this.defineExpectedVisitSummaryCarouselData(1).name);
  }

  getCategoriesBySessionOwnManFromDb(sessionPk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getCategoriesBySessionOwnMan, values: [sessionPk]});
  }

  getKPIsConfigGroupFromDb(page, modul) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKPIsConfigGroup, values: [page, modul]});
  }

  validateVisitSummaryCategoryCards(sessionPk) {
    this.getCategoriesBySessionOwnManFromDb(sessionPk)
      .each( (categoryDb, index) => {
        this.getCategoryTitles()
          .then( categoryTitles => {
            cy.wrap(categoryTitles[index]).should('contain', categoryDb.name);
          });
      });
  }

  getCategoryCardKpiDetails(categoryName) {
    return this.getCategoryDetailsElementByCategoryName(categoryName)
      .find(mobileReportPageElement.categoryKpiDetails);
  }

  getCategoryCardKpiTitles(categoryName) {
    return this.getCategoryDetailsElementByCategoryName(categoryName)
      .find(mobileReportPageElement.categoryKpis);
  }

  validateKpiTitlesOnVisitSummaryCategoryCard(categoryName, categoryKpiData) {
    this.getTranslations()
      .then( translation => {
        this.getCategoryCardKpiTitles(categoryName)
          .each( (categoryKpi, index) => {
              cy.wrap(categoryKpi)
                .should('contain', JSON.parse(translation).mobileReports.reportsNames[categoryKpiData[index].title]);
          });
      });
  }

  getKPIResultsBySessionKPIDenominatorOwnManFromDb(sessionPk, kpiPk, denominatorId) {
    return cy.task('queryDb', {sql: mobileReportQueries.getKPIResultsBySessionKPIDenominatorOwnMan,
      values: [sessionPk, kpiPk, denominatorId]});
  }

  validateCategoryKpiValue(kpiDetailElement, expectedScore) {
    cy.wrap(kpiDetailElement)
      .find(mobileReportPageElement.categoryKpiValues)
      .should('be.visible')
      .and('contain', this.scoreFormatter(expectedScore, '%'));
  }

  validateCategoryKpiNoValue(kpiDetailElement) {
    cy.wrap(kpiDetailElement)
      .find(mobileReportPageElement.categoryKpiNoValues)
      .should('be.visible')
      .and('contain', 'N/A');
  }

  validateCategoryKpiDelta(kpiDetailElement, expectedDelta) {
    cy.wrap(kpiDetailElement)
      .find(mobileReportPageElement.categoryKpiDeltas)
      .should('be.visible')
      .and('contain', expectedDelta);
  }

  validateCategoryKpiNoDelta(kpiDetailElement) {
    cy.wrap(kpiDetailElement)
      .find(mobileReportPageElement.categoryKpiDeltas)
      .should('not.exist');
  }

  validateKpiValuesOnVisitSummaryCategoryCard(sessionPk, categoryData, categoryKpiData) {
    this.getCategoryCardKpiDetails(categoryData.name)
      .each( (kpiDetailElement, index) => {
        this.getKPIResultsBySessionKPIDenominatorOwnManFromDb(sessionPk, categoryKpiData[index].kpi_level_2_fk, categoryData.pk)
          .then( kpiData => {
            expect(kpiData.length).to.not.be.greaterThan(1);
            if (kpiData.length === 0) {
              this.validateCategoryKpiNoValue(kpiDetailElement);
            } else {
              this.validateCategoryKpiValue(kpiDetailElement, kpiData[0].result);
            }
          });
      });
  }

  validateKpiDeltasOnVisitSummaryCategoryCard(sessionPk, prevSessionPk, categoryData, categoryKpiData) {
    this.getCategoryCardKpiDetails(categoryData.name)
      .each( (kpiDetailElement, index) => {
        this.getScoreValueFromDb(sessionPk, categoryKpiData[index].kpi_level_2_fk, categoryData.pk)
          .then( curScoreValue => {
            this.getScoreValueFromDb(prevSessionPk, categoryKpiData[index].kpi_level_2_fk, categoryData.pk)
              .then( prevScoreValue => {
                if (curScoreValue !== null && prevScoreValue !== null) {
                  this.validateCategoryKpiDelta(
                    kpiDetailElement,
                    this.toPercentage(curScoreValue - prevScoreValue, '%'));
                } else {
                  this.validateCategoryKpiNoDelta(kpiDetailElement);
                }
              });
        });
      });
  }

  validateKpiDataOnEveryVisitSummaryCategoryCard(sessionPk, prevSessionPk) {
    this.getCategoriesBySessionOwnManFromDb(sessionPk)
      .each( categoryDb => {
        this.getKPIsConfigGroupFromDb('visit summary', 'category kpi')
          .then( categoryKpisDb => {
            this.selectCategoryByName(categoryDb.name);
            this.validateKpiTitlesOnVisitSummaryCategoryCard(categoryDb.name, categoryKpisDb);
            this.validateKpiValuesOnVisitSummaryCategoryCard(sessionPk, categoryDb, categoryKpisDb);
            this.validateKpiDeltasOnVisitSummaryCategoryCard(sessionPk, prevSessionPk, categoryDb, categoryKpisDb);
          });
      });
  }

  getPopupHeader() {
    return cy.get(mobileReportPageElement.mobRepPopupTitle);
  } 

  validatePopupHeader(reportName) {
    this.getPopupHeader()
      .should('be.visible')
      .and('contain', reportName);
  }

  getSessionTemplatesFromDb(sessionPk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSessionTemplates, values: [sessionPk]});
  }

  getImageDrawers() {
    return cy.get(mobileReportPageElement.imageDrawers);
  }

  getOpenImageDrawers() {
    return cy.get(mobileReportPageElement.imagesDrawersOpenState);
  }

  getImageDrawerCaptions() {
    return cy.get(mobileReportPageElement.imageDrawerCaptions);
  }

  validateNumberOfImagesDrawers() {
    this.getSessionTemplatesFromDb(testData.mobRepFlow.sessionPk)
      .then( sessionTemplates => {
        this.getImageDrawers()
          .should('be.visible')
          .its('length').should('equal', sessionTemplates.length);
      });
  }

  validateNumberOfOpenedImageDrawers() {
    this.getSessionTemplatesFromDb(testData.mobRepFlow.sessionPk)
      .then( sessionTemplates => {
        this.getOpenImageDrawers()
          .should('be.visible')
          .its('length').should('equal', sessionTemplates.length);
      });
  }

  defineDisplayedSceneTypeName() {
    let sceneTypesDisplayName = [];
    return this.getSessionTemplatesFromDb(testData.mobRepFlow.sessionPk)
      .each( imageDrawerCaption => {
        if (imageDrawerCaption.display_name !== null) {
          return sceneTypesDisplayName.push(imageDrawerCaption.display_name);
        } else {
          return sceneTypesDisplayName.push(imageDrawerCaption.name);
        }
      }).then( () => {
        return sceneTypesDisplayName;
      });
  }

  validateImagesDrawerCaptions() {
    this.defineDisplayedSceneTypeName()
      .then( sceneTypesDisplayName => {  
        this.getImageDrawerCaptions()
          .each( (imageDrawerCaption, index) => {
            cy.wrap(imageDrawerCaption).should('contain', sceneTypesDisplayName.sort()[index]);
          });
      });
  }

  validateEveryImageDrawerClosedState() {
    this.getOpenImageDrawers().should('not.exist');
  }

  openImageDrawer(imageDrawer) {
    cy.wrap(imageDrawer)
      .click()
      .invoke('attr', 'class')
      .should('contain', 'open');
  }

  openEveryImageDrawer() {
    this.getImageDrawers()
      .each( imageDrawer => {
        this.openImageDrawer(imageDrawer);
      });
  }

  openImageDrawerByCaption(caption) {
    cy.contains(caption)
      .parent()
      .click()
      .invoke('attr', 'class')
      .should('contain', 'open');
  }

  closeImageDrawerByCaption(caption) {
    cy.contains(caption)
      .parent()
      .click()
      .invoke('attr', 'class')
      .should('not.contain', 'open');
  }

  getSceneBySessionAndTemplateFromDb(sessionPk, templatePk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSceneBySessionAndTemplate, values: [sessionPk, templatePk]});
  }

  getSceneBySessionAndTemplateNameFromDb(sessionPk, templateName) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSceneBySessionAndTemplateName, values: [sessionPk, templateName]});
  }

  validateImageDrawerSceneIdLabel(drawerIndex) {
    return cy.get(mobileReportPageElement.viewImagesSceneIdLabels)
      .eq(drawerIndex)
      .should('be.visible')
      .and('contain', testData.mobRepFlow.sceneIdTitle);
  }

  validateImageDrawerSceneIdValue(drawerIndex, expSceneId) {
    return cy.get(mobileReportPageElement.viewImagesSceneIdValues)
      .eq(drawerIndex)
      .should('be.visible')
      .and('contain', expSceneId);
  }

  validateImageDrawerSceneId(drawerIndex, expSceneId) {
    this.validateImageDrawerSceneIdLabel(drawerIndex);
    this.validateImageDrawerSceneIdValue(drawerIndex, expSceneId);
  }

  getProbesBySceneFromDb(scenePk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getProbesByScene, values: [scenePk]});
  }

  validateImageDrawerValue(imageDrawer, value) {
    cy.wrap(imageDrawer)
      .find('.card-value')
      .should('be.visible')
      .and('contain', value);
  }

  validateImageDrawerLabel(imageDrawer, label) {
    cy.wrap(imageDrawer)
      .find('.card-label')
      .should('be.visible')
      .and('contain', label);
  }

  validateImageDrawerNrOfImages(scenePk, drawerIndex) {
    this.getProbesBySceneFromDb(scenePk)
      .then( probesDataDb => {
        cy.get(mobileReportPageElement.viewImagesNumsProbes)
          .eq(drawerIndex)
          .then( imageDrawer => {
            this.validateImageDrawerLabel(imageDrawer, testData.mobRepFlow.nrOfImagesTitle);
            this.validateImageDrawerValue(imageDrawer, probesDataDb.length);
          });
      });
  }
  
  validateImageDrawerSceneType(drawerIndex) {
    this.defineDisplayedSceneTypeName()
      .then( sceneTypesDisplayName => {
        cy.get(mobileReportPageElement.viewImagesScenesTypes)
          .eq(drawerIndex)
          .then( imageDrawer => {
            this.validateImageDrawerLabel(imageDrawer, testData.mobRepFlow.sceneTypeTitle);
            this.validateImageDrawerValue(imageDrawer, sceneTypesDisplayName.sort()[drawerIndex]);
          });
      });
  }

  getSceneByPkFromDb(scenePk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSceneByPk, values: [scenePk]});
  }

  getSceneStatusNameByCodeFromDb(statusCode) {
    return cy.task('queryDb', {sql: mobileReportQueries.getSceneStatusNameByCode, values: [statusCode]});
  }

  getViewImagesSceneStatusFromDb(scenePk) {
    return this.getSceneByPkFromDb(scenePk)
      .then( sceneDataDb => {
        this.getSceneStatusNameByCodeFromDb(sceneDataDb[0].status);
      });
  }

  getViewImagesSceneDataBySessionAndTemplateFromDb(sessionPk, drawerIndex) {
    return this.getSessionTemplatesFromDb(sessionPk)
      .then( sessionTemplatesDb => {
        this.getSceneBySessionAndTemplateFromDb(sessionPk, sessionTemplatesDb[drawerIndex].pk);
      });
  }

  validateImageDrawerStatus(sessionPk, drawerIndex) {
    this.getViewImagesSceneStatusFromDb(sessionPk)
      .then( sceneStatusDb => {
        cy.get(mobileReportPageElement.viewImagesStatuses)
          .eq(drawerIndex)
          .then( imageDrawer => {
            this.validateImageDrawerLabel(imageDrawer, testData.mobRepFlow.statusTitle);
            this.validateImageDrawerValue(imageDrawer, sceneStatusDb[0].name);
          });
      });
  }

  getSceneImageData(scenePk) {
    let sceneData = [];
    return this.getProbesBySceneFromDb(scenePk)
      .each( sceneProbeDb => {
        return sceneData.push({imageDate: moment(sceneProbeDb.image_date), storeFk: sceneProbeDb.store_fk, localImageTime: moment(sceneProbeDb.local_image_time), hash: sceneProbeDb.hash});
      })
      .then( () => {
        return sceneData;
      });
  }

  getSceneImagesSuffixesFromDb(scenePk) {
  let expectedSuffixes = [];
  return this.getSceneImageData(scenePk)
      .each( sceneImage => {
        if (Cypress.env.CI !== undefined) {
          return expectedSuffixes.push(`${(this.transformDateFormatToGetImageDate(this.transformDateFormatUtcOffset(sceneImage.imageDate))).match(/\d+/g).join('')}/${sceneImage.storeFk}/${(this.transformDateFormatToGetImageDateAndTime(this.transformDateFormatUtcOffset(sceneImage.localImageTime))).match(/\d+/g).join('')}-${sceneImage.hash}`);
        } else {
          return expectedSuffixes.push(`${(this.transformDateFormatToGetImageDate(sceneImage.imageDate)).match(/\d+/g).join('')}/${sceneImage.storeFk}/${(this.transformDateFormatToGetImageDateAndTime(sceneImage.localImageTime)).match(/\d+/g).join('')}-${sceneImage.hash}`);
        }
      })
      .then( () => {
        return expectedSuffixes;
      });
  }

  getImageInImageDrawer() {
    return cy.get(mobileReportPageElement.viewImagesProbesImages);
  }

  validateImageDrawerImage(scenePk, drawerIndex) {
    this.getSceneImagesSuffixesFromDb(scenePk)
      .then( sceneImageSuffixes => {
        this.getImageInImageDrawer()
          .eq(drawerIndex)
          .find('img')
          .invoke('attr', 'src')
          .should('contain', sceneImageSuffixes[0]);
        });
  }

  validateImageDrawerContent(drawerIndex) {
    this.getViewImagesSceneDataBySessionAndTemplateFromDb(testData.mobRepFlow.sessionPk, drawerIndex)
      .then( sceneDb => {
        this.validateImageDrawerSceneId(drawerIndex, sceneDb[0].pk);
        this.validateImageDrawerNrOfImages(sceneDb[0].pk, drawerIndex);
        this.validateImageDrawerSceneType(drawerIndex);
        this.validateImageDrawerStatus(testData.mobRepFlow.sessionPk, drawerIndex);
        this.validateImageDrawerImage(sceneDb[0].pk, drawerIndex);
      });
  }

  validateEveryImageDrawerContent() {
    this.getOpenImageDrawers()
      .each( (element, index) => {
        this.validateImageDrawerContent(index);
      });
  }

  openImagePage() {
    this.getImageInImageDrawer().click({force: true});
  }

  getProductTaggingSection() {
    return cy.get(mobileReportPageElement.productTaggingSection);
  }

  getSceneImages() {
    return cy.get(mobileReportPageElement.viewImagesSceneImages);
  }

  validateSceneImages(drawerCaption) {
    this.getSceneBySessionAndTemplateNameFromDb(testData.mobRepFlow.sessionPk, drawerCaption)
      .then( sceneDb => {
        this.getSceneImagesSuffixesFromDb(sceneDb[0].pk)
          .then( sceneImageSuffixes => {
            this.getSceneImages()
              .each( (sceneImage, index) => {
                cy.wrap(sceneImage)
                  .invoke('attr', 'src')
                  .should('contain', sceneImageSuffixes[index]);
              });
          });
      });
  }
  
  getNumTagsBySceneFromDb(scenePk) {
    return cy.task('queryDb', {sql: mobileReportQueries.getNumTagsByScene, values: [scenePk]});
  }

  getImageTagCountElement() {
    return cy.get(mobileReportPageElement.viewImagesTagsCount);
  }

  validateTagCountOnImagePage(drawerCaption) {
    this.getSceneBySessionAndTemplateNameFromDb(testData.mobRepFlow.sessionPk, drawerCaption)
      .then( sceneDb => {
        this.getNumTagsBySceneFromDb(sceneDb[0].pk)
          .then( tagCountDb => {
            this.getImageTagCountElement()
              .should('contain', testData.mobRepFlow.tagCountPrefix + ` (${tagCountDb[0].num_tags})`);
          });
      });
  }

  getTraxMenuIcon() {
    return cy.get(mobileReportPageElement.traxMenuIcon);
  }

  validateDisplayTagIsUncheckedByDefault() {
    cy.get(mobileReportPageElement.traxSwitch)
      .shadow()
      .find('.box')
      .invoke('attr', 'checked')
      .should('not.exist');
  }

  validateProductTaggingSection(drawerCaption) {
    this.getProductTaggingSection()
      .should('be.visible')
      .and('contain', testData.mobRepFlow.productTaggingHeader)
      .and('contain', testData.mobRepFlow.displayTags)
      .and('contain', testData.mobRepFlow.tagInfo);
    this.validateDisplayTagIsUncheckedByDefault();
    this.getTraxMenuIcon().should('be.visible');
    this.validateTagCountOnImagePage(drawerCaption);
  }

  getVisitDateAndSalesRepByStoreBeforeDateFromDb(storeFk, currentVisitDate) {
    return cy.task('queryDb', {sql: mobileReportQueries.getVisitDateAndSalesRepByStoreBeforeDate, values:[storeFk, currentVisitDate]});
  }

  getRecentVisitList() {
    return cy.get(mobileReportPageElement.mobRepOptionsVisitsList);
  }

  validateRecentVisitListLength(storeFk, currentVisitDate) {
    this.getVisitDateAndSalesRepByStoreBeforeDateFromDb(storeFk, currentVisitDate)
      .then( visitsDb => {
        this.getRecentVisitList()
          .then( visitsUi => {
            cy.wrap(visitsUi.length).should('equal', (visitsDb.length));
          });
      });
  }

  validateRecentVisitsList(storeFk, currentVisitDate) {
    let expectedVisits =[];
    this.getVisitDateAndSalesRepByStoreBeforeDateFromDb(storeFk, currentVisitDate)
      .each( visitDb => { 
        if (Cypress.env.CI !== undefined) {
          return expectedVisits.push({startTime: this.transformDateFormatForMRHeader(this.transformDateFormatUtcOffset(visitDb.start_time)), firstName: (visitDb.first_name).toLowerCase(), lastName: (visitDb.last_name).toLowerCase()});
        } else {
          return expectedVisits.push({startTime: this.transformDateFormatForMRHeader(visitDb.start_time), firstName: (visitDb.first_name).toLowerCase(), lastName: (visitDb.last_name).toLowerCase()});
        }
      })
        .then( () => {
          this.getRecentVisitList()
            .each( (actualVisit, index) => {
              cy.wrap(actualVisit)
                .should('contain', expectedVisits[index].startTime)
                .and('contain', `${expectedVisits[index].firstName} ${expectedVisits[index].lastName}`);
            });
        });
  }

  selectPreviousVisitFromList() {
    this.getRecentVisitList()
      .eq(0)
      .click();
  }

}

export default MobileReportPage;
