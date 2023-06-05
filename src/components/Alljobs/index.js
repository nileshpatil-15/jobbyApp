/* eslint-disable prettier/prettier */
import { AiOutlineStar } from 'react-icons/ai'
import { HiLocationMarker } from 'react-icons/hi'
import {BsBagFill} from 'react-icons/bs'

import './index.css'

const Alljobs = (props) => {
    const { data } = props
    const { companyLogoUrl, employmentType, id, jobDescription, location, packagePerAnnum, rating, title } = data

    const renderJobcard = () => (
        <div className='job-card'>
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
<HiLocationMarker className='location-icon'            />
<p className='location'>{location}</p>
                
            </div>
<div className='employment-type-cntr flex-container'>
<BsBagFill className='employment-type-icon'/>
<p className='employment-type'>{employmentType}</p>

</div>
<p className='package'>{packagePerAnnum}</p>
            </div>
            <hr className='hr-line'/>
            <div className='description-container'>
            <p className='description-title'>Description</p>
            <p className='description'>{jobDescription}</p>

            </div>
        </div>


    )


    return (

        <li>
            {renderJobcard()}


        </li>

    )

}

export default Alljobs