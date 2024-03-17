

Cypress.Commands.add(
    'compareImages',
    (imgBase, imgAfterChanges) => cy.task('compareImages', {
        imgBase,
        imgAfterChanges,
    }),
);