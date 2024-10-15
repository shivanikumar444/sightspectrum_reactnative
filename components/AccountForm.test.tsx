/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccountForm from '../components/AccountForm';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockStore = configureStore([]);
const mockAxios = new MockAdapter(axios);

describe('AccountForm', () => {
  let store: any;
  
  beforeEach(() => {
    store = mockStore({
      name: '',
      email: '',
      password: ''
    });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    expect(getByText('Name:')).toBeTruthy();
    expect(getByText('Email:')).toBeTruthy();
    expect(getByText('Password:')).toBeTruthy();
  });

  it('handles form input correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Enter email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'password123');

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'SET_NAME', payload: 'John Doe' },
      { type: 'SET_EMAIL', payload: 'john@example.com' },
      { type: 'SET_PASSWORD', payload: 'password123' },
    ]);
  });

  it('submits form data successfully', async () => {
    mockAxios.onPost('http://localhost:8080/api/accounts').reply(200, { message: 'Account created' });

    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Enter email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'password123');
    fireEvent.press(getByText('Create Account'));

    const alertSpy = jest.spyOn(global, 'alert');
    await mockAxios.waitForAll();
    expect(alertSpy).toHaveBeenCalledWith('Success', 'Account created successfully');
  });

  it('handles form submission error', async () => {
    mockAxios.onPost('http://localhost:8080/api/accounts').reply(400, { message: 'Error' });

    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AccountForm />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Enter name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Enter email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'password123');
    fireEvent.press(getByText('Create Account'));

    const alertSpy = jest.spyOn(global, 'alert');
    await mockAxios.waitForAll();
    expect(alertSpy).toHaveBeenCalledWith('Error', 'Failed to create account');
  });
});
