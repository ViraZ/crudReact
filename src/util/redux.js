import jp from "jsonpath";
import { connect } from "react-redux";
import produce from "immer";

const jsonUpdateAction = (path, value) => ({
  type: "UPDATE_VALUE",
  path: path,
  value: value
});

const jsonAppendAction = (path, value) => ({
  type: "APPEND_VALUE",
  path: path,
  value: value
});

const jsonInsertAction = (path, value) => ({
  type: "INSERT_VALUE",
  path: path,
  value: value
});

// assume each element has id
export const jsonUpdateArrayAction = (path, value) => ({
  type: "UPDATE_ARRAY_VALUE",
  path: path,
  value: value
});

export const reducer = defaultState => {
  return (state = defaultState, action) => jsonUpdateReducer(state, action);
};

const jsonUpdateReducer = (state, action) => {
  let ret = produce(state, draft => {
    let value = "";
    switch (action.type) {
      case "UPDATE_VALUE":
        jp.value(draft, action.path, action.value);
        break;
      case "UPDATE_ARRAY_VALUE":
        value = jp.query(draft, action.path);
        let newValue = value[0].map((e, i) => {
          let ret = e;
          if (e.id === action.value.id) {
            ret = action.value;
          }
          return ret;
        });
        jp.value(draft, action.path, newValue);
        break;
      case "APPEND_VALUE":
        value = jp.query(draft, action.path);
        value.push(action.value[0]);
        jp.value(draft, action.path, value[0]);
        break;
      case "INSERT_VALUE":
        value = jp.query(draft, action.path);
        value[0].push(action.value);
        jp.value(draft, action.path, value[0]);
        break;
      default:
        break;
    }
  });
  console.log(ret);
  // console.log(JSON.stringify(ret));
  return ret;
};

class JsonBinding {
  constructor(path) {
    this.path = path;
    this.jsonMapStateToProps = store => {
      // console.log(this.path);
      return {
        value: jp.query(store, this.path)[0]
      };
    };
    this.jsonMapDispatchToProps = dispatch => {
      // console.log(this.path);
      return {
        update: value => {
          dispatch(jsonUpdateAction(this.path, value));
        },
        append: value => {
          dispatch(jsonAppendAction(this.path, value));
        },
        insert: (value, path = this.path) => {
          dispatch(jsonInsertAction(path, value));
        },
        updateArray: (value, path = this.path) => {
          dispatch(jsonUpdateArrayAction(path, value));
        }
      };
    };
    this.connect = object => {
      return connect(
        this.jsonMapStateToProps,
        this.jsonMapDispatchToProps
      )(object);
    };
  }
}

export default JsonBinding;
