import { memo } from 'react';
import { usePageContext } from '../../../context/PageContext';
import Warning from '@atlaskit/icon/glyph/jira/failed-build-status';
import { useAppSelector } from '../../../../redux/hook';
import { customerDF } from '../../../../public/data-constant';

interface IModalCancel {
    setShowModal(): void;
    handleCancelled(): void;
}

const ModalCanCel = ({ setShowModal, handleCancelled }: IModalCancel) => {
    const customerChoosen =
        useAppSelector((state) => state.customers.customerChoosen) ??
        customerDF;

    return (
        <div id="modal-cancel">
            <div id="modal-cancel-container">
                <span>
                    <Warning
                        label="warning"
                        size="xlarge"
                        primaryColor="#FFE0A4"
                    />
                </span>
                <div id="title-modal-cancel">
                    Cancel Reservation: #{customerChoosen._id}
                </div>
                <div id="for-modal-cancel">for {customerChoosen.name}</div>
                <div id="button-container">
                    <button id="not-now-btn" onClick={setShowModal}>
                        Not Now
                    </button>
                    <button id="cancel-btn" onClick={handleCancelled}>
                        Cancel Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};
export default memo(ModalCanCel);
