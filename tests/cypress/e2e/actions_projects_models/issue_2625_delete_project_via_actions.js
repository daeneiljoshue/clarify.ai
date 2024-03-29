

/// <reference types="cypress" />

import { projectName } from '../../support/const_project';

context('Delete a project via actions.', () => {
    const issueID = 2625;

    before(() => {
        cy.openProject(projectName);
    });

    describe(`Testing "Issue ${issueID}"`, () => {
        it('Delete a project via actions.', () => {
            cy.deleteProjectViaActions(projectName);
        });
    });
});