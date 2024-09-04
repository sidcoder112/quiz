
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: string;
  
}

const initialState: SettingsState = {
  theme: 'light', //def val
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
   
    
  },
});

export const { setTheme} = settingsSlice.actions;
export default settingsSlice.reducer;
