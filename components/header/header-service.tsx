import React from 'react';
import Select from 'react-select';
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import { TypeService } from '../../public/data-constant';
import { usePageContext } from '../context/PageContext';

const options = [
    { value: TypeService.Lunch, title: 'Lunch Service' },
    { value: TypeService.Dinner, title: 'Dinner Service' },
];

const formatOptionLabel = ({ value, title }: any) => (
    <div
        style={{
            paddingTop: '10px',
            paddingLeft: '15px',
            fontSize: '15px',
            color: '#1B2A4E',
            cursor: 'pointer',
        }}
    >
        {title}
    </div>
);

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        width: 150,
        height: 40,
    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 150,
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    },
};

const HeaderSer = () => {
    const { setTypeService } = usePageContext();

    return (
        <div id="nav">
            <Select
                instanceId="nav-select"
                styles={customStyles}
                defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}
                isSearchable={false}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                onChange={(option) =>
                    setTypeService(Number(option?.value) as TypeService)
                }
            />
            <span id="header-service-drop-down">
                <HipchatChevronDownIcon
                    label="down"
                    size="small"
                    primaryColor="#1B2A4E"
                />
            </span>
        </div>
    );
};

export default HeaderSer;
