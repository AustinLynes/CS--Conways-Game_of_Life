import { CREATE_CELLS_FINISHED, CREATE_CELLS_START } from "../actions"

const init = {
    cells: [], 
    isGenerating:false
}

export function gridReducer(state = init, action) {
    switch (action.type) {
        // GENERATION
        case CREATE_CELLS_START:
            return {
                ...state,
                isGenerating:true
            }
        case CREATE_CELLS_FINISHED:
            console.log("payload ", action.payload)
            return {
                ...state, 
                cells: action.payload,
                isGenerating: false
            }
        default:
            return state
    }
}