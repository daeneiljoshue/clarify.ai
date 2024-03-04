import { getCore } from 'clarify-core-wrapper';

const core = getCore();
const { logger } = core;
const { EventScope } = core.enums;

export default logger;
export { EventScope };