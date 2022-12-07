import { Person } from "../models/Person";

export class AppState {
    public allNames: Person[] = [];
    public allNamesForDisplay: Person[] = [];
    public isShowSnackbar: boolean = false;
    public snackbarMessage: string = '';
    public snackbarSeverity: string = 'error';
}