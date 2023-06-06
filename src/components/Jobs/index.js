/* eslint-disable prettier/prettier */
import Cookies from 'js-cookie'
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import { BsSearch } from 'react-icons/bs'
import Alljobs from '../Alljobs'
import Filtergroup from '../Filtergroup'
import Header from '../Header'
import Profile from '../Profile'



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
    nojobs: 'NOJOBS'
}


export default class Jobs extends Component {
    state = {

        activeEmploymentId: [],
        salaryActiveId: '',
        jobSearchinput: '',
        jobsData: [],
        isjoblistShown: apiStatusChange.initial

    }

    componentDidMount() {
        this.getdetails()


    }



    getdetails = async () => {

        const { jobSearchinput, salaryActiveId, activeEmploymentId } = this.state

        this.setState({ isjoblistShown: apiStatusChange.inprogress })

        const jwtToken = Cookies.get('jwt_token')
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        const jobfilterApi = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId.join()}&minimum_package=${salaryActiveId}&search=${jobSearchinput}`
        const response2 = await fetch(jobfilterApi, options)
        console.log(response2.ok)

        const data = await response2.json()
        if (response2.ok === true || (data.jobs.length) > 0) {

            const formatedData = data.jobs.map(each => ({
                companyLogoUrl: each.company_logo_url,
                employmentType: each.employment_type,
                id: each.id,
                jobDescription: each.job_description,
                location: each.location,
                packagePerAnnum: each.package_per_annum,
                rating: each.rating,
                title: each.title
            }))
            if (data.jobs.length === 0) {
                console.log('nothing to apply')
                this.setState({ isjoblistShown: apiStatusChange.nojobs })

            } else {
                this.setState({ jobsData: formatedData, isjoblistShown: apiStatusChange.success })
            }
        }

        else {
            this.setState({ isjoblistShown: apiStatusChange.failed })

        }


    }

    onClickSearchBtn = () => {
        this.getdetails()
    }

    onChangejobSearch = (event) => {
        this.setState({ jobSearchinput: event.target.value }, this.getdetails)
    }

    enterSearch = (event) => {
        if (event.key === 'Enter') {
            this.getdetails()
        }
    }


    renderJobSearchinput = () => (
        <div className='jobsearch-input-container'>
            <input
                className='jobsearch-input'
                type='search'
                placeholder='Search'
                onChange={this.onChangejobSearch}
                onKeyDown={this.enterSearch}
            />

            <button className='job-search-btn' type="button" data-testid="searchButton" onClick={this.onClickSearchBtn}>
                <BsSearch className="search-icon" />
            </button>
        </div>
    )

    renderDesktopSearchinput = () => (
        <div className='desktop-jobsearch-input-container'>
            <input
                className='jobsearch-input'
                type='search'
                placeholder='Search'
                onChange={this.onChangejobSearch}
                onKeyDown={this.enterSearch}
            />

            <button className='job-search-btn' type="button" data-testid="searchButton" onClick={this.onClickSearchBtn}>
                <BsSearch className="search-icon" />
            </button>
        </div>

    )


    renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader className='loader' type="ThreeDots" color="#ffffff" height="50" width="50" />

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







    changeEmployment = (isChecked, employmentType) => {
        const { activeEmploymentId } = this.state
        if (isChecked) {
            this.setState({ activeEmploymentId: [...activeEmploymentId, employmentType] }, this.getdetails)
        }
        else {
            this.setState({ activeEmploymentId: activeEmploymentId.filter(each => each !== employmentType) })
        }
    }

    changeSalaryRange = (salaryRange) => {
        this.setState({ salaryActiveId: salaryRange }, this.getdetails)
    }

    renderFailedJobs = () => (
        <div className='failed-job-container'>
            <img alt='failure view' className='job-failed-img' src='https://assets.ccbp.in/frontend/react-js/failure-img.png' />
            <h1 className='job-failed-title'>Oops! Something Went Wrong</h1>
            <p className='job-failed-description'>
               We cannot seem to find the page you are looking for
</p>
            <button className='retry-btn' type="button" onClick={this.getdetails} >
                Retry
    </button>

        </div>
    )

    renderNoJobs = () => {
        console.log('triggered')

        return (
            < div className='no-job-container'>
            <img className='no-job-img' src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt='no jobs' />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
</div>
        )
    }



    renderJobCards = () => {
        const { jobsData } = this.state
        console.log(jobsData.length)
        return (

            <ul className='all-jobs-container'>
                {jobsData.map(each => <Alljobs key={each.id} data={each} />)}

            </ul>
        )
    }



    renderJobs = () => {
        const { isjoblistShown } = this.state

        switch (isjoblistShown) {
            case apiStatusChange.inprogress:
                return this.renderLoader()

            case apiStatusChange.failed:
                return this.renderFailedJobs()

            case apiStatusChange.success:
                return this.renderJobCards()

            case apiStatusChange.nojobs:
                return this.renderNoJobs()


            default:
                return null;
        }
    }

    render() {
        const { jobSearchinput } = this.state
        console.log(jobSearchinput)

        return (
            <div className='jobs-main-container'>
                <Header />
                <div className='jobs-container'>
                    <div className='filter-and-profile-container'>
                        {this.renderJobSearchinput()}
                        <Profile />
                        <div className='all-jobs-container'>
                            <Filtergroup
                                employmentTypesList={employmentTypesList}
                                salaryRangesList={salaryRangesList}
                                changeEmployment={this.changeEmployment}
                                changeSalaryRange={this.changeSalaryRange}

                            />
                        </div>

                    </div>
                    <div className='filtered-job-container'>
                        {this.renderDesktopSearchinput()}
                        <div className='job-cards-container'>
                            {this.renderJobs()}

                        </div>



                    </div>
                </div>




            </div>

        )

    }
}

