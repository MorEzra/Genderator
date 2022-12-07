import { ActionType } from "./type-action";

export interface Action {
    type: ActionType;
    payload?: any;
}