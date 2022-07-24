import * as assert from '../support/assertions';

/**
 * @function visitHomePage visites the homepage of website.
 * @export
 * @return - nothing
 */
export function visitHomePage() {
  cy.visit("http://automationpractice.com/index.php");
}

/**
 * @function visitShopSections navigates to the section.
 * @export
 * @param {string} sectionName : sectionName ( example : Women,Dresses)
 * @return - nothing
 */
export function visitShopSections(sectionName){
  if(sectionName === "WOMEN"){
    cy.get('.sf-menu > :nth-child(1)').click();
    cy.get('#categories_block_left > .title_block').should("contain.text","Women")
  }else if(sectionName === "DRESS"){
    cy.get('.sf-menu > :nth-child(2)').click();
    cy.get('#categories_block_left > .title_block').should("contain.text","Dress")
  }else{
    cy.get('.sf-menu > :nth-child(3)').click();
    cy.get('.category-name').should("contain.text","T-shirts");
  }
  assert.verifyHeaderElementsPresent();
  assert.verifyFooterElementsPresent();
}

/**
 * @function fillValueInNewsLetterField enters the value in NewsLetter field which is located in footer.
 * @export
 * @param {string} email_id : id to add in the field
 * @return - nothing
 * Note: For verifying newsletter subsription successfully we need to add new email everytime( TIP: USE MATH.random() to generate random values)
 */
export function fillValueInNewsLetterField(email_id)
{
  cy.get('#footer #newsletter_block_left').should('have.descendants',"[id='newsletter-input']")
  .find("#newsletter-input").type(email_id);
  cy.get('.form-group > .btn').click();
}

/**
 * @function signIn performs sign-In operation.
 * @export
 * @return - nothing
 * Note: we should not add password or username in parameter as for security concerns. we can prefer API function here using GET call. but we don't have API hits for current website
 */
export function signIn()
{
  cy.get("#email").type("user.demo@demo.com");
  cy.get("#passwd").type("12345");
  cy.contains(".btn","Sign in").click();
}

/**
 * @function clickButton performs button click events.
 * @export
 * @param {string} buttonName : name of the button 
 * @return - nothing
 * Note: for "Proceed to checkout" button there is extra layer present of class .cart_navigation so need to add different if case for that.
 */
export function clickButton(buttonName)
{
  if(buttonName === "Proceed to checkout")
  {
  cy.get(".cart_navigation > .button").click();
  }else{
  cy.contains(".btn",buttonName).click();
  }
}

