import HeaderMenu from './header-menu'
import HeaderTime from "./header-time"
import HeaderSer from './header-service'
import HeaderDocu from './header-document'
import HeaderProfile from "./header-profile"

const Header = () => {
    return (
        <div className="header-main">
            <HeaderMenu />
            <HeaderTime />          
            <HeaderSer />
            <HeaderDocu />
            <HeaderProfile />
        </div>
    )
}
export default Header