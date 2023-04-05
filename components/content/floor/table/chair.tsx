import { memo } from 'react';
import { TableStatus } from '../../../../public/data-constant';
import { TChair } from '../../../../type/table.type';
import { usePageContext } from '../../../context/PageContext';

const Chair = ({
    top,
    left,
    numberChair,
    table,
    customer,
    currentPeople,
}: TChair) => {
    return (
        <div
            className="chair"
            style={{
                position: 'absolute',
                top: `${top}`,
                left: `${left}`,
                backgroundColor: `${
                    numberChair <= customer.quantityBook
                        ? '#007296'
                        : currentPeople > table.totalChair &&
                          customer.statusTable === TableStatus.Available
                        ? 'rgba(223, 71, 89, 0.5)'
                        : 'rgba(0, 40, 100, 0.12)'
                }`,
            }}
        ></div>
    );
};
export default memo(Chair);
