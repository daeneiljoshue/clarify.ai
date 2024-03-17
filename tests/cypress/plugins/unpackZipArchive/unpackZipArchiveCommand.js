

Cypress.Commands.add('unpackZipArchive', (arhivePath, extractPath) => cy.task('unpackZipArchive', {
    arhivePath,
    extractPath,
}));