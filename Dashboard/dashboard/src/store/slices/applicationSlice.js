import { CardTitle } from "@/components/ui/card";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllApplicationRequest(state, action) {
      state.applications = [];
      state.error = null;
      state.loading = true;
    },
    getAllApplicationSuccess(state, action) {
      state.applications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllApplicationFailed(state, action) {
      state.applications = state.applications;
      state.error = action.payload;
      state.loading = false;
    },
    addNewApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewApplicationSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewApplicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteApplicationSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteApplicationFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },

    resetApplicationSlice(state, action) {
      state.error = null;
      state.applications = state.applications;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.applications = state.applications;
    },
  },
});

export const getAllApplication = () => async (dispatch) => {
  dispatch(applicationSlice.actions.getAllApplicationRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/softwareAppliaction/getall",
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.addNewApplicationSuccess(data.applications)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.getAllApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewApplication = (newData) => async (dispatch) => {
  dispatch(applicationSlice.actions.addNewApplicationRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/softwareAppliaction/add",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(applicationSlice.actions.addNewApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.addNewApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteApplicationRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/softwareAppliaction/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.deleteApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
