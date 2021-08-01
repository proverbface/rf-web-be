import { settings } from '../settings';

export const isDebugEnv = () => ['dev', 'stage', 'local'].includes(settings.env);
