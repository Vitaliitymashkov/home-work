/// <reference types="cypress" />

describe('Sauce demo tests', () => {

  // const existingUser = userInfo;
  const existingUser = {
    userName: "standard_user",
    password: "secret_sauce"
  };

  it('Check that a valid user can login', function () {

    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/');

    // Enter valid username and password into fields
    cy.get('[data-test="username"]').type(existingUser.userName);
    cy.get('[type="password"]').type(existingUser.password);

    // Click the 'Login' button
    cy.get('#login-button').click();

    // Verify that 'Logout' is available in the sidebar
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible');
  })


  it('Check that a valid user can log out', function () {
    // Log in
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(existingUser.userName);
    cy.get('[type="password"]').type(existingUser.password);
    cy.get('#login-button').click();


    //Open burger menu
    cy.get('#react-burger-menu-btn').click()

    // Click the 'Logout' button
    cy.get('#logout_sidebar_link').click()

    // Verify User is on Login page
    cy.url().should('eq', 'https://www.saucedemo.com/');
  })

  it('Check that an invalid user cannot login', function () {

    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/');

    // Enter invalid username and password into fields
    cy.get('[data-test="username"]').type('user12345');
    cy.get('[type="password"]').type('12345');

    // Click the 'Login' button
    cy.get('#login-button').click();

    // Verify that error message appears on the page
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })


  it('Check that locked user cannot login with valid credentials', function () {

    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/');

    // Enter valid username and password into fields
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[type="password"]').type('secret_sauce');

    // Click the 'Login' button
    cy.get('#login-button').click();

    // Verify that error message appears on the page
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
  })

  it('Check that a valid user can login with the valid credentials, but with timeout.', function () {

    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/');

    // Enter valid username and password into fields
    cy.get('[data-test="username"]').type('performance_glitch_user');
    cy.get('[type="password"]').type('secret_sauce');

    // Click the 'Login' button
    cy.get('#login-button').click();
    cy.wait(10000);
    cy.intercept('GET', 'https://www.saucedemo.com/inventory.html');

    // Verify that 'Logout' is available in the sidebar
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible');

  })

  it('Check that a valid user can add any item from the items list to the cart.', function () {

    // Log in
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(existingUser.userName);
    cy.get('[type="password"]').type(existingUser.password);
    cy.get('#login-button').click();

    //Add second element to the card
    cy.get('div[class=inventory_list]>div:has(a>div:contains(Sauce Labs Bike Light)) button').click()
    //cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    //Open cart
    cy.get('#shopping_cart_container').click()

    //Verify added item exists with a same name and price 
    cy.get('.cart_item_label').should('be.visible').and('contain', '1');

    //Verify name and price of item
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light');
    cy.get('.inventory_item_price').should('contain', '$9.99')

    //Verify 'checkout' button is enabled
    cy.get('#checkout').should('be.enabled');
  })


  it('Check that a valid user can buy any item from the items list.', function () {

    // Log in
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(existingUser.userName);
    cy.get('[type="password"]').type(existingUser.password);
    cy.get('#login-button').click();

    //Add second element to the card
    cy.get('div[class=inventory_list]>div:has(a>div:contains(Sauce Labs Bike Light)) button').click();

    //Open cart and Checkout
    cy.get('#shopping_cart_container').click()
    cy.get('#checkout').click()

    //Add information for Checkout
    cy.get('[data-test="firstName"]').type('Yulia')
    cy.get('[data-test="lastName"]').type('MMM')
    cy.get('[data-test="postalCode"]').type('12345')

    cy.get('[data-test="continue"]').click()

    //Finish the order
    cy.get('[data-test="finish"]').click()

    cy.get('.complete-header').should('have.text', 'Thank you for your order!')

  })

  it('Check that a valid user can login when screen width is less than 1060px.', function () {

    // Open Sauce Demo login page
    cy.visit('https://www.saucedemo.com/');

    // Set screen width, for example 960 px
    cy.viewport(960, 660);

    // Enter valid username and password into fields
    cy.get('[data-test="username"]').type(existingUser.userName);
    cy.get('[type="password"]').type(existingUser.password);

    // Click the 'Login' button
    cy.get('#login-button').click();

    // Verify that 'Logout' is available in the sidebar
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').should('be.visible');
  })
});
