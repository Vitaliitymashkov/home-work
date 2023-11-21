export default class LoginPage {
    constructor() {

    }

    visit() {
        cy.visit('https://www.saucedemo.com/v1')
    }

    fillUsername(username){
        cy.get('[data-test="username"]').type(username)
    }

    fillPassword(password){
        cy.get('[data-test="password"]').type(password)
    }

    clickLoginButton(){
        cy.get('#login-button').click()
    }

    login(username,password){
        this.visit()
        this.fillUsername(username)
        this.fillPassword(password)
        this.clickLoginButton()
    }
}