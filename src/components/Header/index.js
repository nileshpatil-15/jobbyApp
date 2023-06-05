/* eslint-disable prettier/prettier */
import { Link,withRouter } from 'react-router-dom'
import { BiHomeCircle, BiExit } from 'react-icons/bi'
import { TiShoppingBag } from 'react-icons/ti'
import Cookie from 'js-cookie'
import './index.css'


const Header = () => {

    const logOut = () => {

        Cookie.remove('jwt_token')

    }

    return (<div className='nav-container'>
        <Link to='/'>
            <img className='mobile-view-header-logo' alt='website logo' src='https://assets.ccbp.in/frontend/react-js/logo-img.png' />
        </Link>
        <ul className='mobile-view-button-container'>
            <li>
                <Link to='/'>
                    <BiHomeCircle className='mobile-view-header-button' />
                </Link>
            </li>
            <li>

                <Link to='/jobs'>

                    <TiShoppingBag className='mobile-view-header-button' />
                </Link>
            </li>
            <li>
                <button type="button" className='mobile-view-logout-button' onClick={logOut}>
                    <Link to='login'>
                        <BiExit className='mobile-view-header-button' />
                    </Link>
                </button>

            </li>

        </ul>
        <ul className='desktop-view-button-container'>
            <li className='home-text'>
                <Link className='link' to='/'>
                    <p >Home</p>
                </Link>
            </li>
            <li className='job-text' >
                <Link className='link' to='/jobs'>
                    <p >Jobs</p>
                </Link>
            </li>
            <li className='button'>
                <Link  to='/login'>
                    <button type="button" className='desktop-view-logout-button' onClick={logOut}>
                        Logout
                </button>
                </Link>
            </li>
        </ul>

    </div>
    )
}
export default withRouter(Header)