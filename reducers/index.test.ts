import rootReducer from '../reducers';

describe('rootReducer', () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NAME', () => {
    expect(
      rootReducer(initialState, { type: 'SET_NAME', payload: 'John Doe' })
    ).toEqual({ ...initialState, name: 'John Doe' });
  });

  it('should handle SET_EMAIL', () => {
    expect(
      rootReducer(initialState, { type: 'SET_EMAIL', payload: 'john@example.com' })
    ).toEqual({ ...initialState, email: 'john@example.com' });
  });

  it('should handle SET_PASSWORD', () => {
    expect(
      rootReducer(initialState, { type: 'SET_PASSWORD', payload: 'password123' })
    ).toEqual({ ...initialState, password: 'password123' });
  });
});
