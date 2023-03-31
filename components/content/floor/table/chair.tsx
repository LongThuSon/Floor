import { memo } from 'react';
import { TableStatus } from '../../../../public/data-constant';
import { TChair } from '../../../../type/table.type';
import { useApiTablesContext } from '../../../context/ApiContext';
import { usePageContext } from '../../../context/PageContext';

const Chair = ({ top, left, numberChair, table }: TChair) => {
    const tables = useApiTablesContext();
    const { currentPeople } = usePageContext();

    return (
        <div
            className="chair"
            style={{
                position: 'absolute',
                top: `${top}`,
                left: `${left}`,
                backgroundColor: `${
                    numberChair <= table.seatChair
                        ? '#007296'
                        : currentPeople > table.totalChair &&
                          table.status === TableStatus.Block
                        ? 'rgba(223, 71, 89, 0.5)'
                        : 'rgba(0, 40, 100, 0.12)'
                }`,
            }}
        ></div>
    );
};
export default memo(Chair);
