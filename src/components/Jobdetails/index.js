/* eslint-disable prettier/prettier */
import { Component } from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
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
        jobsDetails:{}
    }

    componentDidMount() {
        this.getJobDetails()
    }

    getJobDetails = async () => {
        const { isLoaderShown } = this.state
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
if (response.ok===true){
    const jobsInfo=data.job_details
const jobsDetails=({
   companyLogoUrl:jobsInfo.company_logo_url, 

companyWebsiteUrl:jobsInfo.company_website_url,
employmentType:jobsInfo.employment_type,
id:jobsInfo.id,
jobDescription:jobsInfo.job_description   ,
skills:jobsInfo.skills.map(each=>({
    imageUrl:each.image_url,
    name:each.name
})),
lifeAtCompany:({
description:jobsInfo.life_at_company.description,
imageUrl:jobsInfo.life_at_company.image_url
}),
location:jobsInfo.location,
packagePerAnnum:jobsInfo.package_per_annum,
rating:jobsInfo.rating


})
const similarjobsInfo=data.similar_jobs
const similarjobsDetails= similarjobsInfo.map(each=>({
    companyLogoUrl:each.company_logo_url,
    employmentType:each.employment_type,
    id:each.id,
jobDescription:each.job_description,
location:each.location,
rating:each.rating,
title:each.title
    
}))



console.log(similarjobsDetails)
}


        console.log(data.job_details)

    }

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
            default:
                return null;
        }

    }

    render() {

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