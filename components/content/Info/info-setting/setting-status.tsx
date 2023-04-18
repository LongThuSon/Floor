import React, { useEffect } from 'react';
import Select from 'react-select';
import { useInfoContext } from '../../../context/InfoContext';
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import { useAppSelector } from '../../../../redux/hook';
import {
    CustomerStatus,
    RequestStatus,
} from '../../../../public/data-constant';

const SettingStatus = () => {
    const customerList = useAppSelector(
        (state) => state.customers.customerList,
    );
    const { setSearchField } = useInfoContext();

    useEffect(() => {
        handleSettingChange(RequestStatus.All);
    }, []);

    const sumQuantity = (value: CustomerStatus) => {
        let settingProfiles;
        if (
            value === CustomerStatus.Seated ||
            value === CustomerStatus.Completed ||
            value === CustomerStatus.NoShow ||
            value === CustomerStatus.Cancelled
        ) {
            settingProfiles = customerList.filter(
                (person) => person.status === value,
            );
        } else {
            settingProfiles = customerList.filter(
                (person) =>
                    person.status !== CustomerStatus.Seated &&
                    person.status !== CustomerStatus.Completed &&
                    person.status !== CustomerStatus.NoShow &&
                    person.status !== CustomerStatus.Cancelled,
            );
        }
        return settingProfiles.length;
    };

    const handleSettingChange = (status: RequestStatus) => {
        console.log('status request: ', status);
        setSearchField((prev: any) => ({
            request: {
                ...prev.request,
                status: status,
            },
        }));
    };

    const options = [
        {
            status: RequestStatus.All,
            value: 'All',
            quantity: `${customerList.length}`,
        },
        {
            status: RequestStatus.Upcoming,
            value: 'Upcoming',
            quantity: `${sumQuantity(CustomerStatus.Booked)}`,
        },
        {
            status: RequestStatus.Seated,
            value: 'Seated',
            quantity: `${sumQuantity(CustomerStatus.Seated)}`,
        },
        {
            status: RequestStatus.Completed,
            value: 'Completed',
            quantity: `${sumQuantity(CustomerStatus.Completed)}`,
        },
        {
            status: RequestStatus.Absent,
            value: 'Absent',
            quantity: `${
                sumQuantity(CustomerStatus.NoShow) +
                sumQuantity(CustomerStatus.Cancelled)
            }`,
        },
    ];

    const formatOptionLabel = ({ status, value, quantity }: any) => (
        <div
            style={{
                display: 'flex',
            }}
            onClick={() => handleSettingChange(status)}
        >
            <div>{value}</div>
            <div id="sum-status">{quantity}</div>
        </div>
    );

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            width: 450,
            height: 40,
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 450,
        }),
        singleValue: (provided: any, state: any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        },
    };

    return (
        <div id="setting-status">
            <Select
                instanceId="setting-status"
                styles={customStyles}
                defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
            />
            <span id="setting-drop-down">
                <HipchatChevronDownIcon
                    label="down"
                    size="small"
                    primaryColor="#869AB8"
                />
            </span>
        </div>
    );
};
export default SettingStatus;
