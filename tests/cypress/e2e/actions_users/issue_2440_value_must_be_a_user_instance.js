

/// <reference types="cypress" />

import { taskName } from '../../support/const';

context('Value must be a user instance.', () => {
    const issueId = '2440';

    before(() => {
        cy.openTask(taskName);
    });

    describe(`Testing issue "${issueId}"`, () => {
        it('Assign a task to a user', () => {
            cy.get('.clarify-task-details-user-block').within(() => {
                cy.get('.clarify-user-search-field').click();
            });
            cy.get('.ant-select-dropdown')
                .not('.ant-select-dropdown-hidden')
                .within(() => {
                    cy.get(`.ant-select-item-option[title="${Cypress.env('user')}"]`).click();
                });
            cy.get('.clarify-spinner').should('not.exist');
        });
        it('Assign the task to the same user again', () => {
            cy.get('.clarify-task-details-user-block').within(() => {
                cy.get('.clarify-user-search-field').click();
            });
            cy.get('.ant-select-dropdown')
                .not('.ant-select-dropdown-hidden')
                .within(() => {
                    cy.get(`.ant-select-item-option[title="${Cypress.env('user')}"]`).click();
                });
            // Before fix:
            // The following error originated from your application code, not from Cypress.
            // > Value must be a user instance
            cy.get('.clarify-spinner', { timeout: 500 }).should('not.exist');
            // Remove the user's assignment for next tests.
            cy.get('.clarify-task-details-user-block').within(() => {
                cy.get('input').click();
                cy.get('input').clear();
                cy.get('input').type('{Enter}');
            });
        });
    });
});