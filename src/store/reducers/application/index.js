import {TOGGLE_GUIDE_PANEL}from '../../actions/application'

const init = {
    guide_open: false,

}

export function appReducer (state=init, action){
    switch(action.type){
          
      case TOGGLE_GUIDE_PANEL:
        return {
          ...state,
          guide_open: !state.guide_open
        }
        default:
            return state
    }
}