import { LoginService } from '../services/login.service';

export function appInitializer(authenticationService: LoginService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}
