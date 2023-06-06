/* eslint-disable prettier/prettier */

import { AiOutlineStar } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import { BsBagFill } from 'react-icons/bs'

import './index.css'

const Similarjobs = (props) => {
    const { similarJobDetail } = props
    const { title, companyLogoUrl, rating, jobDescription, location, employmentType } = similarJobDetail
    console.log(title)

    return (
        <>
        
            <li className='similar-job-card'>
                <div className='card-logo-and-title-container flex-container'>
                    <img src={companyLogoUrl} className='company-logo' alt='similar job company logo' />
                    <div className='name-and-rating-cntr'>
                        <h1 className='job-title'>{title}</h1>
                        <div className='flex-container' ><AiOutlineStar className='star-icon' />
                            <p className='rating'>{rating}</p>
                        </div>
                    </div>
                </div>
                <div className='jobdetails-description-container'>
                    <div className='description-and-link-container'>
                        <h1 className='description-title'>description</h1>

                    </div>
                    <h1 className='description'>{jobDescription}</h1>
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

                </div>

            </li>
          
        </>
    )
}
export default Similarjobs