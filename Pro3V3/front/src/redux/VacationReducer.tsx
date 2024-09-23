import { Vacation } from '../Components/models/Vacation';

import { Favorite } from '../Components/models/Favorite';

export class VacationState {
  public allVacations: Vacation[] = [];
  public userFavorites: Favorite[] = [];
}

export enum VacationActionType {
  saveVacations = 'saveVacations',
  getAllVacations = 'getAllVacations',
  addNewVacation = 'addNewVacation',
  //deleteVacation = "deleteVacation",
  updateVacation = 'updateVacation',
  saveFavorites = 'saveFavorites',
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export function saveVacations(
  vacations: Vacation[]
): VacationAction {
  return { type: VacationActionType.saveVacations, payload: vacations };
}
export function gelAllVacationsAction(vacations: Vacation[]): VacationAction {
  return { type: VacationActionType.getAllVacations, payload: vacations };
}

export function addNewVacationFunction(newVacation: Vacation): VacationAction {
  return { type: VacationActionType.addNewVacation, payload: newVacation };
}

export function updateVacationFunction(
  updateVacation: Vacation
): VacationAction {
  return { type: VacationActionType.updateVacation, payload: updateVacation };
}

export function saveFavorites(favorites: number[]): VacationAction {
  return { type: VacationActionType.saveFavorites, payload: favorites };
}

export function VacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.saveVacations:
      newState.allVacations = action.payload;
      break;
    case VacationActionType.getAllVacations:
      newState.allVacations = action.payload;
      break;
    case VacationActionType.addNewVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.updateVacation:
      newState.allVacations = [...newState.allVacations, action.payload];
      break;
    case VacationActionType.saveFavorites:
      newState.userFavorites = action.payload;
      break;
  }
  return newState;
}
// case CategoriesActionType.updateCategory:
