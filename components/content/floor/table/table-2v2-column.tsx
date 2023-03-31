import { useState, memo } from 'react';
import { usePageContext } from '../../../context/PageContext';
import { useContentContext } from '../../../context/ContentContext';
import Chair from './chair';
import Draggable from 'react-draggable';
import Save from '@atlaskit/icon/glyph/download';
import { TTableProps } from '../../../../type/table.type';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { updateTable } from '../../../../redux/slices/table.silce';
import {
    reservTimeTable,
    styleTable,
} from '../../../../public/function-common';
import { CustomerStatus, TableStatus } from '../../../../public/data-constant';

const Table2v2Column = ({ table }: TTableProps) => {
    const dispatch = useAppDispatch();
    const customer = useAppSelector((state) =>
        state.customers.customerList.find(
            (cus) => cus._id === table.idCustomer,
        ),
    );
    const customerChossen = useAppSelector(
        (state) => state.customers.customerChoosen,
    );

    const { winSize, currentPeople, changedNTable } = usePageContext();
    const { move } = useContentContext();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const trackPos = (data: any) => {
        setPosition({
            top: table.topPositon + data.y,
            left: table.leftPositon + data.x,
        });
    };

    const handleSavePosition = () => {
        const newTable = {
            id: table._id,
            data: {
                topPositon: position.top,
                leftPositon: position.left,
            },
        };

        dispatch(updateTable(newTable));
    };

    return (
        <Draggable disabled={move} onDrag={(e, data) => trackPos(data)}>
            <div
                className="container-table-2v2-column"
                style={{
                    top: `${(table.topPositon / 667) * winSize.height}px`,
                    left: `${(table.leftPositon / 1535) * winSize.width}px`,
                    cursor: `${move ? 'default' : 'move'}`,
                }}
            >
                <Chair top="10px" left="-9px" numberChair={4} table={table} />
                <Chair top="10px" left="29px" numberChair={1} table={table} />
                <Chair top="38px" left="-9px" numberChair={3} table={table} />
                <Chair top="38px" left="29px" numberChair={2} table={table} />

                <div
                    className="table-2v2-column"
                    style={styleTable(
                        table,
                        customerChossen,
                        currentPeople,
                        changedNTable,
                    )}
                >
                    {table.number}
                </div>

                {reservTimeTable(table, customer, 'reserv-time-2v2-column')}

                {!move && (
                    <div
                        className="save-position"
                        onClick={() => handleSavePosition()}
                    >
                        <Save
                            label="save"
                            size="small"
                            primaryColor="#067E30"
                        />
                    </div>
                )}
            </div>
        </Draggable>
    );
};
export default memo(Table2v2Column);
