// reducers.ts
interface AdoptionReducerState {
  adoptedPetIds: string[];
  showSnackbar: boolean;
}

const initialState: AdoptionReducerState = {
  adoptedPetIds: [],
  showSnackbar: false,
};

const adoptionReducer = (state: AdoptionReducerState = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_PET_STATUS':
      const { petId } = action.payload;
      return {
        ...state,
        adoptedPetIds: [...state.adoptedPetIds, petId],
      };

    case 'SHOW_SNACKBAR':
      return {
        ...state,
        showSnackbar: true,
      };

    case 'HIDE_SNACKBAR':
      return {
        ...state,
        showSnackbar: false,
      };

    default:
      return state;
  }
};

export default adoptionReducer;
