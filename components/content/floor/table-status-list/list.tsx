interface ComponentList {
    color: string,
    define: string,
    radius: string
}

const infoList = [
    {
        color: '#A9EAFF',
        define: 'In Use',
        radius: ''
    },
    {
        color: '#FFE0A4',
        define: 'Call for Cheque',
        radius: ''
    },
    {
        color: '#FFD0EF',
        define: 'Cleaning Required',
        radius: ''
    },
    {
        color: '#DCD0FF',
        define: 'Reserved',
        radius: ''
    },
    {
        color: '#DFDFDF',
        define: 'Blocked',
        radius: ''
    },
    {
        color: '#FFFFFF',
        define: 'Available',
        radius: ''
    },
    {
        color: '#FFA4A4',
        define: 'Overstay',
        radius: ''
    },
    {
        color: '#DF4759',
        define: 'Clash',
        radius: ''
    },
    {
        color: '#007296',
        define: 'Seat Occupied',
        radius: '50%'
    },
    {
        color: 'rgba(0, 40, 100, 0.12)',
        define: 'Seat Unoccupied',
        radius: '50%'
    }
]

const ComponentList = (props: ComponentList) => {
    return (
        <div>
            <div
                className='table-color'
                style={{
                    backgroundColor: `${props.color}`,
                    borderRadius: `${props.radius}`

                }}
            ></div>
            {props.define}
        </div>
    )
}

const List = () => {
    return (
        <div id='container-list'>
            {infoList.map(({ color, define, radius }, index) => (
                <ComponentList
                    key={index}
                    color={color}
                    define={define}
                    radius={radius}
                />
            ))}

            <div
                style={{
                    display: "flex",
                    alignItems: "left",
                    marginTop: "10px"
                }}
            >
                <div
                    className='status-time'
                    style={{
                        backgroundColor: '#E9EDF3',
                        color: '#506690'
                    }}
                >1.30 PM</div>
                <div
                    style={{
                        display: "inline-block",
                        lineHeight: "15px"
                    }}
                >Upcoming <br /> Reservation</div>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "left",
                    marginTop: "10px"
                }}
            >
                <div
                    className='status-time'
                    style={{
                        backgroundColor: '#FFEFE5',
                        color: '#FF5C00'

                    }}
                >1.30 PM</div>
                <div
                    style={{
                        display: "inline-block",
                        lineHeight: "15px"
                    }}
                >Late</div>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "left",
                    marginTop: "10px"
                }}
            >
                <div
                    className='status-time'
                    style={{
                        backgroundColor: '#DF4759',
                        color: '#FFFFFF'

                    }}
                >1.30 PM</div>
                <div
                    style={{
                        display: "inline-block",
                        lineHeight: "15px"
                    }}
                >Upcoming <br /> Clash</div>
            </div>
        </div>
    )
}
export default List