// actions.ts
export const updatePetStatus = (petId: string) => ({
  type: 'UPDATE_PET_STATUS',
  payload: { petId },
});

export const showSnackbar = () => ({
  type: 'SHOW_SNACKBAR',
});

export const hideSnackbar = () => ({
  type: 'HIDE_SNACKBAR',
});

  