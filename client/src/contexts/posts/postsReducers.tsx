import { IPostsState } from "./postsContext";
import { Action, IPostAction } from "./postsAction";

export default function postsReducers(
  state: IPostsState,
  action: IPostAction
): IPostsState {
  switch (action.type) {
    case Action.GET_IMAGES_IN_DISK: {
      return {
        ...state,
        images: action.payload,
      };
    }

    case Action.REMOVE_IMAGES: {
      return {
        ...state,
        images: action.payload,
      };
    }

    case Action.LOADING_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case Action.LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case Action.RESET_STATE: {
      return {
        ...state,
        loading: false,
        images: [],
      };
    }

    default: {
      throw new Error(`no such action: ${action.type}!`);
    }
  }
}
