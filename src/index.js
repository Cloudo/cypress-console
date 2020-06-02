import Runnable from './runnable'
const Driver = require('./driver')

export const cy = () => {
  const Cypress = Driver.create({
    browser: {
      displayName: 'Chrome',
      name: 'chrome',
      family: 'chromium',
      // channel: 'stable',
      // isChosen: true,
      // isHeaded: true,
      // isHeadless: false,
    },
  })
  Cypress.onSpecWindow(window)
  Cypress.state('window', window)
  Cypress.state('document', window.document)

  const runnable = new Runnable('runnable', () => {})

  Cypress.cy.setRunnable(runnable, 'hookName')

  return Cypress.cy
}

export const spec = (fn) => {
  fn(cy())
}
