import { mockEmployeeList } from '../../src/pods/employee-list/api/employee-list.mock-data';

describe('Employee list scene', function() {
  describe('Search feature', () => {
    it('puts the focus on the employee search input when clicking on it', () => {
      // When
      cy.visit('/employees');
      cy.findByPlaceholderText('Buscar empleado').as('employeeSearchInput');
      cy.get('@employeeSearchInput').click();

      // Then
      cy.get('@employeeSearchInput').should('have.focus');
    });

    it('sets the value of the search term to whatever the user types', () => {
      // Given
      const searchTerm = 'Ana Banana';

      // When
      cy.visit('/employees');
      cy.findByPlaceholderText('Buscar empleado').as('employeeSearchInput');
      cy.get('@employeeSearchInput').type(searchTerm);

      // Then
      cy.get('@employeeSearchInput').should('have.value', searchTerm);
    });

    it('filters the employees by the search text', () => {
      // Given
      const searchTerm = 'Gomez';
      const employeesMatchingSearchTerm = 2

      // When
      cy.visit('/employees');
      cy.findByPlaceholderText('Buscar empleado').as('employeeSearchInput');
      cy.get('@employeeSearchInput').type(searchTerm);
      cy.get('tbody>tr').as('employeesRows')

      // Then
      cy.get('@employeesRows')
        .should('have.length', employeesMatchingSearchTerm);
      cy.get('@employeesRows')
        .filter(`:contains("${searchTerm}")`)
        .should('have.length', employeesMatchingSearchTerm);
    })
  });

  describe('Employees list', function() {
    // NOTE:
    // Data is mocked and includes a total of eight employees. We show max five employees per page, so:
    const expectedPages = 2
    const employeesInFirstPage = 5;
    const employeesInSecondPage = 3;

    it('paginates results', function() {
      // When
      cy.visit('/employees');
      cy.findAllByRole('button', { name: /page \d/i }).as('paginationButtons');

      // Then
      cy.get('@paginationButtons').should('have.length', expectedPages);
    });

    it('shows the first five employees on the first page', function() {
      // When
      cy.visit('/employees');
      cy.get('tbody>tr').as('employeesRows')

      // Then
      cy.get('@employeesRows').should('have.length', employeesInFirstPage);
      cy.get('@employeesRows').contains('td', mockEmployeeList[0].id);
      cy.get('@employeesRows').contains('td', mockEmployeeList[1].id);
      cy.get('@employeesRows').contains('td', mockEmployeeList[2].id);
      cy.get('@employeesRows').contains('td', mockEmployeeList[3].id);
      cy.get('@employeesRows').contains('td', mockEmployeeList[4].id);
    });

    it('shows the remaining employees (max five) when navigating to the second page', function() {
      // When
      cy.visit('/employees');
      cy.get('tbody>tr').as('employeesRows')
      cy.findByRole('button', { name: /page 2/i }).as('page2button');
      cy.get('@page2button').click();

      // Then
      cy.get('@employeesRows').should('have.length', employeesInSecondPage);
      cy.get('@employeesRows').contains('td', mockEmployeeList[5].id);
      cy.get('@employeesRows').contains('td', mockEmployeeList[6].id);
      cy.get('@employeesRows').contains('td', mockEmployeeList[7].id);
    });
  });

  describe('New employee button', function() {
    it('navigates to new employee form when clicked', function() {
      // When
      cy.visit('/employees')
      cy.findAllByRole('button').contains(/nuevo empleado/i).as('newEmployeeButton')
      cy.get('@newEmployeeButton').click()

      // Then
      cy.location().should((location) => {
        expect(location.hash).to.eq('#/employees/0')
      })
    });
  });

});
