import {  usePageContext  } from '../context/PageContext'

const HeaderProfile = () => {
    const {  winSize  } = usePageContext()

    return (
        <div id="container-profile"> 
            {winSize.width > 900 && 'Long Nguyễn'}

            <div id="container-avatar">
            </div>
        </div>
    )
}
export default HeaderProfile