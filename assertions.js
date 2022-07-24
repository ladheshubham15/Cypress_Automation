/**
 * @function verifyValueInNewsLetterField verifies value in the News Letter Field
 *
 * @export
 * @param {string} value - string value added in newsletter field.
 * @return  - nothing
 */
export function verifyValueInNewsLetterField(value)
{
  cy.get('#footer #newsletter_block_left').should('have.descendants',`[value='${value}']`);
}

/**
 * @function assertElementCount asserts the number of elements after / before applying filtering and sorting 
 * @export
 * @param {number} count count of elements to assert
 * @param {null} option.timeout - time added in Miliseconds for wait to load the page.
 * @return {object} - nothing
 */
export function assertElementCount(count,option={ timeout:null })
{
  cy.get(".product-count",{timeout: option.timeout}).should("contain.text",`Showing 1 - ${count} of ${count} items`);
}

/**
 * @function verifyHeaderElementsPresent asserts the header elements are present on navigations
 * @export
 * @return {object} - nothing
 */
export function verifyHeaderElementsPresent()
{
cy.get('#header .shop-phone').should("contain.text","Call us now:");
cy.get('#header #contact-link > a').should("contain.text","Contact us");
cy.get('#header .login').should("contain.text","Sign in");
cy.get('#header .logo').should("exist");
cy.get('#header #searchbox').should('have.attr',"action");
cy.get('#header .shopping_cart > a').should('exist');
}

/**
 * @function verifyFooterElementsPresent asserts the footer elements are present on navigations
 * @export
 * @return {object} - nothing
 */
export function verifyFooterElementsPresent()
{
cy.get('#footer #newsletter_block_left').should('have.descendants',"[id='newsletter-input']");
const media=cy.get('#footer #social_block');
media.should("have.descendants","[class='facebook']");
media.should("have.descendants","[class='twitter']");
media.should("have.descendants","[class='youtube']");
media.should("have.descendants","[class='google-plus']");
cy.get('#footer .blockcategories_footer').should("contain.text","Categories").should("have.descendants",".toggle-footer");
cy.get('#footer #block_various_links_footer').should("contain.text","Information").should("have.descendants",".toggle-footer");
cy.get('#footer .footer-block:contains("My account")').should("have.descendants","a");
cy.get('#footer #block_contact_infos').should('contain.text',"Store information");
}

/**
 * @function isOnPage Asserts if we are landed on same page we want to navigate.
 * @export
 * @param {string} pageHeader : Header of the page we want to assert
 * @return - nothing
 */
export function isOnPage(pageHeader)
{
    cy.get(".page-heading").should("contain.text",`${pageHeader}`);
}

/**
 * @function isPageSectionVisible Asserts if page section is visible or not in page.
 * @export
 * @param {string} sectionName : header of the section in the page
 * @return - nothing
 */
export function isPageSectionVisible(sectionName)
{
    cy.contains(".page-subheading",sectionName);
}