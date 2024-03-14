

/// <reference types="cypress" />

import { taskName } from '../../support/const';

context('Tag annotation mode.', () => {
    const caseId = '22';

    function checkFrameTagsDontExist() {
        cy.get('.clarify-canvas-frame-tags span.clarify-frame-tag').should('not.exist');
    }

    function checkCountFrameTags(countTags) {
        cy.get('.clarify-canvas-frame-tags span.clarify-frame-tag').should('have.length', countTags);
    }

    function checkPresenceFrameTags() {
        cy.get('.clarify-canvas-frame-tags').within(() => {
            cy.get('.clarify-frame-tag').should('exist');
        });
    }

    function addTag() {
        cy.get('.clarify-add-tag-button').click();
    }

    function changeCheckboxAutomaticallyGoToNextFrame(value) {
        cy.get('.clarify-tag-annotation-sidebar-checkbox-skip-frame').within(() => {
            if (value === 'check') {
                cy.get('[type="checkbox"]').check();
            } else if (value === 'uncheck') {
                cy.get('[type="checkbox"]').uncheck();
            }
        });
    }

    before(() => {
        cy.openTaskJob(taskName);
    });

    describe(`Testing case "${caseId}"`, () => {
        it('Go to tag annotation', () => {
            cy.changeWorkspace('Tag annotation');
            checkFrameTagsDontExist();
        });

        it('Add tag', () => {
            addTag();
            checkCountFrameTags(1);
            checkPresenceFrameTags();
        });

        it('Set "Automatically go to the next frame" to true and add tag', () => {
            cy.goToNextFrame(1);
            checkFrameTagsDontExist();
            changeCheckboxAutomaticallyGoToNextFrame('check');
            addTag();
            cy.checkFrameNum(2);
            checkFrameTagsDontExist();
            cy.goToPreviousFrame(1);
            checkCountFrameTags(1);
            checkPresenceFrameTags();
        });

        it('Disable show tags on frame', () => {
            cy.openSettings();
            cy.get('.clarify-settings-modal').within(() => {
                cy.contains('Workspace').click();
                cy.get('.clarify-workspace-settings-show-frame-tags').within(() => {
                    cy.get('[type="checkbox"]').uncheck();
                });
            });
            cy.closeSettings();
            cy.get('.clarify-canvas-frame-tags').should('not.exist');
        });
    });

    after(() => {
        cy.openSettings();
        cy.get('.clarify-settings-modal').within(() => {
            cy.contains('Workspace').click();
            cy.get('.clarify-workspace-settings-show-frame-tags').within(() => {
                cy.get('[type="checkbox"]').check();
            });
        });
        cy.closeSettings();
    });
});
