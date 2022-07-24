# Cypress_Automation
                                                Note:- For readable format please use edit file mode.

Tools stack used:- Cypress(version: 10.3.1) and Javascript.

About Framework:-
Cypress is an open-source testing framework based on JavaScript that supports web application testing. Unlike Selenium, Cypress works completely on a real browser without the need for driver binaries. The automated code and application code share the same platform, which gives complete control over the application under test.

Automation Environment/UI:- http://automationpractice.com/index.php

Data used:-
  1. email_id used for newsletter subscription automation: 
       for new_user used random method to generate unique email id's for every run to avoid failures due to duplicate email id.
       for duplicate user test scenario used: demouser@gmail.com
       for invalid user input used: Demo User
     
  2. Credentials used for sign in.
      username: user.demo@demo.com
      password: 12345
      
Project Set-up:-

 1. support/tasks.js : This file contains following methods related to the realtime functions performed by user.
     a. visitHomePage():- visites the homepage of website.
     b. visitShopSections():- navigates to the various page section such as Women,Dresses,T-shirts.
     c. fillValueInNewsLetterField():-  Enters the email-id value in NewsLetter field which is located in footer.
     d. signIn():- Sign in to the website.
     e. clickButton():- performs button click events.
     
 2. support/assertions.js: This file contains following methods used for asserions related scenarios.
     a. verifyValueInNewsLetterField():- verifies value added in the News Letter Field after action triggers.
     b. assertElementCount():- asserts the number of elements after / before applying filtering and sorting.
     c. verifyHeaderElementsPresent():- asserts the header elements are present on navigations.
     d. verifyFooterElementsPresent():- asserts the footer elements are present on navigations.
     e. isOnPage():- Asserts if browser landed on same page we want to navigate.
     f. isPageSectionVisible():- Asserts if page section is visible or not in page.
     
 3. spec_files/automation_test.cy.js: This file contains executable scenarios.
    
    
 Execution:-
  For opening cypress runner use:- ./node_modules/.bin/cypress open
  execute the file spec_files/automation_test.cy.js
  
  
 Challenges and Solutions:-
 1. Rerunning tests : The given website/UI is facing some server issues due to excess load or limited access, due to that it may happens that test might failes.Because of this there is a need of rerunning tests multiple times.
   solution:- If single test fails then we can use .skip() on contexts and scenarios as well to skip other test for that particular run of single test.
   
 2. API Calls: In the website there are no API calls are assigned for some particular functionality such as sign-in, submission of sign-in form. Also while handling dynamic waits it is also giving error for loading API correctly some time due to server issue.
 
 solution: we can handle dynamic waits as following example for filtering page,
     cy.route("GET","/URL).as("loadFilterPage");
     cy.wait("@loadFilterPage);
 also we can use cy.intercept() method here as,
     cy.intercept("PUT", "/URL").as("updateUserUiState");
     cy.wait("@updateUserUiState");
 
 

      
