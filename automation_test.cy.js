import * as task from '../../support/tasks.js';
import * as assert from '../../support/assertions.js';

context("Automation for verification of headers,footers and newsletter subcription related scenarios",() => {
  const emailVariable= Math.random();
  beforeEach(() => {
    task.visitHomePage();
  });

  it("Cypress Automation for verifying headers & footers and navigation ", () => {
    //verifying header and footer elements are present on homepage
    assert.verifyHeaderElementsPresent();
    assert.verifyFooterElementsPresent();
    //navigating to the different sections and verifications of header and footer elements as well
    task.visitShopSections("WOMEN");
    task.visitShopSections("DRESS");
    task.visitShopSections("T-SHIRTS");
  });

  it("Cypress Automation for newsletter related scenarios ", () => {

    cy.log("Below steps are for successful Newsletter subscription");
    task.fillValueInNewsLetterField(`${emailVariable}@gmail.com`);
    cy.contains("Newsletter : You have successfully subscribed to this newsletter.");
    assert.verifyValueInNewsLetterField('You have successfully subscribed to this newsletter.');

    cy.log("Below steps are for the test case where duplicate mail id used for Newsletter subscription field");
    task.fillValueInNewsLetterField("demouser@gmail.com");
    cy.contains("Newsletter : This email address is already registered.");
    assert.verifyValueInNewsLetterField('This email address is already registered.');

    cy.log("Below steps are for the test case where invalid mail id used for Newsletter subscription field");
    task.fillValueInNewsLetterField("Demo User");
    cy.contains("Newsletter : Invalid email address.");
    assert.verifyValueInNewsLetterField('Invalid email address.');
  });
});

context("Automation for verification of sorting and filtering related scenarios",() => {
  beforeEach(() => {
    task.visitHomePage();
  });

  it("Cypress Automation for verifying filtering and sorting working on WOMEN -> DRESSES -> Summer Dresses section ", () => {
    task.visitShopSections("WOMEN");
    //navigating to Dresses Section from Women Page from categories section
    cy.get("#categories_block_left .block_content").find(".tree > :nth-child(2)").should("contain.text","Dresses").click();
    cy.get('#categories_block_left > .title_block').should("contain.text","Dress");
    //navigating to Summer Dresses section from Dresses page using categories section
    cy.get("#categories_block_left .block_content").find(".tree > :nth-child(3)").should("contain.text","Summer Dresses").click();
    cy.get(".cat-name").should("contain.text","Summer Dresses");
    //asserting page elements counter initially
    cy.contains(".heading-counter","There are 3 products");
    //applying sorting 
    cy.get('#selectProductSort')
    .select('In stock');
    assert.assertElementCount(3,{timeout:20000});
    cy.get(".product_list").find(".available-now").should("have.length",3);
    //applying filtering
    cy.log("Applying filtering by checking checkbox for Polyester")
    cy.get("#layered_id_feature_1").check();
    assert.assertElementCount(2,{timeout:20000});
    cy.get(".product_list").find(".product_img_link").should("have.length",2);
  });

  it("Cypress Automation for verifying filtering option is working correctly ", () => {
    task.visitShopSections("WOMEN");
    //asserting number of elements initially before applying filtering
    assert.assertElementCount(7);
    cy.log("Applying filtering by checking checkbox for filter Tops");
    //applying filter by category tops
    cy.get("#layered_category_4").check();
    //asserting count after loading of filter page
    assert.assertElementCount(2,{timeout:20000});
    cy.get(".product_list").find(".product_img_link").should("have.length",2);
  });

  it("Cypress Automation for verifying sorting option is working correctly ", () => {
    task.visitShopSections("WOMEN");
    //asserting number of elements initially before applying sorting
    assert.assertElementCount(7);
    cy.get('#selectProductSort')
    .select('In stock');
    assert.assertElementCount(7,{timeout:20000});
    //asserting number of elements are sorted by category "In stock"
    cy.get(".product_list").find(".available-now").should("have.length",7);
  });
});

context("Automation for verification of product checkout process",() => {
  beforeEach(() => {
    task.visitHomePage();
  });

  it("Cypress Automation for verification of Checkout process ", () => {
    task.visitShopSections("WOMEN");
    cy.log("Adding Faded Short Sleeve T-Shirts to the cart from WOMEN Section");
    cy.get('.right-block:contains("Faded Short Sleeve T-shirts") .button-container').find("[title='Add to cart']").click();

    cy.log("Verifying that Modal after successful adition of item in cart is visible");
    cy.get(".clearfix").should("be.visible");
    cy.get('.layer_cart_product').find("h2").should("contain.text","Product successfully added to your shopping cart");
    cy.contains(".clearfix .btn","Proceed to checkout").click();

    cy.log("Verifying that after clicking on Proceed to checkout browser lands on Cart Navigation page");
    // shopping-cart section
    assert.isOnPage("Shopping-cart summary");
    cy.get(".product-name").should("contain.text","Faded Short Sleeve T-shirts");
    task.clickButton("Proceed to checkout");

    //Authentication section incase user not signed in
    assert.isOnPage("Authentication");
    task.signIn();

    //Addresses section
    assert.isOnPage("Addresses");
    assert.isPageSectionVisible("Your delivery address");
    assert.isPageSectionVisible("Your billing address");
    task.clickButton("Proceed to checkout");

    //shipping section
    assert.isOnPage("Shipping");
    cy.get(".checkbox").should("contain.text","I agree to the terms of service").find("#cgv").check();
    task.clickButton("Proceed to checkout");

    //Payments section
    assert.isOnPage("Please choose your payment method");
    cy.log("Verifying bankwire option page for payments");
    cy.get(".payment_module .bankwire").should("contain.text","Pay by bank wire").click();
    assert.isPageSectionVisible("Bank-wire payment.");
    //verifying "Other Payment methods" button working correctly
    task.clickButton("Other payment methods");

    cy.log("Verifying cheque payment option page for payments");
    cy.get(".payment_module .cheque").should("contain.text","Pay by check ").click();
    assert.isPageSectionVisible("Check payment");
    //verifying "I confirm my order" button working correctly
    task.clickButton("I confirm my order");

    //Order completion
    cy.contains("Your order on My Store is complete.");
  });
});
