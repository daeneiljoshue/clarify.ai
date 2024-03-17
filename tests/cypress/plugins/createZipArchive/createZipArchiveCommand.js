

Cypress.Commands.add('createZipArchive', (directoryToArchive, arhivePath, level = 9) => cy.task('createZipArchive', {
    directoryToArchive,
    arhivePath,
    level,
}));