import { AppState } from "./app-state";
import { ActionType } from "./type-action";
import { Action } from "./action";

export function reduce(appState: AppState = new AppState, action: Action): AppState {
    switch (action.type) {
        case ActionType.SetAllNames:
            return { ...appState, allNames: action.payload, allNamesForDisplay: action.payload }
        case ActionType.SetAllNamesForDisplay:
            console.log(action.payload);
            
            return { ...appState, allNamesForDisplay: action.payload.length > 0 ? action.payload : appState.allNames }
        default:
            return { ...appState }
    }
}