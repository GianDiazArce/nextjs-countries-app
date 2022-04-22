import { IThemeType } from '../../interfaces';
import { UiState } from './'


type UiActionType =
    | { type: '[Ui] - Change Theme', payload: IThemeType }



export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - Change Theme':
            return {
                ...state,
                theme: action.payload,
            }

        default:
            return state;
    }
}