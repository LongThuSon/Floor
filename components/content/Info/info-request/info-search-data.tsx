import BookIcon from '@atlaskit/icon/glyph/book'
import PeopleIcon from '@atlaskit/icon/glyph/people'

const SearchData = () => {
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
                22 Bookings
            </div>
            <div 
                className='search-data-item'
                style={{marginRight: "35px"}}
            >
                <span>
                    <PeopleIcon
                        label="book"
                    />
                </span>
                15 Covers
            </div>
        </div>
    )
}
export default SearchData