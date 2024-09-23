
export class AuthState {
    userId:number=0;
    userEmail: string = "";
    userName: string = "";
    jwt: string = "";
    isAdmin: boolean = false;
    isLogged:boolean = false;
}

//login, logout, updateToken
export enum AuthActionType {
    login = "login",
    logout = "logout",
    updateToken = "updateToken",
}

export interface AuthAction {
    type: AuthActionType,
    payload?: any
}

export function loginAction(user: any): AuthAction {
    return { type: AuthActionType.login, payload: user }
}

export function logoutAction(): AuthAction {
    return { type: AuthActionType.logout }
}

export function updateTokenAction(jwt: string): AuthAction {
    return { type: AuthActionType.updateToken, payload: jwt }
}

export function AuthReducer(
  currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    let newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.login:
            newState = action.payload;
            break;
        case AuthActionType.logout:
            newState = new AuthState();
            break;
        case AuthActionType.updateToken:
            newState.jwt = action.payload;
            break;
    }

    return newState;
}