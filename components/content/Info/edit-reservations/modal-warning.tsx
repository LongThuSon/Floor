import { memo } from 'react';
import Warning from '@atlaskit/icon/glyph/jira/failed-build-status';

interface IModalWarning {
    setShowWModal(): void;
    handleSave(): void;
}

const ModalWarning = ({ setShowWModal, handleSave }: IModalWarning) => {
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
                <div id="title-modal-cancel">Warning</div>
                <div id="for-modal-cancel">Confirm to edit reservation?</div>
                <div id="button-container">
                    <button id="not-now-btn" onClick={setShowWModal}>
                        Not Now
                    </button>
                    <button id="cancel-btn" onClick={handleSave}>
                        Save Reservation
                    </button>
                </div>
            </div>
        </div>
    );
};
export default memo(ModalWarning);
