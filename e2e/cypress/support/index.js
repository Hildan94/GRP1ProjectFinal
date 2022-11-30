beforeEach(() => {
    cy.intercept(`${Cypress.config('baseUrl')}**`, req => {
        req.headers['Auth'] = Cypress.env('token')

        // or to delete a header
        delete req.headers['Id']
    })
})