

/// <reference types="cypress" />

Cypress.Commands.add('goToModelsList', () => {
    cy.get('a[value="models"]').click();
    cy.url().should('include', '/models');
    cy.get('.clarify-models-page').should('exist');
});