describe('Login e registro de usuarios alura pic', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('POST', 'https://alura-fotos.herokuapp.com/user/login', {
      statusCode: 400
    }).as('stubPost')
  })

  it('verifica mensagens validacao', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible');

    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
  })

  it('verifica mensagens de email invalido', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    
    cy.get('input[formcontrolname="email"]').type('muril')
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
  })

  it('verifica mensagens com menos de 8 caracteres', () => {
    cy.contains('a', 'Register now').click();
    cy.contains('button', 'Register').click();
    
    cy.get('input[formcontrolname="password"]').type('123')
    cy.contains('button', 'Register').click();
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
  })

  it.only('fazer login de usuario valido', () => {
    cy.login(Cypress.env('userName'), Cypress.env('password'))
    cy.wait('@stubPost')
    cy.contains('a', '(Logout)').should('be.visible');
  })

  it.only('fazer login de usuario invalido', () => {
    cy.login('muri', '1234')
    cy.on('window:alert', (Logout) => {
      expect(str).to.equal('Invalid user name or password')
    })
  })

  const usuarios = require('../../fixtures/usuario.json')
  usuarios.forEach(usuario => {
    
    it.only(`registra novo usuário ${usuario.userName}`, () => {
      cy.contains('a','Register now').click();
      cy.contains('button','Register').click();
      cy.get('input[formcontrolname="email"]').type(usuario.email);
      cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
      cy.get('input[formcontrolname="userName"]').type(usuario.userName);
      cy.get('input[formcontrolname="password"]').type(usuario.password);
      cy.contains('button','Register').click();
    })
  })
})