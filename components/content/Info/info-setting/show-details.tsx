import {  useInfoContext  } from '../../../context/InfoContext'

const ShowDetails = () => {
    const { showDetails, setShowDetails } = useInfoContext()
    return (
        <div id="show-details">
            Show Details 
            <div id="switch-component-1">
                <div id="switch-component-2">
                    <div 
                        id="switch-component-3"
                        style={{
                            backgroundColor: `${!showDetails ? '' : '#7C69EF'}`
                        }}
                        onClick={() => setShowDetails(!showDetails)}
                    ></div>
                </div>
            </div>
        </div>
    )
}
export default ShowDetails