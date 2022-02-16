import Select from "react-select"
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down'

const options = [
    { value: "Upcoming", quantity: 5 },
    { value: "Seated", quantity: 6 },
    { value: "Completed", quantity: 3 },
    { value: "Absent", quantity: 2 }
];

const formatOptionLabel = ({ value, quantity }: any) => (
    <div style={{ 
        display: "flex", 
    }}>
        <div>{value}</div>
        <div id="sum-status">{quantity}</div>
    </div>
);

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        width: 300,
        height: 40
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 300,
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}


const SettingStatus = () => {
    return (
        <div id="setting-status">
            <Select
                instanceId="setting-status"
                styles={customStyles}
                defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}
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