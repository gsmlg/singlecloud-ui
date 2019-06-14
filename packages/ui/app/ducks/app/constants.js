/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const prefix = 'app';

export const INIT_ACTION = `${prefix}/INIT_ACTION`;

export const CHANGE_CLUSTER = `${prefix}/CHANGE_CLUSTER`;

export const TOGGLE_EVENTS_VIEW = `${prefix}/TOGGLE_EVENTS_VIEW`;

export const TOGGLE_MENU_TEXT = `${prefix}/TOGGLE_MENU_TEXT`;