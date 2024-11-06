describe('AuthPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Adjust the URL to match your routing setup
  });

  it('should display an error if passwords do not match', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="password_confirmation"]').type('password321');
    cy.get('button').contains('Create an account').click();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('should display an error if the form submission fails', () => {
    cy.intercept('POST', '/api/signup', {
      statusCode: 400,
      body: { message: 'Signup failed' },
    }).as('postSignUp');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="password_confirmation"]').type('password123');
    cy.get('button').contains('Create an account').click();

    cy.wait('@postSignUp');
    cy.contains('Signup failed').should('be.visible');
  });

  it('should navigate to login page on successful signup', () => {
    cy.intercept('POST', '/api/signup', {
      statusCode: 200,
      body: {},
    }).as('postSignUp');

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="password_confirmation"]').type('password123');
    cy.get('button').contains('Create an account').click();

    cy.wait('@postSignUp');
    cy.url().should('include', '/login');
  });
});