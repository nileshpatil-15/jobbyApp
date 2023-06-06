/* eslint-disable prettier/prettier */
import { Component } from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'


const apiProfileStatusChange = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failed: 'FAILED',
    inprogress: 'INPROGRESS',
}


export default class Profile extends Component {

    state={
        // isProfileSown:apiProfileStatusChange.initial,
        profileData:[]
    }

componentDidMount() {
        this.getdetails()
    }

    
    getdetails = async () => {
       

        this.setState({ isProfileShown: apiProfileStatusChange.inprogress })
        const url = 'https://apis.ccbp.in/profile'
        const jwtToken = Cookies.get('jwt_token')
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        const response = await fetch(url, options)
        if (response.ok === true) {
            const fetchedData = await response.json()
            const updatedProfileData = ({
                name: fetchedData.profile_details.name,
                shortBio: fetchedData.profile_details.short_bio,
                profileImageUrl:fetchedData.profile_details.profile_image_url
            })
            this.setState({ profileData: updatedProfileData, isProfileShown: apiProfileStatusChange.success })
        }
        else {
            this.setState({ isProfileShown: apiProfileStatusChange.failed })

        }

    }        


       renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader className='loader' type="ThreeDots" color="#ffffff" height="50" width="50" />

        </div>
    )


      renderProfileContainer = () => {
        const { profileData } = this.state
        const { name, profileImageUrl, shortBio } = profileData
        console.log(name)

        return (
            <div className='profile-card'>
                <img alt='profile' className='profile-icon' src={profileImageUrl} />
                <h1 className='profile-name'>{name}</h1>
                <p className='profile-bio'>{shortBio}</p>


            </div>


        )
    }

    
    renderProfile = () => {
        const { isProfileShown } = this.state
        switch (isProfileShown) {
            case apiProfileStatusChange.inprogress:
                return this.renderLoader()
            case apiProfileStatusChange.success:
                return this.renderProfileContainer()
            case apiProfileStatusChange.failed:
                return this.renderFailedProfile()
            default:
                return null;
        }
    }

    renderFailedProfile = () => (
        <button className='retry-btn' type="button" onClick={this.getdetails} >
            Retry
    </button>
    )


    render() {
        return (
            <div className='profile-container'>
                {this.renderProfile()}
            </div>
        )
    }
}
