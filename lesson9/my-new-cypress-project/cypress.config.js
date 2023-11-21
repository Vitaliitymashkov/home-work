// Lecture-4(17/10)

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  video: true,
 /* reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  } */

  env: {
    username: "standart_user",
    password: "secret_sauce"
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



