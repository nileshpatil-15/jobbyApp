/* eslint-disable prettier/prettier */
import { Component } from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import { AiOutlineStar } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import { BsBagFill, BiLinkExternal } from 'react-icons/bs'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Header from '../Header'
import Jobskills from '../Jobskills'
import './index.css'


const jobDetailsApiChange = {
    success: 'SUCCESS',
    failed: 'FAILED',
    inprogress: 'INPROGRESS',
    initial: 'INITIAL'
}


export default class Jobdetails extends Component {

    state = {
        isLoaderShown: jobDetailsApiChange.initial,
        jobsDetails: {},
        similarJobsDetails: {}
    }

    componentDidMount() {
        this.getJobDetails()
    }

    getJobDetails = async () => {

        this.setState({ isLoaderShown: jobDetailsApiChange.inprogress })
        const { match } = this.props
        const { params } = match
        const { id } = params
        const url = `https://apis.ccbp.in/jobs/${id}`
        const jwtToken = Cookie.get('jwt_token')

        const options = {

            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method: 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            const jobsInfo = data.job_details
            const jobsDetails = ({
                title: jobsInfo.title,
                companyLogoUrl: jobsInfo.company_logo_url,

                companyWebsiteUrl: jobsInfo.company_website_url,
                employmentType: jobsInfo.employment_type,
                id: jobsInfo.id,
                jobDescription: jobsInfo.job_description,
                skills: jobsInfo.skills.map(each => ({
                    imageUrl: each.image_url,
                    name: each.name
                })),
                lifeAtCompany: ({
                    description: jobsInfo.life_at_company.description,
                    imageUrl: jobsInfo.life_at_company.image_url
                }),
                location: jobsInfo.location,
                packagePerAnnum: jobsInfo.package_per_annum,
                rating: jobsInfo.rating


            })
            const similarjobsInfo = data.similar_jobs
            const similarJobs = similarjobsInfo.map(each => ({
                companyLogoUrl: each.company_logo_url,
                employmentType: each.employment_type,
                id: each.id,
                jobDescription: each.job_description,
                location: each.location,
                rating: each.rating,
                title: each.title

            }))


            this.setState({ jobsDetails, similarJobsDetails: similarJobs, isLoaderShown: jobDetailsApiChange.success })

        }
        else {
            this.setState({ isLoaderShown: jobDetailsApiChange.failed })
        }



    }


    renderJobDetails = () => {
        const { jobsDetails, similarJobsDetails } = this.state
        const { companyLogoUrl, title, skills, companyWebsiteUrl, lifeAtCompany,rating, jobDescription, location, packagePerAnnum, employmentType } = jobsDetails

        return (
            <div className='job-details-card-container' >
                <div className='card-logo-and-title-container flex-container'>
                    <img src={companyLogoUrl} className='company-logo' alt='company logo' />
                    <div className='name-and-rating-cntr'>
                        <p className='job-title'>{title}</p>
                        <div className='flex-container' ><AiOutlineStar className='star-icon' />
                            <p className='rating'>{rating}</p>
                        </div>
                    </div>
                </div>
                <div className='location-and-package-cntr flex-container'>
                    <div className='location-cntr flex-container'>
                        <HiLocationMarker className='location-icon' />
                        <p className='location'>{location}</p>

                    </div>
                    <div className='employment-type-cntr flex-container'>
                        <BsBagFill className='employment-type-icon' />
                        <p className='employment-type'>{employmentType}</p>

                    </div>
                    <p className='package'>{packagePerAnnum}</p>
                </div>
                <hr className='hr-line' />
                <div className='jobdetails-description-container'>
                    <div className='description-and-link-container'>
                        <p className='description-title'>description</p>
                        <a className='anchor-container' href={companyWebsiteUrl}>
                            <p className='visit-text'>Visit</p>
                            <FaExternalLinkAlt />
                        </a>

                    </div>
                    <p className='description'>{jobDescription}</p>
                </div>
              <Jobskills  skills={skills} />
              <div>
              <p className='life-at-company'>Life at Company</p>
              <div className='life-at-company-container'>
              <p className='life-at-comapny-description'>{lifeAtCompany.description}</p>
             <img alt='life at company ' src={lifeAtCompany.imageUrl} className='life-at-company-img' />
              </div>
             </div>

            </div>)

    }

    renderFailedToShowJobdetails = () => (
        <div className='failed-job-container'>
            <img alt='failure job' className='job-failed-img' src='https://assets.ccbp.in/frontend/react-js/failure-img.png' />
            <h1 className='job-failed-title'>Oops! Something Went Wrong</h1>
            <p className='job-failed-description'>
                we cannot seem to find tha page you are looking
</p>
            <button className='retry-btn' type="button" onClick={this.getJobDetails} >
                Retry
    </button>

        </div>
    )

    renderLoading = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
    )

    renderJobsDetails = () => {
        const { isLoaderShown } = this.state

        switch (isLoaderShown) {
            case jobDetailsApiChange.inprogress:
                return this.renderLoading()
            case jobDetailsApiChange.success:
                return this.renderJobDetails()
            case jobDetailsApiChange.failed:
                return this.renderFailedToShowJobdetails()
            default:
                return null;
        }

    }

    render() {
        const { similarJobsDetails, jobsDetails } = this.state

        // console.log(similarJobsDetails, jobsDetails)
        return (
            <div className='entire-container'>
                <Header />
                <div className='job-details-container'>
                    {this.renderJobsDetails()}

                </div>

            </div>
        )
    }
} 