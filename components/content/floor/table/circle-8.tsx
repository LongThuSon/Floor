import { useState, memo } from 'react';
import { usePageContext } from '../../../context/PageContext';
import { useContentContext } from '../../../context/ContentContext';
import Draggable from 'react-draggable';
import Chair from './chair';
import Save from '@atlaskit/icon/glyph/download';
import LockIcon from '@atlaskit/icon/glyph/lock';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import { TTableProps } from '../../../../type/table.type';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { deleteTable, updateTable } from '../../../../redux/slices/table.silce';
import {
    reservTimeTable,
    styleTable,
} from '../../../../public/function-common';
import { customerDF, TableStatus } from '../../../../public/data-constant';

const Circle8 = ({ table, customerChoosen, changedNTable }: TTableProps) => {
    const dispatch = useAppDispatch();
    const customer =
        useAppSelector((state) =>
            state.customers.customerList.find(
                (cus) => cus._id === table.idCustomer,
            ),
        ) ?? customerDF;

    const { winSize, customerChanged } = usePageContext();
    const { move } = useContentContext();
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [showOption, setShowOption] = useState(false);

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

    const handleLookTb = () => {
        if (table.idCustomer === '') {
            var isBlock = true;
            if (table.isBlock) {
                isBlock = false;
            }
            const newTable = {
                id: table._id,
                data: {
                    isBlock: isBlock,
                },
            };

            dispatch(updateTable(newTable));
        }
    };

    const handleRemoveTb = () => {
        if (table.idCustomer === '') {
            dispatch(deleteTable(table._id));
        }
    };

    return (
        <Draggable disabled={move} onDrag={(e, data) => trackPos(data)}>
            <div
                className="container-circle-8"
                style={{
                    top: `${(table.topPositon / 667) * winSize.height}px`,
                    left: `${(table.leftPositon / 1535) * winSize.width}px`,
                    cursor: `${move ? 'default' : 'move'}`,
                }}
            >
                <Chair
                    top="-6px"
                    left="29px"
                    numberChair={1}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="9px"
                    left="44px"
                    numberChair={2}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="29px"
                    left="44px"
                    numberChair={3}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="44px"
                    left="9px"
                    numberChair={5}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="44px"
                    left="29px"
                    numberChair={4}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="29px"
                    left="-6px"
                    numberChair={6}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="9px"
                    left="-6px"
                    numberChair={7}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />
                <Chair
                    top="-6px"
                    left="9px"
                    numberChair={8}
                    table={table}
                    customer={customer}
                    currentPeople={customerChoosen.quantityBook}
                />

                <div
                    className="circle-8"
                    style={styleTable(
                        table,
                        customer,
                        customerChanged.quantityBook,
                        changedNTable,
                    )}
                >
                    {table.number}
                </div>

                {reservTimeTable(
                    customer.statusTable,
                    customer,
                    'reserv-time-circle-8',
                )}

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

                {showOption && move && (
                    <div className="save-position">
                        <div onClick={handleLookTb}>
                            <LockIcon
                                label="look"
                                size="small"
                                primaryColor="#067E30"
                            />
                        </div>

                        <div onClick={handleRemoveTb}>
                            <TrashIcon
                                label="trash"
                                size="small"
                                primaryColor="#067E30"
                            />
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
};
export default memo(Circle8);
