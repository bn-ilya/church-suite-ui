import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  phone: string;
  id: string;
}

const initialState: IInitialState= {
  phone: '',
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setPhone: (state, {payload}: PayloadAction<{phone: string}>) => {
      state.phone = payload.phone;
    },
    setId: (state, {payload}: PayloadAction<{id: string}>) => {
      state.id = payload.id;
    }
  }
})

export const { setPhone, setId } = userSlice.actions;
export default userSlice.reducer;