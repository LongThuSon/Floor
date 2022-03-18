import { useApiUsersContext } from '../../../context/ApiContext'
import BookIcon from '@atlaskit/icon/glyph/book'
import PeopleIcon from '@atlaskit/icon/glyph/people'

const SearchData = () => {
    const profiles = useApiUsersContext()

    const sumQuantity = () => {
        let sumQuantity = 0
        for (let i in profiles) {
            sumQuantity += (profiles[i].quantity % 5 + 1)
        }
        return sumQuantity
    }
    
    return (
        <div id="info-search-data">
            <div 
                className='search-data-item'
                style={{marginLeft: "35px"}}
            >
                <span>
                    <BookIcon
                        label="book"
                    />
                </span>
                {profiles.length ?? 0} Bookings
            </div>
            <div 
                className='search-data-item'
                style={{marginRight: "35px"}}
            >
                <span>
                    <PeopleIcon
                        label="people"
                    />
                </span>
                {sumQuantity() ?? 0} Covers
                {/* 0 Covers */}
            </div>
        </div>
    )
}
export default SearchData