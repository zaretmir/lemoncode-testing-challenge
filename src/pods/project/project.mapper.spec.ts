import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('project mapper should', () => {
  it('should create an empty view model project when undefined api project is passed', () => {
    // Given
    const emptyVmProject: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    // When
    const resultingVmProject: viewModel.Project = mapProjectFromApiToVm(undefined);

    // Then
    expect(resultingVmProject).toEqual(emptyVmProject);
  });

  it('should create an empty view model project when null api project is passed', () => {
    // Given
    const emptyVmProject: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    // When
    const resultingVmProject: viewModel.Project = mapProjectFromApiToVm(null);

    // Then
    expect(resultingVmProject).toEqual(emptyVmProject);
  });

  it('should map an API EmployeeSummary with empty array of employees to a view model EmployeeSummary with empty array of employees', () => {
    // Given
    const anApiProject: apiModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: [],
    };

    const emptyVmProject: viewModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: [],
    };

    // When
    const resultingVmProject: viewModel.Project = mapProjectFromApiToVm(anApiProject);

    // Then
    expect(resultingVmProject).toEqual(emptyVmProject);
  });

  it('should map an API EmployeeSummary with null employees to a view model EmployeeSummary with empty array of employees', () => {
    // Given
    const anApiProject: apiModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: null,
    };

    const emptyVmProject: viewModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: [],
    };

    // When
    const resultingVmProject: viewModel.Project = mapProjectFromApiToVm(anApiProject);

    // Then
    expect(resultingVmProject).toEqual(emptyVmProject);
  })

  it('should map an API EmployeeSummary with empty array of employees to a view model EmployeeSummary with empty array of employees', () => {
    // Given
    const anApiProject: apiModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: undefined,
    };

    const emptyVmProject: viewModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: [],
    };

    // When
    const resultingVmProject: viewModel.Project = mapProjectFromApiToVm(anApiProject);

    // Then
    expect(resultingVmProject).toEqual(emptyVmProject);
  })

  it('should map an API EmployeeSummary with employees to view model EmployeeSummary', () => {
    // Given
    const anApiProject: apiModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: [
        {
          id: 'employee1',
          isAssigned: true,
          employeeName: 'An Employee',
        },
        {
          id: 'employee2',
          isAssigned: false,
          employeeName: 'Another Employee',
        },
      ]
    };

    const expectedVmProject: viewModel.Project = {
      id: 'anId',
      name: 'aName',
      externalId: 'anExternalId',
      comments: 'aComment',
      isActive: true,
      employees: [
        {
          id: 'employee1',
          isAssigned: true,
          employeeName: 'An Employee',
        },
        {
          id: 'employee2',
          isAssigned: false,
          employeeName: 'Another Employee',
        },
      ],
    };

    // When
    const resultingVmProject: viewModel.Project = mapProjectFromApiToVm(anApiProject);

    // Then
    expect(resultingVmProject).toEqual(expectedVmProject);
  });

});
