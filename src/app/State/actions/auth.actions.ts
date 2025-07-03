import { createAction, props } from "@ngrx/store";
import { authFeatureKey } from "../features-keys";

export const prefix = `${authFeatureKey} [Auth]`;

export const SetIsAuthenticated = createAction(
    `${prefix} Set Is Authenticated`,
    props<{ isAuthenticated: boolean }>()
);

export const SetAuthUser = createAction(
    `${prefix} Set User`,
    props<{ user: any | null }>()
);

export const SetAccessToken = createAction(
    `${prefix} Set Access Token`,
    props<{ accessToken: string }>()
);

export const SetIdToken = createAction(
    `${prefix} Set Id Token`,
    props<{ idToken: string | null }>()
);

export const GetAuthUser = createAction(
    `${prefix} Get Auth User`
);

export const GetAccessToken = createAction(
    `${prefix} Get Access Token`
);

export const Login = createAction(
    `${prefix} Login`,
);

export const Logout = createAction(
    `${prefix} Logout`
);

export const CheckSession = createAction(
    `${prefix} Check Session`
);