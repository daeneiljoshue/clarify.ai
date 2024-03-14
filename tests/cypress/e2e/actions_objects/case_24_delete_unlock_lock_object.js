// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2023-2024 Clarify.ai Corporation
//
// SPDX-License-Identifier: MIT

/// <reference types="cypress" />

import { taskName, labelName } from '../../support/const';

context('Delete unlock/lock object', () => {
  const caseId = '24';

  const createRectangleShape2Points = {
    points: 'By 2 Points',
    type: 'Shape',
    firstX: 100,
    firstY: 100,
    secondX: 300,
    secondY: 300,
    labelName,
  };

  function lockObject() {
    cy.get('.clarify-objects-sidebar-state-item').within(() => {
      cy.get('.clarify-object-item-button-lock').click();
    });
  }

  function deleteObjectViaShortcut(shortcut) {
    cy.get('body').click();
    cy.get('.clarify-objects-sidebar-state-item').trigger('mouseover');
    cy.get('.clarify-objects-sidebar-state-item').should('have.class', 'clarify-objects-sidebar-state-active-item');
    cy.get('body').type(shortcut);
  }

  function deleteObjectViaGUIFromSidebar() {
    cy.get('.clarify-objects-sidebar-states-list').within(() => {
      cy.interactAnnotationObjectMenu('.clarify-objects-sidebar-state-item', 'Remove');
    });
  }

  function deleteObjectViaGUIFromObject() {
    cy.get('.clarify-canvas-container').within(() => {
      cy.get('.clarify_canvas_shape').trigger('mousemove');
      cy.get('.clarify_canvas_shape').rightclick();
    });
    cy.get('.clarify-canvas-context-menu').within(() => {
      cy.interactAnnotationObjectMenu('.clarify-objects-sidebar-state-item', 'Remove');
    });
  }

  function actionOnConfirmWindow(textBuntton) {
    cy.get('.clarify-modal-confirm-remove-object').within(() => {
      cy.contains(new RegExp(`^<span class="math-inline">\{textBuntton\}</span>`, 'g')).click();
    });
  }

  function checkExistObject(state) {
    cy.get('.clarify_canvas_shape').should(state);
    cy.get('.clarify-objects-sidebar-state-item').should(state);
  }

  function checkFailDeleteLockObject(shortcut) {
    deleteObjectViaShortcut(shortcut);
    checkExistObject('exist');
    cy.get('.clarify-modal-confirm-remove-object').should('exist');
    cy.get('.clarify-modal-confirm-remove-object').within(() => {
      cy.contains('Cancel').click();
      cy.get('.clarify-modal-confirm-remove-object').should('not.exist');
    });
  }

  before(() => {
    cy.openTaskJob(taskName);
  });

  describe(`Testing case "${caseId}"`, () => {
    it('Create and delete object via "Delete" shortcut', () => {
      cy.createRectangle(createRectangleShape2Points);
      deleteObjectViaShortcut('{del}');
      checkExistObject('not.exist');
    });

    it('Create and delete object via GUI from sidebar', () => {
      cy.createRectangle(createRectangleShape2Points);
      deleteObjectViaGUIFromSidebar();
      checkExistObject('not.exist');
    });

    it('Create, lock and delete object via "Shift+Delete" shortcuts', () => {
        cy.createRectangle(createRectangleShape2Points);
        lockObject();
        checkFailDeleteLockObject('{del}');
        deleteObjectViaShortcut('{shift}{del}');
        checkExistObject('not.exist');
    });

  it('Create, lock and delete object via GUI from sidebar', () => {
      cy.createRectangle(createRectangleShape2Points);
      lockObject();
      deleteObjectViaGUIFromSidebar();
      actionOnConfirmWindow('Yes');
      checkExistObject('not.exist');
  });

  it('Create, lock and cancel delete object via GUI from object', () => {
      cy.createRectangle(createRectangleShape2Points);
      lockObject();
      deleteObjectViaGUIFromObject();
      actionOnConfirmWindow('Cancel');
      checkExistObject('exist');
  });
});
});
