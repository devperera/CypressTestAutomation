Feature: Verify Lexus site Feature

  This contains Lexus site Feature

    Background: Navigate to the Lexus page
       Given I navigate to the "https://www.lexus.com.sg"
         And I accept all cookies

    Scenario: Verify initial page header message
        Then I see "REIMAGINE THE ALL-NEW LEXUS NX" banner.

    Scenario: Verify RX gallery displayed
        When I select RX Flagship Luxury SUV option
         And I scroll into gallery
        Then I see RX SUV gallery on the page

    Scenario: Verify Book a test drive process
        When I select RX Flagship Luxury SUV option
         And I select book a test drive option
         And I enter followings details
             |FirstName|LastName|EmailAddress     |CountryCode|PhoneNumber|PreferredDate  |PreferredTime|PreferredSaleConsultant|NumberOfPax|TestDriveOption           |
             |CPL      |Test    |qa@convertium.com|+65        |91234567   |October 27, 2022|18:00        |                       |1          |lexus-test-drive-concierge|
         And I checked a driving license checkbox
         And I checked a term condition checkbox
         And I checked a privacy policy checkbox
         And I checked a marketing information checkbox
        Then I see "RX 300" model already selected
         And I see submit button is enable
