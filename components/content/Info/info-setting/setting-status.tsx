import { useEffect } from 'react'
import Select from "react-select"
import { useApiUsersContext } from '../../../context/ApiContext'
import { useResetApiContext } from '../../../context/ApiContext/resetApiContext'
import { useInfoContext } from '../../../context/InfoContext'
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down'

const SettingStatus = () => {
    const profiles = useApiUsersContext()
    const { date } = useResetApiContext()
    const { setSearchField } = useInfoContext()

    const profilesFD  = profiles.filter(
        person => {
            return (
                person.date.includes(date)
            )
        }
    )

    const sumQuantity = (value: number) => {
        let settingProfiles
        if (value === 3 || value === 4 || value === 5 || value === 6) {
            settingProfiles = profilesFD.filter(
                person => (person.status % 100) === value
            )
        } else {
            settingProfiles = profilesFD.filter(
                person => (person.status % 100) !== 3 && (person.status % 100) !== 4 && (person.status % 100) !== 5 && (person.status % 100) !== 6
            )
        }
        return settingProfiles.length
    }

    const handleSettingChange = (status: number) => {
        setSearchField((prev: any) => ({
            request: {
                ...prev.request,
                status: status,
            }
        }))
    }

    const options = [
        { status: -1, value: "All", quantity: `${profilesFD.length}` },
        { status: -3, value: "Upcoming", quantity: `${sumQuantity(0)}` },
        { status: 3, value: "Seated", quantity: `${sumQuantity(3)}` },
        { status: 4, value: "Completed", quantity: `${sumQuantity(4)}` },
        { status: -2, value: "Absent", quantity: `${sumQuantity(5) + sumQuantity(6)}` },
    ];

    const formatOptionLabel = ({ status, value, quantity }: any) => (
        <div style={{
            display: "flex",
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
            height: 40
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 450,
        }),
        singleValue: (provided: any, state: any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }

    return (
        <div id="setting-status">
            <Select
                instanceId="setting-status"
                styles={customStyles}
                // defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            />
            <span
                id="setting-drop-down"
            >
                <HipchatChevronDownIcon
                    label='down'
                    size="small"
                    primaryColor="#869AB8"
                />
            </span>
        </div>
    )
}
export default SettingStatus