import { FunctionComponent } from "react";
import { useWindowDimensions } from "@hodj/misc";
import { TimeseriesGraphView, SetupTimeseriesSelection, TimeseriesGraphViewData } from "./packages/timeseries-graph/index"

const exampleData: TimeseriesGraphViewData = {
    type: 'TimeseriesGraph',
    datasets: [
        {
            name: 'dataset1',
            data: {
                t: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                y: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        },
        {
            name: 'dataset2',
            data: {
                t: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                y: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
            }
        }
    ],
    series: [
        {
            type: 'line',
            dataset: 'dataset1',
            encoding: {
                t: 't',
                y: 'y'
            },
            attributes: {
                color: 'red'
            }
        },
        {
            type: 'line',
            dataset: 'dataset2',
            encoding: {
                t: 't',
                y: 'y'
            },
            attributes: {
                color: 'blue'
            }
        }
    ],
    legendOpts: {
        location: 'northwest'
    },
    gridlineOpts: {
        hideX: false,
        hideY: false
    }
}

const MainWindow: FunctionComponent = () => {
    const {width, height} = useWindowDimensions()
    return (
        <SetupTimeseriesSelection>
            <TimeseriesGraphView
                data={exampleData}
                width={width}
                height={height}
            />
        </SetupTimeseriesSelection>
    )
}

export default MainWindow