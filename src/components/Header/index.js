/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom'
import { BiHomeCircle, BiExit } from 'react-icons/bi'
import { TiShoppingBag } from 'react-icons/ti'
import './index.css'


const Header = () => (
    <nav className='nav-container'>
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
                <Link to='login'>
                    <BiExit className='mobile-view-header-button' />
                </Link>
            </li>

        </ul>

    </nav>
)
export default Header