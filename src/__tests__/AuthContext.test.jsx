import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

const b64 = obj =>
  Buffer.from(JSON.stringify(obj))
        .toString('base64')
        .replace(/=/g,'')
        .replace(/\+/g,'-')
        .replace(/\//g,'_');

const token =
  `${b64({alg:'HS256',typ:'JWT'})}.${b64({email:'me@me.com',role:'Customer'})}.sig`;

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

test('login stores token & decodes role', async () => {
    api.post.mockResolvedValueOnce({ data: { token } });

  const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });
  await act(() => result.current.login('me@me.com', 'pw'));

  expect(localStorage.getItem('token')).toBe(token);
  expect(result.current.user.role).toBe('Customer');
});
