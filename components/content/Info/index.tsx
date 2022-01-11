import {  useState  } from 'react'
import { InfoContext } from "./InfoContext"
import SearchData from "./info-request/info-search-data"
import Request from "./info-request"
import Setting from "./info-setting"
import Customer from "./info-customer"

const Info = () => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div id="container-info">
            <InfoContext.Provider
                value={{  showDetails, setShowDetails  }}
            >
                <SearchData />
                <Request />
                <Setting />
                <Customer />
            </InfoContext.Provider>
        </div>
    )
}
export default Info