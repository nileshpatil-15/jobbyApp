/* eslint-disable prettier/prettier */
import { BsSearch } from 'react-icons/bs'


const Alljobs=(props)=>{
const {jobSearchinput}=props

const renderSearchInput=()=>(
     <div className='jobsearch-input-container'>
            <input
                className='jobsearch-input'
                type='search'
                placeholder='Search'
                // onChange={this.onChangejobSearch}
            />
            {/* <BiSearchAlt2 className='job-search-icon' /> */}
            <button className='job-search-btn' type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
            </button>
        </div>
)


return(
    <div>
{renderSearchInput()}

    </div>

)

}

export default Alljobs