/// <reference types="cypress" />

import LoginPage from "../../pages/loginPage"
import InventoryPage from "../../pages/inventoryPage"
const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()


describe('sauce demo login tests', () => {


    it.only('verifies that a user is able to correctly login to the site', () => {
        loginPage.login("standart_user", "secret_sauce")
        inventoryPage.getPageTitle()
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Products')
    }) 

    //* it('verifies that a user is NOT able to login with invalid password', ()=> {
    //*   cy.visit('https://www.saucedemo.com/'); 
    //*   cy.get('[data-test="username"]').type('standard_user')
    //*   cy.get('input[type="password"]').type('sauce')
    //*   cy.get('#login-button').click()
    //*   cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    // *}) 

     it('verifies that a user is able to correctly add an item to the cart', () => {
        let itemsInCart = 0
        loginPage.login("standart_useer", "secret_sauce")
        inventoryPage.getPageTitle()
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Products')
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Bike Backpack', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Bike Light', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Bike T-Shirt', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Fleece Jacket', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Onesie', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Test.allTheThings() T-Shirt (RED)', itemsInCart)
        inventoryPage.checkShoppingCartCounter(itemsInCart)

    }) 


    it('verifies that a user is able to correctly delete items from the shopping cart', () => {
        let itemsInCart = 0
        loginPage.login("standart_useer", "secret_sauce")
        inventoryPage.getPageTitle()
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Products')
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Bike Backpack', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Bike Light', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Bike T-Shirt', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Fleece Jacket', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Sauce Labs Onesie', itemsInCart)
        itemsInCart = inventoryPage.addItemToShoppingCart('Test.allTheThings() T-Shirt (RED)', itemsInCart)
        inventoryPage.checkShoppingCartCounter(itemsInCart)
        inventoryPage.clickShoppingCartIcon()
        itemsInCart = inventoryPage.removeItemFromShoppingCart('Sauce Labs Bike Backpack', itemsInCart)
        itemsInCart = inventoryPage.removeItemFromShoppingCart('Sauce Labs Bike Light', itemsInCart)
        itemsInCart = inventoryPage.removeItemFromShoppingCart('Sauce Labs Bike T-Shirt', itemsInCart)
        itemsInCart = inventoryPage.removeItemFromShoppingCart('Sauce Labs Fleece Jacket', itemsInCart)
        itemsInCart = inventoryPage.removeItemFromShoppingCart('Sauce Labs Onesie', itemsInCart)
        itemsInCart = inventoryPage.removeItemFromShoppingCart('Test.allTheThings() T-Shirt (RED)', itemsInCart)
        inventoryPage.checkShoppingCartCounter(itemsInCart)


    })

    it('should intercept network requests', () => {
        cy.visit('https://www.browserstack.com/users/sign_in')

        cy.intercept('POST', 'https://eds.browserstack.com/send_event', {
        }).as('login');

        // Your login action here
        cy.get('#user_email_login').type('standard_user');
        cy.get('#user_password').type('secret_sauce');
        cy.get('#user_submit').click();

        cy.wait('@login').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it('should allow a visitor to sign up, login and logout', function () {
        const userInfo = {
            firstName: "Bob",
            lastName: "Ross",
            userName: "newUser" + Math.floor(Math.random() * 10000),
            password: "s3cret"
        }
        cy.visit('http://localhost:3000')

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
        cy.getBySel('user-onboarding-dialog-title').should('be.visible').and('contain', 'Get Started with Real World App')
        cy.getBySel('user-onboarding-next').click()
        cy.getBySel('user-onboarding-dialog-title').should('contain', 'Create Bank Account')
        cy.getBySelLike('bankName-input').type('The Best Bank')
        cy.getBySelLike('accountNumber-input').type('123456789')
        cy.getBySelLike('routingNumber-input').type('987654321')
        cy.getByClassLike('MuiButton-fullWidth').click()
        cy.getBySel('user-onboarding-dialog-title').should('contain', 'Finished')
        cy.getBySelLike('user-onboarding-next').click()

        //Logout
        cy.getBySel('sidenav-signout').click()
        cy.location("pathname").should("eq", "/signin")
    })

    it('creates a new bank account', function () {
        const userInfo = {
            firstName: "Bob",
            lastName: "Ross",
            userName: "newUser" + Math.floor(Math.random() * 10000),
            password: "s3cret"
        }
        cy.visit('http://localhost:3000')

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
        cy.getBySel('user-onboarding-dialog-title').should('be.visible').and('contain', 'Get Started with Real World App')
        cy.getBySel('user-onboarding-next').click()
        cy.getBySel('user-onboarding-dialog-title').should('contain', 'Create Bank Account')
        cy.getBySelLike('bankName-input').type('The Best Bank')
        cy.getBySelLike('accountNumber-input').type('123456789')
        cy.getBySelLike('routingNumber-input').type('987654321')
        cy.getByClassLike('MuiButton-fullWidth').click()
        cy.getBySel('user-onboarding-dialog-title').should('contain', 'Finished')
        cy.getBySelLike('user-onboarding-next').click()


        //Create Bank account
        cy.getBySelLike('bankaccounts').click()
        cy.location("pathname").should("eq", "/bankaccounts")
        cy.getBySel('bankaccount-new').click()
        cy.location("pathname").should("eq", "/bankaccounts/new")


        cy.getBySelLike('bankName-input').type('The New Best Bank')
        cy.getBySelLike('accountNumber-input').type('123456789')
        cy.getBySelLike('routingNumber-input').type('987654321')
        cy.getByClassLike('MuiButton-fullWidth').click()
        cy.location("pathname").should("eq", "/bankaccounts")


        cy.getBySelLike("bankaccount-list-item")
            .should('be.visible')
            .and('have.length', 2)
            .eq(1)
            .should('contain', 'The New Best Bank')
    }) 


    //Lecture-4

    it('Checks extra actions', () => {
        cy.visit('https://example.cypress.io/commands/actions')
        cy.get('.action-email')
            .type('fake@email.com').should('have.value', 'fake@email.com')
            .type('{selectall}{backspace}')
            .type('slow.typing@email.com', { delay: 10 })
            .should('have.value', 'slow.typing@email.com')


        cy.get('.action-disabled')
            // Ignore error checking prior to type
            // Like whether the input is visible or disabled
            .type('disabled error checking', { force: true })

        cy.get('.action-focus').focus()
            .should('have.class', 'focus')
            .prev().should('have.attr', 'style', 'color: orange;')

        cy.get('.action-clear').type('Clear this text')
            .should('have.value', 'Clear this text')
            .clear()
            .should('have.value', '')


        cy.get('.action-form')
            .find('[type="text"]').type('HALFOFF')

        cy.get('.action-form').submit()
            .next().should('contain', 'Your form has been submitted!')

        cy.get('.action-btn').click()

        cy.get('#action-canvas').click()
        cy.get('#action-canvas').click('topLeft')
        cy.get('#action-canvas').click('top')
        cy.get('#action-canvas').click('topRight')
        cy.get('#action-canvas').click('left')
        cy.get('#action-canvas').click('right')
        cy.get('#action-canvas').click('bottomLeft')
        cy.get('#action-canvas').click('bottom')
        cy.get('#action-canvas').click('bottomRight')
        cy.get('.action-labels>.label').click({ multiple: true })
        cy.get('.action-opacity>.btn').click({ force: true })

        cy.get('.action-div').dblclick().should('be.visible').clear().type('testing it')

        cy.get('.rightclick-action-div').rightclick().should('not.be.visible')

        cy.get('.rightclick-action-input-hidden').should('be.visible')
        cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
            .check().should('be.checked')

        cy.get('.action-radios [type="radio"]').not('[disabled]')
            .check().should('be.checked')

        cy.get('.action-radios [type="radio"]')
            .check('radio2').should('be.checked')

        cy.get('.action-multiple-checkboxes [type="checkbox"]')
            .check(['checkbox1', 'checkbox2']).should('be.checked')

        cy.get('.action-checkboxes [disabled]')
            .check({ force: true }).should('be.checked')

        cy.get('.action-radios [type="radio"]')
            .check('radio3', { force: true }).should('be.checked')

        cy.get('.action-check [disabled]')
            .uncheck({ force: true }).should('not.be.checked')

        cy.get('.action-select')
            .should('have.value', '--Select a fruit--')

        cy.get('.action-select').select('apples')
        cy.get('.action-select').should('have.value', 'fr-apples')

        cy.get('.action-select-multiple')
            .select(['apples', 'oranges', 'bananas'])
            .invoke('val')
            .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

        // Select option(s) with matching value
        cy.get('.action-select').select('fr-bananas')
            // can attach an assertion right away to the element
            .should('have.value', 'fr-bananas')


        cy.get('#scroll-horizontal button')
            .should('not.be.visible')

        // scroll the button into view, as if the user had scrolled
        cy.get('#scroll-horizontal button').scrollIntoView()
            .should('be.visible')

        cy.get('#scroll-vertical button')
            .should('not.be.visible')

        // Cypress handles the scroll direction needed
        cy.get('#scroll-vertical button').scrollIntoView()
            .should('be.visible')

        cy.get('#scroll-both button')
            .should('not.be.visible')

        // Cypress knows to scroll to the right and down
        cy.get('#scroll-both button').scrollIntoView()
            .should('be.visible')

        // if you chain .scrollTo() off of cy, we will
        // scroll the entire window
        cy.scrollTo('bottom')

        cy.get('#scrollable-horizontal').scrollTo('right')

        // or you can scroll to a specific coordinate:
        // (x axis, y axis) in pixels
        cy.get('#scrollable-vertical').scrollTo(250, 250)

        // or you can scroll to a specific percentage
        // of the (width, height) of the element
        cy.get('#scrollable-both').scrollTo('75%', '25%')

        // control the easing of the scroll (default is 'swing')
        cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

        // control the duration of the scroll (in ms)
        cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })


        cy.get('.trigger-input-range')
            .invoke('val', 25)
            .trigger('change')
            .get('input[type=range]').siblings('p')
            .should('have.text', '25')


    }) 



    //Lecture4-second part

    it('Checks backend requests', () => {
        cy.request('https://jsonplaceholder.cypress.io/comments')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(500)
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
            })

        cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
            .its('body.0') // yields the first element of the returned list
            .then((user) => {
                expect(user).property('id').to.be.a('number')
                // make a new post on behalf of the user
                cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
                    userId: user.id,
                    title: 'Cypress Test Runner',
                    body: 'Fast, easy and reliable testing for anything that runs in a browser.',
                })
            }) 

            // note that the value here is the returned value of the 2nd request
            // which is the new post object
            .then((response) => {
                expect(response).property('status').to.equal(201) // new entity created
                expect(response).property('body').to.contain({
                    title: 'Cypress Test Runner',
                }) 
                // we don't know the exact post id - only that it will be > 100
                // since JSONPlaceholder has built-in 100 posts
               expect(response.body).property('id').to.be.a('number')
                    .and.to.be.gt(100) 
                // we don't know the user id here - since it was in above closure
                // so in this test just confirm that the property is there
               expect(response.body).property('userId').to.be.a('number')
            }) 


        cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
            .its('body.0') // yields the first element of the returned list
            .as('user') // saves the object in the test context
            .then(function () {
                // NOTE 👀
                //  By the time this callback runs the "as('user')" command
                //  has saved the user object in the test context.
                //  To access the test context we need to use
                //  the "function () { ... }" callback form,
                //  otherwise "this" points at a wrong or undefined object!
                cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
                    userId: this.user.id,
                    title: 'Cypress Test Runner',
                    body: 'Fast, easy and reliable testing for anything that runs in a browser.',
                })
                    .its('body').as('post') // save the new post from the response
            })
            .then(function () {
                // When this callback runs, both "cy.request" API commands have finished
                // and the test context has "user" and "post" objects set.
                // Let's verify them.
                expect(this.post, 'post has the right user id')
                    .property('userId').to.equal(this.user.id)
            })

            cy.visit('https://example.cypress.io/commands/network-requests')
            let message = 'whoa, this comment does not exist'

            // Listen to GET to comments/1
            cy.intercept('GET', '**/comments/*').as('getComment')
            
            // we have code that gets a comment when
            // the button is clicked in scripts.js
            cy.get('.network-btn').click()
            
            // https://on.cypress.io/wait
            cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
            
            // Listen to POST to comments
            cy.intercept('POST', '**/comments').as('postComment')
            
            // we have code that posts a comment when
            // the button is clicked in scripts.js
            cy.get('.network-post').click()
            cy.wait('@postComment').should(({ request, response }) => {
              expect(request.body).to.include('email')
              expect(request.headers).to.have.property('content-type')
              expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
            })
            
            // Stub a response to PUT comments/ ****
            cy.intercept({
              method: 'PUT',
              url: '**/comments/*',
            }, {
              statusCode: 404,
              body: { error: message },
              headers: { 'access-control-allow-origin': '*' },
              delayMs: 500,
            }).as('putComment')
            
            // we have code that puts a comment when
            // the button is clicked in scripts.js
            cy.get('.network-put').click()
            
            cy.wait('@putComment')
            
            // our 404 statusCode logic in scripts.js executed
            cy.get('.network-put-comment').should('contain', message)
    }) 
})

