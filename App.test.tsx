import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('App', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      name: '',
      email: '',
      password: ''
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Step One')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
  });
});
