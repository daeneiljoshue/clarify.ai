
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';












import { NotificationsState, PluginsState } from 'reducers';
import '../styles.scss';
import { CLARIFYApplication } from './CLARIFYApplication';

export interface CLARIFYAppProps {
    loadFormats: () => void;
    loadAbout: () => void;
    verifyAuthorized: () => void;
    loadUserAgreements: () => void;
    initPlugins: () => void;
    initModels: () => void;
    resetErrors: () => void;
    resetMessages: () => void;
    loadOrganization: () => void;
    initInvitations: () => void;
    loadServerAPISchema: () => void;
    userInitialized: boolean;
    userFetching: boolean;
    organizationFetching: boolean;
    organizationInitialized: boolean;
    pluginsInitialized: boolean;
    pluginsFetching: boolean;
    modelsInitialized: boolean;
    modelsFetching: boolean;
    formatsInitialized: boolean;
    formatsFetching: boolean;
    aboutInitialized: boolean;
    aboutFetching: boolean;
    userAgreementsFetching: boolean;
    userAgreementsInitialized: boolean;
    notifications: NotificationsState;
    user: any;
    isModelPluginActive: boolean;
    pluginComponents: PluginsState['components'];
    invitationsFetching: boolean;
    invitationsInitialized: boolean;
    serverAPISchemaFetching: boolean;
    serverAPISchemaInitialized: boolean;
    isPasswordResetEnabled: boolean;
    isRegistrationEnabled: boolean;
}

export interface CLARIFYAppState {
    healthIinitialized: boolean;
    backendIsHealthy: boolean;
}

export default withRouter(CLARIFYApplication);