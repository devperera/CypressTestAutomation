Feature: Verify Lexus site Feature

  This contains Lexus site Feature

    Background: Navigate to the Lexus page
       Given I navigate to the "https://www.lexus.com.sg"
         And I accept all cookies

    Scenario: Verify COVID information message displayed
        When I select COVID 19 information option
        Then I see "IMPORTANT COVID-19 INFORMATION" text available in the page

    Scenario: Verify RX gallery displayed
        When I select RX Flagship Luxury SUV option
        Then I see RX SUV gallery on the page

    Scenario: Verify Book a test drive process
        When I select RX Flagship Luxury SUV option
         And I select book a test drive option
         And I enter followings details
            |FirstName|LastName|EmailAddress  |PhoneNumber|PreferredDate  |PreferredTime|PreferredSaleConsultant|NumberOfPax|
            |Dev      |Perera  |dev1@gmail.com|772491255  |October 6, 2022|10:00        |Alvin Tan              |2          |
         And I checked privacy policy check boxes
         And I cheked marketing information check boxes
        Then I see submit button is enable
