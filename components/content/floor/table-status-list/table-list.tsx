import BulletListIcon from '@atlaskit/icon/glyph/bullet-list'
import MediaServicesLineIcon from '@atlaskit/icon/glyph/media-services/line'
import { Check } from "./index"

const TableList = (props : Check) => {
    return (
        <div>
            <BulletListIcon
                label='table-list'
                size='xlarge'
                primaryColor='#7C69EF'
            />

            <span
                style={{
                    display: `${props.checked ? 'none' : ''}`,
                    position: "absolute",
                    top: "-1px",
                    left: "-1px",
                }}
            >
                <MediaServicesLineIcon
                    label='refuse'
                    size='xlarge'
                    primaryColor='#E1E6F9'
                />
            </span>
            <span
                style={{
                    display: `${props.checked ? 'none' : ''}`,
                    position: "absolute",
                    top: "8px",
                    left: "9px",
                }}
            >
                <MediaServicesLineIcon
                    label='refuse'
                    size='large'
                    primaryColor='#7C69EF'
                />
            </span>
        </div>
    )
}

export default TableList