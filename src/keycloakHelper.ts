import Keycloak from 'keycloak-js';

interface InitAuthClient {
  onInit?(): void;
  onTokenUpdate?(): void;
}

const _config: Keycloak.KeycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_AUTH_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM || '',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || '',
};

const _keycloak: Keycloak.KeycloakInstance = new (Keycloak as any)(_config);

async function _tryUpdateToken(onTokenUpdate?: () => void) {
  const success = await _keycloak.updateToken(70);
  if (success) {
    onTokenUpdate && onTokenUpdate();
  }
}

function _setupTokenUpdate(onTokenUpdate?: () => void) {
  setInterval(_tryUpdateToken, 50000, onTokenUpdate);
}

export const initAuthClient = (function () {
  let initialized = false;
  async function _init({ onInit, onTokenUpdate }: InitAuthClient) {
    try {
      const authenticated = await _keycloak.init({
        flow: 'standard',
        onLoad: 'login-required',
        checkLoginIframe: false,
      });
      if (authenticated) _setupTokenUpdate(onTokenUpdate);
    } catch (error) {
      console.error('User is not authenticated');
    } finally {
      onInit && onInit();
    }
  }

  return (c: InitAuthClient = {}) => {
    if (!initialized) {
      initialized = true;
      _init(c);
    }
  };
})();

export default {
  login: () => _keycloak.login(),
  logout: () => _keycloak.logout(),
  profile: _keycloak.profile || {},
  token: _keycloak.token,
  authenticated: !!_keycloak.authenticated,
};
