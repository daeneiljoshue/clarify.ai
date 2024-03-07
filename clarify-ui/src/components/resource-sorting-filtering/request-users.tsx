
import { User, getCore } from 'clarify-core-wrapper';

const core = getCore();

const asyncFetchUsers = async (search: string | null): Promise<{
    values: [{ value: string; title: string; }];
    hasMore: boolean;
}> => {
    const users = await core.users.get({
        limit: 10,
        is_active: true,
        ...(search ? { search } : {}),
    });

    return {
        values: users.map((user: User) => ({
            value: user.username, title: user.username,
        })),
        hasMore: false,
    };
};

export default asyncFetchUsers;