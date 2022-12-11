

describe('Render homepage', () => {
    it('mounts', () => {
        //cy.visit('/')
        cy.visit('https://nem.grp1.diplomportal.dk')
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
            url: 'https://nem.grp1.diplomportal.dk/api/login',
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
            url: 'https://nem.grp1.diplomportal.dk/api/quiznew',
            headers: {Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJTZXJ2ZXIiLCJleHAiOjE2NzA5MjY4NDUsInVzZXIiOiJ7XCJpZFwiOjMxNTIsXCJ1c2VybmFtZVwiOlwiaGlsZGlcIixcInBhc3N3b3JkXCI6bnVsbH0ifQ.ieGdgiSjAlZ3fYN3I6kNN9DOvgcPKG7aPkU5-__DWaYp6C04lZzY1XYK6bcJ1uHvZvbMPhKqokYztDLyjLg_Wg'
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