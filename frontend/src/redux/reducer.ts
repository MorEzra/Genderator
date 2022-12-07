import { AppState } from "./app-state";
import { ActionType } from "./type-action";
import { Action } from "./action";

export function reduce(appState: AppState = new AppState, action: Action): AppState {
    switch (action.type) {
        case ActionType.setAllNames:
            return { ...appState, allNames: action.payload, allNamesForDisplay: action.payload }

        case ActionType.setAllNamesForDisplay:
            console.log(action.payload);

            return { ...appState, allNamesForDisplay: action.payload.length > 0 ? action.payload : appState.allNames }

        case ActionType.toggleIsShowSnackbar:
            return { ...appState, isShowSnackbar: !appState.isShowSnackbar };

        case ActionType.setSnackbarMessage:
            return { ...appState, snackbarMessage: action.payload };

        case ActionType.setSnackbarSeverity:
            return { ...appState, snackbarSeverity: action.payload };

        default:
            return { ...appState }
    }
}