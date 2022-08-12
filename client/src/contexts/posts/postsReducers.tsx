import { IPostsState } from "./postsContext";
import { Action, IPostAction } from "./postsAction";

export default function postsReducers(
  state: IPostsState,
  action: IPostAction
): IPostsState {
  switch (action.type) {
    case Action.GET_TAGS: {
      return {
        ...state,
        loading: true,
      };
    }

    case Action.GET_TAGS_SUCCESS: {
      return {
        ...state,
        loading: false,
        tags: action.payload,
        filterTags: action.payload,
      };
    }

    case Action.GET_TAGS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    case Action.SHOW_TAGS_FILTERED: {
      return {
        ...state,
        show: true,
      };
    }

    case Action.HIDE_TAGS_FILTERED: {
      return {
        ...state,
        show: false,
      };
    }

    case Action.SELECT_TAGS_BEGIN: {
      return {
        ...state,
        filterTags: action.payload,
      };
    }

    case Action.SELECTED_TAGS: {
      return {
        ...state,
        selectTags: action.payload,
      };
    }

    case Action.REMOVE_SELECTED_TAG: {
      return {
        ...state,
        selectTags: action.payload,
      };
    }

    case Action.GET_IMAGES_IN_DISK: {
      return {
        ...state,
        images: action.payload,
      };
    }

    case Action.GET_THUMBNAIL_IN_DISK: {
      return {
        ...state,
        thumbnail: action.payload,
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
        thumbnail: [],
        selectTags: [],
        filterTags: [],
      };
    }

    default: {
      throw new Error(`no such action: ${action.type}!`);
    }
  }
}
