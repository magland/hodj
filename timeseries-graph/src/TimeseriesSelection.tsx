import { Dispatch, FunctionComponent, PropsWithChildren, createContext, useCallback, useContext, useReducer } from "react"

export type TimeseriesSelection = {
    startTimeSec?: number
    endTimeSec?: number
    visibleStartTimeSec?: number
    visibleEndTimeSec?: number
    currentTimeSec?: number
}

export type TimeseriesSelectionAction = {
    type: 'report_total_time_range'
    startTimeSec: number
    endTimeSec: number
} | {
    type: 'set_visible_time_range'
    visibleStartTimeSec: number
    visibleEndTimeSec: number
} | {
    type: 'set_current_time'
    currentTimeSec: number
} | {
    type: 'set_current_time_fraction'
    fraction: number
} | {
    type: 'pan_time_selection'
    deltaSec: number
} | {
    type: 'zoom_time_selection'
    anchorTimeSec?: number
    factor: number
} | {
    type: 'pan_time_selection_pct'
    pct: number
}

export const timeseriesSelectionReducer = (state: TimeseriesSelection, action: TimeseriesSelectionAction): TimeseriesSelection => {
    switch (action.type) {
        case 'report_total_time_range':
            const newStartTimeSec = (state.startTimeSec === undefined) ? action.startTimeSec : Math.min(state.startTimeSec, action.startTimeSec)
            const newEndTimeSec = (state.endTimeSec === undefined) ? action.endTimeSec : Math.max(state.endTimeSec, action.endTimeSec)
            return {
                ...state,
                startTimeSec: newStartTimeSec,
                endTimeSec: newEndTimeSec
            }
        case 'set_visible_time_range':
            return {
                ...state,
                visibleStartTimeSec: action.visibleStartTimeSec,
                visibleEndTimeSec: action.visibleEndTimeSec
            }
        case 'set_current_time':
            return {
                ...state,
                currentTimeSec: action.currentTimeSec
            }
        case 'set_current_time_fraction':
            if ((state.visibleStartTimeSec === undefined) || (state.visibleEndTimeSec === undefined)) return state
            return {
                ...state,
                currentTimeSec: state.visibleStartTimeSec + action.fraction * (state.visibleEndTimeSec - state.visibleStartTimeSec)
            }
        case 'pan_time_selection':
            if ((state.visibleStartTimeSec === undefined) || (state.visibleEndTimeSec === undefined)) return state
            if ((state.startTimeSec === undefined) || (state.endTimeSec === undefined)) return state
            const delta = action.deltaSec
            let newVisibleStartTimeSec = state.visibleStartTimeSec + delta
            let newVisibleEndTimeSec = state.visibleEndTimeSec + delta
            if (newVisibleStartTimeSec < state.startTimeSec) {
                newVisibleStartTimeSec = state.startTimeSec
                newVisibleEndTimeSec = newVisibleStartTimeSec + state.visibleEndTimeSec - state.visibleStartTimeSec
            }
            if (newVisibleEndTimeSec > state.endTimeSec) {
                newVisibleEndTimeSec = state.endTimeSec
                newVisibleStartTimeSec = newVisibleEndTimeSec - state.visibleEndTimeSec + state.visibleStartTimeSec
            }
            return {
                ...state,
                visibleStartTimeSec: newVisibleStartTimeSec,
                visibleEndTimeSec: newVisibleEndTimeSec
            }
        case 'pan_time_selection_pct':
            if ((state.visibleStartTimeSec === undefined) || (state.visibleEndTimeSec === undefined)) return state
            if ((state.startTimeSec === undefined) || (state.endTimeSec === undefined)) return state
            const deltaPct = action.pct
            let newVisibleStartTimeSec1 = state.visibleStartTimeSec + deltaPct * (state.visibleEndTimeSec - state.visibleStartTimeSec)
            let newVisibleEndTimeSec1 = state.visibleEndTimeSec + deltaPct * (state.visibleEndTimeSec - state.visibleStartTimeSec)
            if (newVisibleStartTimeSec1 < state.startTimeSec) {
                newVisibleStartTimeSec1 = state.startTimeSec
                newVisibleEndTimeSec1 = newVisibleStartTimeSec1 + state.visibleEndTimeSec - state.visibleStartTimeSec
            }
            if (newVisibleEndTimeSec1 > state.endTimeSec) {
                newVisibleEndTimeSec1 = state.endTimeSec
                newVisibleStartTimeSec1 = newVisibleEndTimeSec1 - state.visibleEndTimeSec + state.visibleStartTimeSec
            }
            return {
                ...state,
                visibleStartTimeSec: newVisibleStartTimeSec1,
                visibleEndTimeSec: newVisibleEndTimeSec1
            }
        case 'zoom_time_selection':
            if ((state.visibleStartTimeSec === undefined) || (state.visibleEndTimeSec === undefined)) return state
            if ((state.startTimeSec === undefined) || (state.endTimeSec === undefined)) return state
            const anchorTimeSec = action.anchorTimeSec || (state.visibleStartTimeSec + state.visibleEndTimeSec) / 2
            const factor = action.factor
            let newVisibleStartTimeSec2 = anchorTimeSec + 1 / factor * (state.visibleStartTimeSec - anchorTimeSec)
            let newVisibleEndTimeSec2 = anchorTimeSec + 1 / factor * (state.visibleEndTimeSec - anchorTimeSec)
            if (newVisibleStartTimeSec2 < state.startTimeSec) {
                newVisibleStartTimeSec2 = state.startTimeSec
            }
            if (newVisibleEndTimeSec2 > state.endTimeSec) {
                newVisibleEndTimeSec2 = state.endTimeSec
            }
            return {
                ...state,
                visibleStartTimeSec: newVisibleStartTimeSec2,
                visibleEndTimeSec: newVisibleEndTimeSec2
            }
        default:
            throw Error('Unexpected action type in timeseriesSelectionReducer')
    }
}

export type TimeseriesSelectionContextType = {
    state: TimeseriesSelection
    dispatch: Dispatch<TimeseriesSelectionAction>
}

export const TimeseriesSelectionContext = createContext<TimeseriesSelectionContextType>({
    state: {},
    dispatch: () => {}
})

export const useTimeseriesSelection = () => {
    const context = useContext(TimeseriesSelectionContext)
    if (!context) throw Error('useTimeseriesSelection() must be used within a TimeseriesSelectionContextProvider')
    const reportTotalTimeRange = useCallback((startTimeSec: number, endTimeSec: number) => {
        context.dispatch({
            type: 'report_total_time_range',
            startTimeSec,
            endTimeSec
        })
    }, [context.dispatch])
    const setVisibleTimeRange = useCallback((visibleStartTimeSec: number, visibleEndTimeSec: number) => {
        context.dispatch({
            type: 'set_visible_time_range',
            visibleStartTimeSec,
            visibleEndTimeSec
        })
    }, [context.dispatch])
    const setCurrentTime = useCallback((currentTimeSec: number) => {
        context.dispatch({
            type: 'set_current_time',
            currentTimeSec
        })
    }, [context.dispatch])
    const setCurrentTimeFraction = useCallback((fraction: number) => {
        context.dispatch({
            type: 'set_current_time_fraction',
            fraction
        })
    }, [context.dispatch])
    const panTimeSelection = useCallback((deltaSec: number) => {
        context.dispatch({
            type: 'pan_time_selection',
            deltaSec
        })
    }, [context.dispatch])
    const zoomTimeSelection = useCallback((factor: number, anchorTimeSec?: number) => {
        context.dispatch({
            type: 'zoom_time_selection',
            anchorTimeSec,
            factor
        })
    }, [context.dispatch])
    const panTimeSelectionPct = useCallback((pct: number) => {
        context.dispatch({
            type: 'pan_time_selection_pct',
            pct
        })
    }, [context.dispatch])
    return {
        startTimeSec: context.state.startTimeSec,
        endTimeSec: context.state.endTimeSec,
        visibleStartTimeSec: context.state.visibleStartTimeSec,
        visibleEndTimeSec: context.state.visibleEndTimeSec,
        currentTimeSec: context.state.currentTimeSec,
        reportTotalTimeRange,
        setVisibleTimeRange,
        setCurrentTime,
        setCurrentTimeFraction,
        zoomTimeSelection,
        panTimeSelection,
        panTimeSelectionPct
    }
}

export const SetupTimeseriesSelection: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(timeseriesSelectionReducer, {})
    return (
        <TimeseriesSelectionContext.Provider value={{state, dispatch}}>
            {children}
        </TimeseriesSelectionContext.Provider>
    )
}