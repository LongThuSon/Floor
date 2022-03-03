import { useApiUsersContext } from '../../../ApiContext'
import { useEditDetailsContext } from '../../EditDetailsContext'
import Warning from '@atlaskit/icon/glyph/jira/failed-build-status';

interface IModalCancel {
    setShowModal(): void,
    handleCancelled(): void,
}

const ModalCanCel = ({ setShowModal, handleCancelled }: IModalCancel) => {
    const profiles = useApiUsersContext()
    const { indexED, setIndexED } = useEditDetailsContext()

    return (
        <div id="modal-cancel">
            <div id="modal-cancel-container">
                <span>
                    <Warning
                        label='warning'
                        size='xlarge'
                        primaryColor='#FFE0A4'
                    />
                </span>
                <div id='title-modal-cancel'>Cancel Reservation: #{profiles[indexED].id}</div>
                <div id='for-modal-cancel'>for {profiles[indexED].firstname} {profiles[indexED].lastname}</div>
                <div id='button-container'>
                    <button 
                        id='not-now-btn'
                        onClick={setShowModal}    
                    >Not Now</button>
                    <button 
                        id='cancel-btn'
                        onClick={handleCancelled}    
                    >Cancel Reservation</button>
                </div>
            </div>
        </div>
    )
}
export default ModalCanCel