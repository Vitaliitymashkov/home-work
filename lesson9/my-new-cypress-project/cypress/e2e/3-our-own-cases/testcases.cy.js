/// <reference types="cypress" />

describe('cypress-realworld-app', () => {
  const userInfo = {
    firstName: "Bob",
    lastName: "Ross",
    userName: "newUser" + Math.floor(Math.random() * 10000),
    password: "s3cret"
  };
  // const existingUser = userInfo;
  const existingUser = {
    userName: "Yulia",
    password: "Test1"
  };

  it('should allow a visitor to sign up, login and logout', function () {

    cy.visit('/')

    //Sign up
    cy.get('[data-test="signup"]').click()
    cy.get('#firstName').type(userInfo.firstName)
    cy.get('#lastName').type(userInfo.lastName)
    cy.get('#username').type(userInfo.userName)
    cy.get('#password').type(userInfo.password)
    cy.get('#confirmPassword').type(userInfo.password)
    cy.get('.MuiButton-label').click()

    //Log in
    cy.get('#username').type(userInfo.userName)
    cy.get('#password').type(userInfo.password)
    cy.get('.MuiButton-label').click()

    //Onboarding
    cy.get('[data-test="user-onboarding-dialog-title"]').should('be.visible').and('contain', 'Get Started with Real World App')
    cy.get('[data-test="user-onboarding-next"]').click()
    cy.get('[data-test="user-onboarding-dialog-title"]').should('contain', 'Create Bank Account')
    cy.get('[data-test*="bankName-input"]').type('The Best Bank')
    cy.get('[data-test*="accountNumber-input"]').type('123456789')
    cy.get('[data-test*="routingNumber-input"]').type('987654321')
    cy.get('.MuiButton-fullWidth').click()
    cy.get('[data-test="user-onboarding-dialog-title"]').should('contain', 'Finished')
    cy.get('[data-test*="user-onboarding-next"]').click()

    //Logout
    cy.get('[data-test=sidenav-signout]').click()
    cy.location("pathname").should("eq", "/signin")

  })

  it('TC1.1-Check Network Request Status - Ensure that the network request status for transactions is 200', function () {

    cy.visit('/')

    //Set up an intercept for the Get request
    cy.intercept('GET', 'http://localhost:3001/transactions/public').cy.wait('getTransactions')

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    //Wait for the GET request to complete
    cy.wait('@getTransactions').then((interception) => {
      //validate the response
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC1.2-Interact with Elements - Ensure that elements such as checkboxes, radiobuttons, and dropdowns can be interacted with.', function () {
    cy.visit('/')

    //Set up an intercept for the Get request
    cy.intercept('GET', 'http://localhost:3001/transactions/public').cy.wait('getTransactions')

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    cy.get('[data-test="transaction-list-filter-amount-range-button"]').click({ force: true })

    //Drag the first thumb to a new position
    /* cy.get('([data-test="transaction-list-filter-amount-range-slider"]')
    .find('.MuiSlider-thumb')
    .eq(0) 
    .trigger('mousedown', {which:1})
    .trigger('mousemove', { clientX:200, clientY:0})
    .trigger('mouseup'); */

    //Drag the second thumb to a new position
    cy.get('[data-test="transaction-list-filter-amount-range-slider"]')
      .find('.MuiSlider-thumb')
      .eq(1)
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 500, clientY: 0 })

    cy.contains('$0 - $290').should('be.visible')

  })

  it('TC1.3 - Render and Paginate All Transaction Feeds - Ensure that the application correctly renders and paginates all transaction feeds.', function () {
    cy.visit('/')

    //Intercept the general request
    cy.intercept('GET', 'http://localhost:3001/transactions/public').cy.wait('getTransactions')

    //Set up an intercept for the second page request
    cy.intercept('GET', 'http://localhost:3001/transactions/public?page=2').cy.wait('getTransactionsPage2')

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    // Scroll to load more
    cy.get('[class="ReactVirtualized__Grid__innerScrollContainer"]>div').last().scrollIntoView()

    //Wait for the second page request to complete and assert the conditions
    cy.wait('@getTransactionsPage2').then((interception) => {

      //Check the status code
      expect(interception.response.statusCode).to.be.oneOf([200, 304]);
    })
  })


  it('TC1.4 - Filter Transactions by Date Range - Ensure that transactions can be filtered by a specific date range', function () {
    cy.visit('/')

    //Set up an intercept for the Get request
    cy.intercept('GET', 'http://localhost:3001/transactions/public').cy.wait('getTransactions')

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    cy.get('[data-test="transaction-list-filter-date-range-button"]').click({ force: true })


    cy.get('li[style="color: rgb(255, 167, 38);"]').parent().then($ul => {
      cy.get('[style="color: rgb(255, 167, 38);"]').click({ force: true })
      const lastChildDate = $ul.children('li').last().attr('data-date');
      cy.log(lastChildDate);
      cy.get(`li[data-date="${lastChildDate}"]`).click({ force: true });

    })
  })

  it('TC2.1 - Render User Settings Form - Ensure the user settings form is rendered correctly.', function () {
    cy.visit('/')

    cy.intercept('GET', 'http://localhost:3001/user/settings').cy.wait('getSettings')

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    //Open User Settings
    cy.get('[data-test="sidenav-user-settings"]').click();

    // Add Email and Phone number to User Settings
    cy.get('[data-test="user-settings-email-input"]').type('123@gmail.com')
    cy.get('[data-test="user-settings-phoneNumber-input"]').type('987654321')

    cy.get('button.MuiButton-root').click();
  })

  it('TC2.2 - Display User Setting Form Errors - Ensure that errors are displayed correctly in the user settings form.', function () {
    cy.visit('/');

    cy.intercept('GET', 'http://localhost:3001/user/settings').cy.wait('getSettings');

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    //Open User Settings
    cy.get('[data-test="sidenav-user-settings"]').click();

    cy.get('[data-test="user-settings-firstName-input"]').clear()
    cy.get('#user-settings-firstName-input-helper-text').should('have.text', 'Enter a first name')

    cy.get('[data-test="user-settings-lastName-input"]').clear()
    cy.get('#user-settings-lastName-input-helper-text').should('have.text', 'Enter a last name')

    cy.get('[data-test="user-settings-email-input"]').clear()
    cy.get('#user-settings-email-input-helper-text').should('have.text', 'Enter an email address')

    cy.get('[data-test="user-settings-email-input"]').clear().type('test')
    cy.get('#user-settings-email-input-helper-text').should('have.text', 'Must contain a valid email address')

    cy.get('[data-test="user-settings-phoneNumber-input"]').clear()
    cy.get('#user-settings-phoneNumber-input-helper-text').should('have.text', 'Enter a phone number')

    cy.get('[data-test="user-settings-phoneNumber-input"]').type('11')
    cy.get('#user-settings-phoneNumber-input-helper-text').should('have.text', 'Phone number is not valid');

  });

  it.only('TC2.3 - Update User Information - Ensure that user information (first name, last name, email, phone number) can be updated correctly.', function () {
    cy.visit('/')

    cy.intercept('GET', 'http://localhost:3001/user/settings').as('getSettings')

    //Log in
    cy.get('#username').type(existingUser.userName)
    cy.get('#password').type(existingUser.password)
    cy.get('.MuiButton-label').click()

    //Open User Settings
    cy.get('[data-test="sidenav-user-settings"]').click();

    cy.get('[data-test="user-settings-firstName-input"]').clear().type('NewName')
    cy.get('[data-test="user-settings-lastName-input"]').clear().type('Test2')
    cy.get('[data-test="user-settings-email-input"]').clear().type('newemail@gmail.com')
    cy.get('[data-test="user-settings-phoneNumber-input"]').clear().type('123123123')

    // Save updated User Settings
    cy.get('button.MuiButton-root').click();
  });

});