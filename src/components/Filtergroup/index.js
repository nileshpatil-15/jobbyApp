/* eslint-disable prettier/prettier */

import './index.css'

const Filtergroup = (props) => {
    const { employmentTypesList, salaryRangesList,changeEmployment } = props




    const renderEmploymentFilter = () => {

const onChangeCheckbox=(event)=>{

    const isChecked=event.target.checked
    const employmentType=event.target.name
   changeEmployment(isChecked,employmentType)
  
}

   
       
        return employmentTypesList.map(each=>
        
        <li key={each.employmentTypeId}>
            <input
                type='checkbox'
                id={each.employmentTypeId}
                onChange={onChangeCheckbox}
                name={each.employmentTypeId}
            />
            <label  htmlFor={each.employmentTypeId}>{each.label}</label>
        </li>
        )

        
    
    }
       
    
          

        





    

    return (
        <div className='filters-container'>
            {renderEmploymentFilter()}
        </div>
    )

}
export default Filtergroup
