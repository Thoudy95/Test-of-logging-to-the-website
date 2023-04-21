describe('UI testing for sampleApp', () => {
beforeEach(() => {
    cy.visit('http://uitestingplayground.com/sampleapp')
  })
  it('check if sampleApp page is loaded', () => {
      cy.url().should('eq','http://uitestingplayground.com/sampleapp')
})

it('check if inputs are visible', () => {
cy.get('input[class*="form-control"]')
	 .should('be.visible')
})

it('select login without putting credentials', () => {
   cy.get('button[id*="login"]').click()
   cy.contains('Invalid username/password')
   	 .should('be.visible')
})

it('trying to login with wrong credentials', () => {
cy.get('input[type*="text"]')
     .clear()
	 .type('Jan')
cy.get('input[type*="password"]')
     .clear()
	 .type('Kowalski')
cy.get('button[id*="login"]').click()
})

it('trying to login with correct credentials', () => {
cy.get('input[type*="text"]')
     .clear()
	 .type('Jan')
cy.get('input[type*="password"]')
     .clear()
     .type('pwd')
cy.get('button[id*="login"]').click()
cy.contains('Welcome')
    .should('be.visible')
})

it('open home page and check the correct page is loaded', () => {
cy.get('[href*="/home"]')
	 .click()
cy.contains('UI Test Automation')
    .should('be.visible')
    cy.url().should('include','/home')
})

it('open resources page and check the correct page is loaded', () => {
cy.get('[href*="/resources"]')
	 .click()
cy.contains('Learning')
    .should('be.visible')
    cy.url().should('include','/resources')
})
	
it('trying to login with special characters', () => {
cy.get('input[type*="text"]')
     .clear()
	 .type('Jan?/%$!!*^~~+#4@@{}&łśśą@#')
cy.get('input[type*="password"]')
     .clear()
	 .type('Kowalski$$2455&^*!!@#".??+ą/qś')
cy.get('button[id*="login"]').click()
 cy.contains('Invalid username/password')
   	 .should('be.visible')
})

it('sql injection test', () => {
cy.get('input[type*="text"]')
     .clear()
	 .type('http://uitestingplayground.com/sampleapp/product.php?id=10')
cy.get('input[type*="password"]')
     .clear()
	 .type('http://uitestingplayground.com/sampleapp/product.php?id=10; INSERT INTO users (…)')
cy.get('button[id*="login"]').click()
 cy.contains('Invalid username/password')
   	 .should('be.visible')
})

})





