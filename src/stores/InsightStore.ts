import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface InsightCard {
  type: string;
  graph?: {
    type: string;
    value: number;
  };
  title: string;
  description: string;
}

interface InsightState {
  insightCards?: InsightCard[] | undefined;
}

const initialState: InsightState = {
  insightCards: undefined,
};

const insightSlice = createSlice({
  name: 'insightStore',
  initialState,
  reducers: {
    setInsightCards(
      state: InsightState,
      {payload: insightCards}: PayloadAction<InsightCard[]>,
    ) {
      state.insightCards = insightCards;
    },
  },
});

export const {setInsightCards} = insightSlice.actions;
export default insightSlice.reducer;
