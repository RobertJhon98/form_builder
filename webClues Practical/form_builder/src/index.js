import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  forms: [],
  selected_form: {},
};

const reducer = (state = { forms: [], selected_form: {} }, action) => {
  let forms = [];
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        selected_form: action.data,
      };
    case "ADD_NEW_FORM":
      return {
        ...state,
        forms: [action.data, ...state.forms],
      };
    case "ADD_QUESTION_TO_FORM":
      console.log(action.data);
      let selected_form = {};
      let temp = state.forms.map((form) => {
        if (form.key === action.key) {
          form.questions.push(action.data);
          selected_form = form;
        }
        return form;
      });
      return {
        ...state,
        forms: temp,
        selected_form,
      };

    case "UPDATE_FORM_NAME":
      forms = state.forms.map((form) => {
        if (form.key == action.key) {
          form.name = action.name;
        }
        return form;
      });
      return {
        ...state,
        forms,
      };

    default:
      return state;
  }
};

let store = createStore(reducer, initialState);
store.subscribe(() => console.log("hello ", store.getState()));

/* actions */
export const setSelectedFormData = (selected_form) => {
  store.dispatch({
    type: "SET_FORM_DATA",
    data: selected_form,
  });
};

export const addForm = (formData) => {
  store.dispatch({
    type: "ADD_NEW_FORM",
    data: formData,
  });
};

export const addQuetionToForm = ({ question_data, key }) => {
  store.dispatch({
    type: "ADD_QUESTION_TO_FORM",
    data: question_data,
    key,
  });
};

export const updateFormName = ({ name, key }) => {
  store.dispatch({
    type: "UPDATE_FORM_NAME",
    name,
    key,
  });
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
