

// Setup mock for a server
jest.mock('../../src/server-proxy', () => {
    return {
        __esModule: true,
        default: require('../mocks/server-proxy.mock.cjs'),
    };
});

const clarify = require('../../src/api').default;
const { Job } = require('../../src/session');

// Test cases
describe('Feature: get a list of jobs', () => {
    test('get jobs by a task id', async () => {
        const result = await clarify.jobs.get({
            filter: JSON.stringify({ and: [{ '==': [{ var: 'task_id' }, 3] }] }),
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(2);
        for (const el of result) {
            expect(el).toBeInstanceOf(Job);
        }

        expect(result[0].taskId).toBe(3);
        expect(result[0].taskId).toBe(result[1].taskId);
    });

    test('get jobs by an unknown task id', async () => {
        const result = await clarify.jobs.get({
            filter: JSON.stringify({ and: [{ '==': [{ var: 'task_id' }, 50] }] }),
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(0);
    });

    test('get jobs by a job id', async () => {
        const result = await clarify.jobs.get({
            jobID: 1,
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(1);
    });

    test('get jobs by an unknown job id', async () => {
        const result = await clarify.jobs.get({
            jobID: 50,
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(0);
    });

    test('get jobs by invalid filter with both taskID and jobID', async () => {
        expect(
            clarify.jobs.get({
                taskID: 1,
                jobID: 1,
            }),
        ).rejects.toThrow(clarify.exceptions.ArgumentError);
    });

    test('get jobs by invalid job id', async () => {
        expect(
            clarify.jobs.get({
                jobID: '1',
            }),
        ).rejects.toThrow(clarify.exceptions.ArgumentError);
    });

    test('get jobs by invalid task id', async () => {
        expect(
            clarify.jobs.get({
                taskID: '1',
            }),
        ).rejects.toThrow(clarify.exceptions.ArgumentError);
    });

    test('get jobs by unknown filter', async () => {
        expect(
            clarify.jobs.get({
                unknown: 50,
            }),
        ).rejects.toThrow(clarify.exceptions.ArgumentError);
    });
});

describe('Feature: save job', () => {
    test('save stage and state of a job', async () => {
        const result = await clarify.jobs.get({ jobID: 1 });

        result[0].stage = 'validation';
        result[0].state = 'new';
        const newJob = await result[0].save();

        expect(newJob.stage).toBe('validation');
        expect(newJob.state).toBe('new');
    });

    test('save invalid status of a job', async () => {
        const result = await clarify.jobs.get({
            jobID: 1,
        });

        expect(() => {
            result[0].state = 'invalid';
        }).toThrow(clarify.exceptions.ArgumentError);
        expect(() => {
            result[0].stage = 'invalid';
        }).toThrow(clarify.exceptions.ArgumentError);
    });
});