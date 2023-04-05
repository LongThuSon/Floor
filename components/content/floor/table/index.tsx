import { memo } from 'react';
import { useAppSelector } from '../../../../redux/hook';
import Circle14 from './circle-14';
import Circle6 from './circle-6';
import Circle8 from './circle-8';
import Table1v1 from './table-1v1';
import Table2v2Column from './table-2v2-column';
import Table2v2Row from './table-2v2-row';
import Table3v3 from './table-3v3';
import Table6v6 from './table-6v6';
import Table7v7 from './table-7v7';
import {
    customerDF,
    tableDF,
    TableType,
} from '../../../../public/data-constant';
import { useAppDispatch } from '../../../../redux/hook';
import { deleteTable } from '../../../../redux/slices/table.silce';
import { usePageContext } from '../../../context/PageContext';

const AllTables = () => {
    const tableList = useAppSelector((state) => state.tables.tableList);
    const customerChossen =
        useAppSelector((state) => state.customers.customerChoosen) ??
        customerDF;
    const dispatch = useAppDispatch();
    const { customerChanged } = usePageContext();

    const getNChangedTable = () => {
        const table = tableList.find(
            (table) => table.idCustomer === customerChanged.idTable,
        );
        return table?.number ?? tableDF.number;
    };

    return (
        <div id="container-tables">
            {tableList.map((table) => {
                switch (table.type) {
                    case TableType._1v1:
                        return (
                            <Table1v1
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType._2v2c:
                        return (
                            <Table2v2Column
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType._2v2c:
                        return (
                            <Table2v2Row
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType._3v3:
                        return (
                            <Table3v3
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType._6v6:
                        return (
                            <Table6v6
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType._7v7:
                        return (
                            <Table7v7
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType.C6:
                        return (
                            <Circle6
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType.C8:
                        return (
                            <Circle8
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    case TableType.C14:
                        return (
                            <Circle14
                                table={table}
                                customerChoosen={customerChossen}
                                changedNTable={getNChangedTable()}
                            />
                        );
                    default:
                        return dispatch(deleteTable(table._id));
                }
            })}
        </div>
    );
};

export default memo(AllTables);
