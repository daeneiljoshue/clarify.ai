
import { getCore } from 'clarify-core-wrapper';

const core = getCore();

export default async (url: string, method: string): Promise<boolean> => {
    try {
        await core.server.request(url, {
            method,
        });
        return true;
    } catch (error) {
        return ![0, 404].includes(error.code);
    }
};