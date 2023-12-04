import { HBoxLayout, Hyperlink, SmallIconButton, VBoxLayout, useWindowDimensions } from "@hodj/misc"
import { Add } from "@mui/icons-material"
import { FunctionComponent } from "react"

// pastels
const color1 = '#ffc'
const color2 = '#fff'
const color3 = '#fcf'
const color4 = '#cff'

const MainWindow: FunctionComponent = () => {
    const {width, height} = useWindowDimensions()
    return (
        <HBoxLayout
            widths={[300, width - 300]}
            height={height}
        >
            <LeftWindow width={0} height={0} />
            <RightWindow width={0} height={0} />
        </HBoxLayout>
    )
}
const LeftWindow: FunctionComponent<{ width: number, height: number }> = ({ width, height }) => (
    <div style={{ width, height, backgroundColor: color1, padding: 20 }}>
        <h3>@hodj/misc</h3>
        <div>
            <Hyperlink onClick={() => alert('link has been clicked')}>
                Click me
            </Hyperlink>
        </div>
        <div>
            <SmallIconButton
                icon={<Add />}
                onClick={() => alert('icon button has been clicked')}
                label="Click me"
            />
        </div>
        <div>
            <ul>
                <li>HBoxLayout</li>
                <li>VBoxLayout</li>
                <li>useWindowDimensions</li>
                <li>Hyperlink</li>
                <li>SmallIconButton</li>
            </ul>
        </div>
    </div>
)

const RightWindow: FunctionComponent<{ width: number, height: number }> = ({ width, height }) => {
    return (
        <VBoxLayout
            width={width}
            heights={[100, 100, height - 200]}
        >
            <WindowA width={0} height={0} />
            <WindowB width={0} height={0} />
            <WindowC width={0} height={0} />
        </VBoxLayout>
    )
}

const WindowA: FunctionComponent<{ width: number, height: number }> = ({ width, height }) => (
    <div style={{ width, height, backgroundColor: color2 }} />
)

const WindowB: FunctionComponent<{ width: number, height: number }> = ({ width, height }) => (
    <div style={{ width, height, backgroundColor: color3 }} />
)

const WindowC: FunctionComponent<{ width: number, height: number }> = ({ width, height }) => (
    <div style={{ width, height, backgroundColor: color4 }} />
)

export default MainWindow