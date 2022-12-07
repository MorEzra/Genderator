import { AppState } from "./app-state";
import { ActionType } from "./type-action";
import { Action } from "./action";

export function reduce(appState: AppState, action: Action): AppState {

    switch (action.type) {
        case ActionType.SetAllNames:
            return { ...appState, allNames: action.payload }
    }
}