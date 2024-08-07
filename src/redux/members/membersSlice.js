import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [],
  selectedMember: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  dataStatus: null,
  columns: [],
  mapping: {},
  mappingTemplates: [],
  modelTrainingStatus: null,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    fetchMembersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMembersSuccess: (state, action) => {
      state.loading = false;
      state.members = action.payload.results.map(item => item.member_info);
      state.totalPages = action.payload.total_pages;
      state.currentPage = action.payload.page;
    },
    fetchMembersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMemberDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMemberDetailSuccess: (state, action) => {
      state.loading = false;
      state.selectedMember = action.payload;
    },
    fetchMemberDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadMemberDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadMemberDataSuccess: (state) => {
      state.loading = false;
    },
    uploadMemberDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDataStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataStatusSuccess: (state, action) => {
      state.loading = false;
      state.dataStatus = action.payload;
    },
    fetchDataStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    analyzeCSVStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    analyzeCSVSuccess: (state, action) => {
      state.loading = false;
      state.columns = action.payload;
    },
    analyzeCSVFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMappingTemplatesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMappingTemplatesSuccess: (state, action) => {
      state.loading = false;
      state.mappingTemplates = action.payload;
    },
    fetchMappingTemplatesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveMappingTemplateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    saveMappingTemplateSuccess: (state, action) => {
      state.loading = false;
      state.mappingTemplates.push(action.payload);
    },
    saveMappingTemplateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMappingSuccess: (state, action) => {
      state.mapping = action.payload;
    },
    processMappedDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    processMappedDataSuccess: (state) => {
      state.loading = false;
    },
    processMappedDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    trainInstitutionModelStart: (state) => {
      state.loading = true;
      state.error = null;
      state.modelTrainingStatus = null;
    },
    trainInstitutionModelSuccess: (state, action) => {
      state.loading = false;
      state.modelTrainingStatus = 'success';
    },
    trainInstitutionModelFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.modelTrainingStatus = 'failed';
    },
  },
});

export const {
  fetchMembersStart,
  fetchMembersSuccess,
  fetchMembersFailure,
  fetchMemberDetailStart,
  fetchMemberDetailSuccess,
  fetchMemberDetailFailure,
  uploadMemberDataStart,
  uploadMemberDataSuccess,
  uploadMemberDataFailure,
  fetchDataStatusStart,
  fetchDataStatusSuccess,
  fetchDataStatusFailure,
  analyzeCSVStart,
  analyzeCSVSuccess,
  analyzeCSVFailure,
  fetchMappingTemplatesStart,
  fetchMappingTemplatesSuccess,
  fetchMappingTemplatesFailure,
  saveMappingTemplateStart,
  saveMappingTemplateSuccess,
  saveMappingTemplateFailure,
  updateMappingSuccess,
  processMappedDataStart,
  processMappedDataSuccess,
  processMappedDataFailure,
  trainInstitutionModelStart,
  trainInstitutionModelSuccess,
  trainInstitutionModelFailure,
} = membersSlice.actions;

export default membersSlice.reducer;