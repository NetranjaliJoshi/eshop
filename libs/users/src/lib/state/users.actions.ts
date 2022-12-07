import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';




export const buildUserSession = createAction('[Users] Bulid User Session');

//export const initUsers = createAction('[Users Page] Init');

export const buildUserSessionSuccess = createAction(
    '[Users] Bulid User Session Success', props<{ user: User }>());

export const buildUserSessionFailure = createAction(
    '[Users] Bulid User Session Failure');

    