import { FunctionComponent } from "react"
import ModalWindow, {useModalWindow} from '@hodj/modal-window';

const MainWindow: FunctionComponent = () => {
    const {visible, handleClose, handleOpen} = useModalWindow()
    return (
        <div>
            <button onClick={handleOpen}>
                Click to open modal window
            </button>
            <ModalWindow
                onClose={handleClose}
                visible={visible}
            >
                <div style={{padding: 20}}>
                    <h1>Modal Window</h1>
                    <p>Click the button below to close the modal window</p>
                    <button onClick={handleClose}>Close</button>
                </div>
            </ModalWindow>
        </div>
    )
}

export default MainWindow