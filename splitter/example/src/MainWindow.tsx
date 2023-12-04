import { Splitter } from "@hodj/splitter";
import { FunctionComponent } from "react";

const MainWindow: FunctionComponent = () => {
    return (
        <Splitter
            width={500}
            height={500}
            initialPosition={250}
        >
            <LeftWindow width={0} height={0} />
            <RightWindow width={0} height={0} />
        </Splitter>
    )
}

const color1 = '#ffcccc'
const color2 = '#ccccff'

const LeftWindow: FunctionComponent<{width: number, height: number}> = ({width, height}) => {
    return (
        <div style={{width, height, backgroundColor: color1}}>
            Left Window
        </div>
    )
}

const RightWindow: FunctionComponent<{width: number, height: number}> = ({width, height}) => {
    return (
        <div style={{width, height, backgroundColor: color2}}>
            Right Window
        </div>
    )
}

export default MainWindow