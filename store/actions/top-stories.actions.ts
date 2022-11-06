import {SERVER_REQUEST, TOP_STORIES_IDS, STORIES_DETAIL} from '../../config';
import { STORY_ID, TOP_STORIES, PAGINATE } from '../type';
import { Dispatch } from 'redux';


export const fetchStoryId = () => async (dispatch: Dispatch) => {
    console.log('response')
    const response = await SERVER_REQUEST(TOP_STORIES_IDS, 'get');
    console.log(response);
     dispatch({type: STORY_ID, payload: response})
}

export const fetchStoryById = (id: number) => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(STORIES_DETAIL(id), 'get');
      dispatch({type: TOP_STORIES, payload: response})
}

export const paginate = (param: string) => (dispatch: Dispatch) => {
    dispatch({type: PAGINATE, payload: param })
}