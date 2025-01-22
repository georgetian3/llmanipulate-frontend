import { createAppSlice } from '@/lib/createAppSlice';
import type { AppThunk } from '@/lib/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';


// export interface CounterSliceState {
//   value: number;
//   status: 'idle' | 'loading' | 'failed';
// }

// const initialState: CounterSliceState = {
//   value: 0,
//   status: 'idle',
// };


export async function apiRequest(endpoint: string, method: string, data?: any) {
  /**
   * Usage: `const response = apiRequest('/users', 'POST', {...})
   */
  const url = process.env.NEXT_PUBLIC_API_URL + endpoint
  // console.log('Fetching URL:', url)
  return await fetch(url, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export interface User {

}

export interface AppState {
  loginLoading: boolean
  loginWarning: string
  loginSave: boolean
  user: User | null
}

const initialState: AppState = {
  loginLoading: false,
  loginSave: false,
  loginWarning: '',
  user: null
}



export const testSlice = createAppSlice({
  name: 'test',
  initialState,
  reducers: (create) => ({
    toggleSave: create.reducer((state) => {
      state.loginSave = !state.loginSave
    }),
    setUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload
    }),
    login: create.asyncThunk(
      async(password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const resp = await apiRequest(`/users/${password}`, 'GET')
        return {
          password: password,
          status: resp.status,
          text: await resp.text()
        }
      },
      {
        pending: (state) => {
          state.loginWarning = ''
          state.loginLoading = true
        },
        fulfilled: (state, action) => {
          state.loginLoading = false
          switch(action.payload.status) {
            case 200: {
              console.log(action.payload.text)
              break
            }
            case 404: {
              state.loginWarning = 'Invalid passcode'
              break
            }
            default: {
              state.loginWarning = 'An unexpected error occurred. Please try again.'
              console.error(`Unexpected response: status ${action.payload.status} text ${action.payload.text}`)
            }
          }
        },
        rejected: (state, action) => {
          console.error('Login failed: ', action)
          state.loginLoading = false
          state.loginWarning = 'Login failed, please try again.'
        }
      },
    ),
  }),
  selectors: {
    selectLoading: (state) => state.loginLoading,
    selectWarning: (state) => state.loginWarning,
    selectSave: (state) => state.loginSave,
  }
})

export const { setUser } = testSlice.actions
export const { selectLoading, selectWarning, selectSave } = testSlice.selectors

// // If you are not using async thunks you can use the standalone `createSlice`.
// export const counterSlice = createAppSlice({
//   name: 'counter',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: (create) => ({
//     increment: create.reducer((state) => {
//       // Redux Toolkit allows us to write 'mutating' logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a 'draft state' and produces a brand new
//       // immutable state based off those changes
//       state.value += 1;
//     }),
//     decrement: create.reducer((state) => {
//       state.value -= 1;
//     }),
//     // Use the `PayloadAction` type to declare the contents of `action.payload`
//     incrementByAmount: create.reducer(
//       (state, action: PayloadAction<number>) => {
//         state.value += action.payload;
//       },
//     ),
//     // The function below is called a thunk and allows us to perform async logic. It
//     // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
//     // will call the thunk with the `dispatch` function as the first argument. Async
//     // code can then be executed and other actions can be dispatched. Thunks are
//     // typically used to make async requests.
//     incrementAsync: create.asyncThunk(
//       async (amount: number) => {
//         const response = await fetchCount(amount);
//         // The value we return becomes the `fulfilled` action payload
//         return response.data;
//       },
//       {
//         pending: (state) => {
//           state.status = 'loading';
//         },
//         fulfilled: (state, action) => {
//           state.status = 'idle';
//           state.value += action.payload;
//         },
//         rejected: (state) => {
//           state.status = 'failed';
//         },
//       },
//     ),
//   }),
//   // You can define your selectors here. These selectors receive the slice
//   // state as their first argument.
//   selectors: {
//     selectCount: (counter) => counter.value,
//     selectStatus: (counter) => counter.status,
//   },
// });

// // Action creators are generated for each case reducer function.
// export const { decrement, increment, incrementByAmount, incrementAsync } =
//   counterSlice.actions;

// // Selectors returned by `slice.selectors` take the root state as their first argument.
// export const { selectCount, selectStatus } = counterSlice.selectors;



// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
