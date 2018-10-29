const User = require('../../models/users-db');
const assert = require('chai').assert;

describe('User Implementation Model Schema Tests', () => {

    describe('Default created user', () => {
        let newUser = new User();

        it('User name should be string', () => {
            assert.isString(newUser.name, 'User name is string.');
        });

        it(`User name should be empty by default`, () => {
            assert.isEmpty(newUser.name);
        });

        it('User password should be string', () => {
            assert.isString(newUser.password, 'User password is string.');
        });

        it('User password should be empty by default', () => {
            assert.isEmpty(newUser.password);
        })
    });

    describe('Created user with updated name and password', () => {

        const name = 'Bob_Hoskin';
        const password = '777';

        let newUser = new User();
        newUser.name = name;
        newUser.password = password;

        it('User name should be string', () => {
            assert.isString(newUser.name, 'User name is string.');
        });

        it(`User name should updated to ${name}`, () => {
            assert.strictEqual(newUser.name, name, `User name successfully updated to '${name}'`);
        });

        it('User password should be string', () => {
            assert.isString(newUser.password, 'User password is string.');
        });

        it(`User password should be updated to ${password}`, () => {
            assert.strictEqual(newUser.password, password, `User password successfully updated to '${password}'`);
        });
    })
});