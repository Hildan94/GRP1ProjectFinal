describe('My first test', () => {
  it('Does not do much', () => {
    cy.visit('/')
    cy.contains('Log ind').click()
  })
})