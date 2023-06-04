/* eslint-disable prettier/prettier */
import { AiOutlineStar } from 'react-icons/ai'

import './index.css'

const Alljobs = (props) => {
    const { data } = props
    const { companyLogoUrl, employmentType, id, jobDescription, location, packagePerAnnum, rating, title } = data

    const renderJobcard = () => (
        <div className='job-card'>
            <div className='card-logo-and-title-container'>
                <img src={companyLogoUrl} className='company-logo' alt='company logo' />
                <div className='name-and-rating-cntr'>
                    <p>{title}</p>
                    <div><AiOutlineStar className='star-icon'/>{rating}</div>
</div>


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