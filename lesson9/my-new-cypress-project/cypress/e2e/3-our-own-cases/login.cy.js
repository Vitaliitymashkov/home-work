/// <reference types="cypress" />

import LoginPage from "../../pages/loginPage"
import login from "../../support/commands"

describe('sauce demo login tests', () => {
    const loginPage = new LoginPage()

    it.only('verifies that a user is able to correctly login to the site',()=> {
        loginPage.login("standart_useer", "secret_sauce")
        cy.get('.product_label').should('exist')
    })

    it('verifies that a user is NOT able to login with invalid password', ()=> {
        cy.visit('https://www.saucedemo.com/'); 
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('input[type="password"]').type('sauce')
        cy.get('#login-button').click()
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('verifies that a user is able to correctly add an item to the cart',()=> {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('input[type="password"]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('.product_label').should('exist')
        cy.get('div[class=inventory_list] >div:has(a>div:contains(Sauce Labs Bike Light)) button').click()
        cy.get('div[class=inventory_list] >div:has(a>div:contains(Sauce Labs Bike Light)) button').should('have.text', 'REMOVE')
    })
     
})