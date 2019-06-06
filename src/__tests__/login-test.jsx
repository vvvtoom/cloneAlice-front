import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../pages/Login';
import { loginWitheMail } from '../helpers/auth';

configure({ adapter: new Adapter() });

describe('Login', () => {
  it('Must be rendered successfully', () => {
    mount(<Login loading={false} />);
  });

  it('must be logged in successfully', () => {
    return loginWitheMail('admin@admin.cc', '123123')
      .catch((err) => {
        expect(err.code).toEqual(null);
      });
  });

  it('wrong-password test', () => {
    return loginWitheMail('admin@admin.cc', '12312311')
      .catch((err) => {
        expect(err.code).toEqual('auth/wrong-password');
      });
  });

  it('invalid-email test', () => {
    return loginWitheMail('invalid-email', 'password')
      .catch((err) => {
        expect(err.code).toEqual('auth/invalid-email');
      });
  });

  it('user-not-found test', () => {
    return loginWitheMail('unregisteredUser@mail.com', 'password')
      .catch((err) => {
        expect(err.code).toEqual('auth/user-not-found');
      });
  });
});
