import { TCustomer } from '../../type/customer.type';
import { TTable } from '../../type/table.type';
import { CustomerStatus, TableStatus } from '../data-constant';

const primaryColorTable = (status: TableStatus) => {
    switch (status) {
        case TableStatus.InUse:
            return '#A9EAFF';
        case TableStatus.Reserved:
            return '#A260DD';
        case TableStatus.Block:
            return '#DFDFDF';
        case TableStatus.Available:
            return '#FFFFFF';
        case TableStatus.Overstay:
            return '#FFA4A4';
        case TableStatus.Clash:
            return '#DF4759';
        default:
            return '#FFFFFF';
    }
};

const styleTable = (
    table: TTable,
    customerChossen: TCustomer | null,
    currentPeople: number,
    changedNTable: number,
) => {
    return {
        backgroundImage: `linear-gradient(to top, ${primaryColorTable(
            table.status,
        )} ${table.status === TableStatus.InUse ? 20 : 100}%, ${
            table.status === TableStatus.Overstay
                ? '#FFA4A4'
                : table.status === TableStatus.InUse
                ? 'rgb(220, 239, 245)'
                : '#fff'
        } ${20}%, ${
            table.status === TableStatus.Overstay
                ? '#FFA4A4'
                : table.status === TableStatus.InUse
                ? 'rgb(220, 239, 245)'
                : '#fff'
        })`,
        color: `${
            table.status === TableStatus.Clash
                ? '#fff'
                : currentPeople > table.totalChair &&
                  table.status === TableStatus.Available
                ? 'rgba(223, 71, 89, 0.5)'
                : '#869AB8'
        }`,
        border: `${
            customerChossen?.idTable === table._id
                ? '2px dashed #506690'
                : changedNTable === table.number
                ? '2px solid #506690'
                : 'none'
        }`,
    };
};

const reservTimeTable = (
    table: TTable,
    customer: TCustomer | undefined,
    className: string,
) => {
    if (table.status != TableStatus.Available) {
        return (
            <div
                className={className}
                style={{
                    backgroundColor: `${
                        table.status === TableStatus.Clash
                            ? '#DF4759'
                            : customer?.status !== CustomerStatus.Late
                            ? '#E9EDF3'
                            : '#FFEFE5'
                    }`,
                    color: `${
                        table.status === TableStatus.Clash
                            ? '#fff'
                            : customer?.status !== CustomerStatus.Late
                            ? '#506690'
                            : '#FF5C00'
                    }`,
                }}
            >
                <div style={{ fontWeight: 600 }}>{customer?.timeOrder}</div>
            </div>
        );
    } else {
        return <></>;
    }
};

export { primaryColorTable, styleTable, reservTimeTable };
