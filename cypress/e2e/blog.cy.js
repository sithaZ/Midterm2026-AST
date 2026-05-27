describe('Blog Platform UI Tests', () => {
  const testEmail = `itc${Date.now()}@test.com`
  const testPassword = '123456'

  it('should register a new user', () => {
    cy.visit('http://localhost:5173/register')

    cy.get('input[type="email"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword)

    cy.get('button').contains('Register').click()

    cy.contains('Register successful')
  })

  it('should login successfully', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[type="email"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword)

    cy.get('button').contains('Login').click()

    cy.url().should('include', '/posts')
  })

  it('should show login validation error', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('button').contains('Login').click()

    cy.contains('All fields are required')
  })

  it('should create a post', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[type="email"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword)

    cy.get('button').contains('Login').click()

    cy.url().should('include', '/posts')

    cy.get('button').contains('Create Post').click()

    cy.get('input[type="text"]').type('Cypress Test Post')
    cy.get('textarea').type('Created by Cypress.')

    cy.get('button').contains('Create').click()

    cy.url().should('include', '/posts')
    cy.contains('Cypress Test Post')
  })

  it('should edit a post', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[type="email"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword)

    cy.get('button').contains('Login').click()

    cy.get('button').contains('Edit').first().click()

    cy.get('input[type="text"]').clear().type('Updated Cypress Post')
    cy.get('textarea').clear().type('Updated by Cypress.')

    cy.get('button').contains('Update').click()

    cy.contains('Updated Cypress Post')
  })

  it('should delete a post', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[type="email"]').type(testEmail)
    cy.get('input[type="password"]').type(testPassword)

    cy.get('button').contains('Login').click()

    cy.contains('Updated Cypress Post')

    cy.get('button').contains('Delete').first().click()

    cy.contains('Updated Cypress Post').should('not.exist')
  })

  it('should show 404 page', () => {
    cy.visit('http://localhost:5173/random-page')

    cy.contains('404')
    cy.contains('Page Not Found')
  })
})