import {TOP_STORIES, STORY_ID, ActionType, Story, PAGINATE} from '../type';

const INIT_VALUES: Story = {
    top_story: [],
    stories_ids: [],
    skip: 0,
    limit: 15
}

const TopStoriesReducer = (state = INIT_VALUES, action: ActionType) => {
    switch(action.type) {
        case TOP_STORIES:
            return {
                ...state,
                top_story:  [...state.top_story, action.payload]
            }
        case STORY_ID:
            return {
                ...state,
                stories_ids: action.payload
            }
        case PAGINATE:
            return {
                ...state,
                skip: action.payload === 'next' ? state.skip + 15 : state.skip - 15,
                limit: action.payload === 'next' ? state.limit + 15 : state.limit - 15
            }
        default:
            return state;
    }
}

export default TopStoriesReducer;