import { TaskRead, UserRead } from '@/api';
import { createAppSlice } from '@/lib/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ComponentIdType = string | number
export type ComponentResponseType = string | number | number[]
export type ComponentResponsesType = { [id: ComponentIdType]: ComponentResponseType }

export interface AppState {
  currentUser?: UserRead
  currentTask?: TaskRead
  currentTaskResponse: ComponentResponsesType
}

const initialState: AppState = {
  currentTaskResponse: {}
}


export interface ComponentResponse {
  componentId: ComponentIdType
  response: ComponentResponseType
}

export const appSlice = createAppSlice({
  name: 'state',
  initialState,
  reducers: (create) => ({
    setCurrentUser: create.reducer((state, action: PayloadAction<UserRead | undefined>) => {
      state.currentUser = action.payload
    }),
    setCurrentTask: create.reducer((state, action: PayloadAction<TaskRead | undefined>) => {
      state.currentTask = action.payload
    }),
    setComponentResponse: create.reducer((state, action: PayloadAction<ComponentResponse>) => {
      state.currentTaskResponse[action.payload.componentId] = action.payload.response
    }),
    removeComponentResponse: create.reducer((state, action: PayloadAction<ComponentIdType>) => {
      delete state.currentTaskResponse[action.payload]
    }),
    resetCurrentTask: create.reducer((state) => {
      state.currentTask = undefined
      state.currentTaskResponse = {}
    }),
    resetState: () => initialState
  }),
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
    selectState: (state) => state,
    selectCurrentTask: (state) => state.currentTask,
  }
})

export const { setCurrentUser, setComponentResponse, removeComponentResponse, setCurrentTask, resetCurrentTask, resetState } = appSlice.actions
export const { selectCurrentUser, selectState, selectCurrentTask } = appSlice.selectors

// // If you are not using async thunks you can use the standalone `createSlice`.
// export const counterSlice = createAppSlice({
//   name: 'counter',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   // The `reducers` field lets us define reducers and generate associated actions
//   reducers: (create) => ({
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
