import React from 'react';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';

describe('Spinner component', function() {

  it('is displayed when the promise has not been resolved', function() {
    jest.spyOn(promiseTracker, 'usePromiseTracker').mockReturnValue({ 'promiseInProgress': true });
    render(<SpinnerComponent />);
    const loader = screen.getByRole('progressbar');

    expect(loader).toBeInTheDocument();

  });

  it('is displayed when the promise has not been resolved', function() {
    jest.spyOn(promiseTracker, 'usePromiseTracker').mockReturnValue({ 'promiseInProgress': false });
    render(<SpinnerComponent />);
    const loader = screen.queryByRole('progressbar');

    expect(loader).not.toBeInTheDocument();

  });
});
