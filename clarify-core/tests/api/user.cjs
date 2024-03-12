
// Setup mock for a server
jest.mock('../../src/server-proxy', () => {
    return {
        __esModule: true,
        default: require('../mocks/server-proxy.mock.cjs'),
    };
});

const clarify = require('../../src/api').default;
const User = require('../../src/user').default;

// Test cases
describe('Feature: get a list of users', () => {
    test('get all users', async () => {
        const result = await clarify.users.get();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(2);
        for (const el of result) {
            expect(el).toBeInstanceOf(User);
        }
    });

    test('get only self', async () => {
        const result = await clarify.users.get({
            self: true,
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(1);
        expect(result[0]).toBeInstanceOf(User);
    });

    test('get users with unknown filter key', async () => {
        expect(
            clarify.users.get({
                unknown: '50',
            }),
        ).rejects.toThrow(clarify.exceptions.ArgumentError);
    });

    test('get users with invalid filter key', async () => {
        expect(
            clarify.users.get({
                self: 1,
            }),
        ).rejects.toThrow(clarify.exceptions.ArgumentError);
    });
});