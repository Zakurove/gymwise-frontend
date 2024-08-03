import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import metricsReducer from './metrics/metricsSlice';
import revenueReducer from './revenue/revenueSlice';
import performanceReducer from './performance/performanceSlice';
import insightsReducer from './insights/insightsSlice';
import membersReducer from './members/membersSlice';
import campaignsReducer from './campaigns/campaignsSlice';
import settingsReducer from './settings/settingsSlice';
import adminReducer from './admin/adminSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  metrics: metricsReducer,
  revenue: revenueReducer,
  performance: performanceReducer,
  insights: insightsReducer,
  members: membersReducer,
  campaigns: campaignsReducer,
  settings: settingsReducer,
  admin: adminReducer,
});

export default rootReducer;