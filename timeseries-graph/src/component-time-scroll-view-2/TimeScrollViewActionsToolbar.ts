import { useMemo } from 'react';
import { Divider, ToolbarItem } from './ViewToolbar';
import TimeWidgetToolbarEntries from './TimeWidgetToolbarEntries';
import { useTimeseriesSelection } from '../TimeseriesSelection';

export type OptionalToolbarActions = {
    aboveDefault?: ToolbarItem[]
    belowDefault?: ToolbarItem[]
}

const useActionToolbar = (props?: OptionalToolbarActions) => {
    const { aboveDefault, belowDefault } = props || {}
    const { zoomTimeSelection, panTimeSelectionPct } = useTimeseriesSelection()

    const timeControlActions = useMemo(() => {
        const preToolbarEntries = aboveDefault ? [...aboveDefault, Divider] : []
        const postToolbarEntries = belowDefault ? [Divider, ...belowDefault] : []
        const timeControls = TimeWidgetToolbarEntries({zoomTimeSelection, panTimeSelectionPct})
        const actions: ToolbarItem[] = [
            ...preToolbarEntries,
            ...timeControls,
            ...postToolbarEntries
        ]
        return actions
    }, [zoomTimeSelection, panTimeSelectionPct, aboveDefault, belowDefault])

    return timeControlActions
}

export default useActionToolbar