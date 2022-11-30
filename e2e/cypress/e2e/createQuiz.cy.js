

describe('Render homepage', () => {
    it('mounts', () => {
        cy.visit('/')
        //cy.visit('https://nem.grp1.diplomportal.dk')
    })

    it('insert username and password', () => {
        cy.get('input[name=Brugernavn]').click()
        cy.get('input[name=Brugernavn]').type("hildi")
        cy.get('input[name=Kodeord]').click()
        cy.get('input[name=Kodeord]').type('123')
        cy.contains('Log ind').click()
    })

    it('login request', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/login',
            body: {
                "username": "hildi",
                "password": "123"
            }
        })
            .then((resp) => {
                window.localStorage.setItem('jwt', resp.body)
            })
    })


    it('navigate to a quiz and click create new quiz', () => {
        cy.get('button[name=Matematik]').click()
        cy.get('button[name=newQuiz]').click()
    })

    it('Insert quiz name, choose category and create quiz', () => {
        cy.get('input[name=Quizname]').click()
        cy.get('input[name=Quizname]').type("Cypress test quiz")
        cy.get('select[name=Category]').select('Matematik')
    })

    it('create quiz request', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/quiznew',
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJTZXJ2ZXIiLCJleHAiOjE2Njk5OTk3MzQsInVzZXIiOiJ7XCJpZFwiOjE1MDQsXCJ1c2VybmFtZVwiOlwiVHJvZWxzXCIsXCJwYXNzd29yZFwiOm51bGx9In0.IB5qKVyVe9TurVgyHsHaobFEb0MmZtODyFcA5vqvr5yUp3Q8qghw-xf2czUccSCVxWS4_r7VTpJfj5CuXHMbJw'
            },
            body: {
                "quizName": "Cypress test",
                "category": "Matematik",
                "children": []
            }
        }).then(response => {
            const quizId = response.body;
            return quizId
        })
    })
})