import Select from "react-select";
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down'

const options = [
    { value: "Lunch Service" },
    { value: "Dinner Service" }
];

const formatOptionLabel = ({ value, quantity }: any) => (
    <div
        style={{
            paddingTop: "10px",
            paddingLeft: "15px",
            fontSize: "15px",
            color: "#1B2A4E",
            cursor: "pointer"
        }}
    >
        {value}
    </div>
);

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        width: 155,
        height: 40
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 155,
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}

const HeaderSer = () => {
    return (
        <div id="nav">
            <Select
                instanceId="nav-select"
                styles={customStyles}
                defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}
                isSearchable={false}
            />
            <span
                id="header-service-drop-down"
            >
                <HipchatChevronDownIcon
                    label='down'
                    size="small"
                    primaryColor="#1B2A4E"
                />
            </span>
        </div>
    )
}

export default HeaderSer