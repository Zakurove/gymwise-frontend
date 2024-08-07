import axios from '../../utils/axiosConfig';
import {
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
} from './membersSlice';

export const fetchMembers = ({ page = 1, sort_by = 'name', sort_order = 'asc', search = '' }) => async (dispatch) => {
  dispatch(fetchMembersStart());
  try {
    const response = await axios.get('/ai/member-insights/', {
      params: { page, sort_by, sort_order, search },
    });
    dispatch(fetchMembersSuccess(response.data));
  } catch (error) {
    dispatch(fetchMembersFailure(error.response?.data?.message || 'Failed to fetch members'));
  }
};

export const fetchMemberDetail = (memberId) => async (dispatch) => {
  dispatch(fetchMemberDetailStart());
  try {
    const response = await axios.get(`/ai/member-insights/${memberId}/`);
    dispatch(fetchMemberDetailSuccess(response.data));
  } catch (error) {
    dispatch(fetchMemberDetailFailure(error.response?.data?.message || 'Failed to fetch member details'));
  }
};

export const uploadMemberData = (formData) => async (dispatch) => {
  dispatch(uploadMemberDataStart());
  try {
    await axios.post('/ai/upload-member-data/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(uploadMemberDataSuccess());
  } catch (error) {
    dispatch(uploadMemberDataFailure(error.response?.data?.message || 'Failed to upload member data'));
  }
};
export const fetchDataStatus = () => async (dispatch) => {
  dispatch(fetchDataStatusStart());
  try {
    const response = await axios.get('/ai/data-status/');
    dispatch(fetchDataStatusSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataStatusFailure(error.response?.data?.message || 'Failed to fetch data status'));
  }
};

export const analyzeCSV = (formData) => async (dispatch) => {
  dispatch(analyzeCSVStart());
  try {
    const response = await axios.post('/ai/analyze-csv/', formData);
    dispatch(analyzeCSVSuccess(response.data.columns));
  } catch (error) {
    dispatch(analyzeCSVFailure(error.response?.data?.message || 'Failed to analyze CSV'));
  }
};

export const fetchMappingTemplates = () => async (dispatch) => {
  dispatch(fetchMappingTemplatesStart());
  try {
    const response = await axios.get('/ai/get-mapping-templates/');
    dispatch(fetchMappingTemplatesSuccess(response.data));
  } catch (error) {
    dispatch(fetchMappingTemplatesFailure(error.response?.data?.message || 'Failed to fetch mapping templates'));
  }
};

export const saveMappingTemplate = (template) => async (dispatch) => {
  dispatch(saveMappingTemplateStart());
  try {
    const response = await axios.post('/ai/save-mapping-template/', template);
    dispatch(saveMappingTemplateSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(saveMappingTemplateFailure(error.response?.data?.message || 'Failed to save mapping template'));
    throw error;
  }
};

export const updateMapping = (mapping) => (dispatch) => {
  dispatch(updateMappingSuccess(mapping));
};

export const processMappedData = (formData) => async (dispatch) => {
  dispatch(processMappedDataStart());
  try {
    await axios.post('/ai/process-mapped-data/', formData);
    dispatch(processMappedDataSuccess());
  } catch (error) {
    dispatch(processMappedDataFailure(error.response?.data?.message || 'Failed to process mapped data'));
  }
};
export const trainInstitutionModel = (formData) => async (dispatch) => {
  dispatch(trainInstitutionModelStart());
  try {
    const response = await axios.post('/ai/train-institution-model/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(trainInstitutionModelSuccess(response.data));
  } catch (error) {
    dispatch(trainInstitutionModelFailure(error.response?.data?.message || 'Failed to train institution model'));
  }
};