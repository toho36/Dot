
import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from '../Components/MyComponent';


test('renders with the correct name', () => {
  const { getByText } = render(<MyComponent name="World" />);
  const element = getByText(/Hello, World!/i);
});