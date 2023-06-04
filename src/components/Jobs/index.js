/* eslint-disable prettier/prettier */
import Cookies from 'js-cookie'
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import { BsSearch } from 'react-icons/bs'
import Alljobs from '../Alljobs'
import Filtergroup from '../Filtergroup'
import Header from '../Header'



import './index.css'

const employmentTypesList = [
    {
        label: 'Full Time',
        employmentTypeId: 'FULLTIME',
    },
    {
        label: 'Part Time',
        employmentTypeId: 'PARTTIME',
    },
    {
        label: 'Freelance',
        employmentTypeId: 'FREELANCE',
    },
    {
        label: 'Internship',
        employmentTypeId: 'INTERNSHIP',
    },
]

const salaryRangesList = [
    {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
    },
    {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
    },
    {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
    },
    {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
    },
]



const apiStatusChange = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failed: 'FAILED',
    inprogress: 'INPROGRESS',
}
const apiProfileStatusChange = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failed: 'FAILED',
    inprogress: 'INPROGRESS',
}

export default class Jobs extends Component {
    state = {
        isProfileShown: apiProfileStatusChange.initial,
        profileData: [],
        activeEmploymentId: [],
        salaryActiveId: '',
        jobSearchinput: ''

    }

    componentDidMount() {
        this.getProfile()

    }

    getProfile = async () => {

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
                profileImageUrl: fetchedData.profile_details.profile_image_url,
                shortBio: fetchedData.profile_details.short_bio
            })
            this.setState({ profileData: updatedProfileData, isProfileShown: apiProfileStatusChange.success })
        }
        else {
            this.setState({ isProfileShown: apiProfileStatusChange.failed })

        }

    }

    onChangejobSearch = (event) => {
        this.setState({ jobSearchinput: event.target.value })
    }


    renderJobSearchinput = () => (
        <div className='jobsearch-input-container'>
            <input
                className='jobsearch-input'
                type='search'
                placeholder='Search'
                onChange={this.onChangejobSearch}
            />
            {/* <BiSearchAlt2 className='job-search-icon' /> */}
            <button className='job-search-btn' type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
            </button>
        </div>
    )

    renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />

        </div>
    )

    renderProfileContainer = () => {
        const { profileData } = this.state
        const { name, profileImageUrl, shortBio } = profileData

        return (
            <div className='profile-card'>
                <img alt='profile' src={profileImageUrl} />
                <p className='profile-name'>{name}</p>
                <p className='profile-bio'>{shortBio}</p>


            </div>


        )
    }



    renderFailedProfile = () => (
        <button className='retry-btn' type="button" onClick={this.getProfile} >
            Retry
    </button>
    )



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

    changeEmployment = (isChecked, employmentType) => {
        const { activeEmploymentId } = this.state
        if (isChecked) {
            this.setState({ activeEmploymentId: [...activeEmploymentId, employmentType] })
        }
        else {
            this.setState({ activeEmploymentId: activeEmploymentId.filter(each => each !== employmentType) })
        }
    }

    changeSalaryRange = (salaryRange) => {
        this.setState({ salaryActiveId: salaryRange })
    }

    render() {
        const { jobSearchinput, salaryActiveId, activeEmploymentId } = this.state

        return (
            <div className='jobs-main-container'>
                <Header />
                <div className='jobs-container'>
                    <div className='filter-and-profile-container'>
                        {this.renderJobSearchinput()}
                        <div className='profile-container'>
                            {this.renderProfile()}
                        </div>
                        <div className='all-jobs-container'>
                            <Filtergroup
                                employmentTypesList={employmentTypesList}
                                salaryRangesList={salaryRangesList}
                                changeEmployment={this.changeEmployment}
                                changeSalaryRange={this.changeSalaryRange}
                            // searchInput={searchInput}
                            />
                        </div>

                    </div>
                    <div className='filtered-job-container'>
                        <Alljobs jobSearchinput={jobSearchinput} />
                    </div>
                </div>




            </div>

        )

    }
}

