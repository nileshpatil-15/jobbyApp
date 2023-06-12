/* eslint-disable prettier/prettier */
import './index.css'

const Filtergroup = (props) => {
    const { changeEmployment } = props

    const onChangeCheckbox = (event) => {

        const isChecked = event.target.checked
        const employmentType = event.target.name
        changeEmployment(isChecked, employmentType)

    }

    const onChangeSalary = (event) => {
        const { changeSalaryRange } = props
        const salaryRange = event.target.value
        changeSalaryRange(salaryRange)
        console.log(salaryRange)
    }


    const renderEmploymentFilter = () => {
        const { employmentTypesList } = props


        return (
            <ul className='filter-container'>
                <hr className='hr-line' />
                <h1 className='filter-title'>Type of Employment</h1>
                {employmentTypesList.map(each =>


                    <li key={each.employmentTypeId}>
                        <input
                            type='checkbox'
                            id={each.employmentTypeId}
                            onChange={onChangeCheckbox}
                            name={each.employmentTypeId}
                            className='checked-options'
                        />
                        <label className='filter-label' htmlFor={each.employmentTypeId}>{each.label}</label>
                    </li>

                )}
            </ul>

        )
    }

    const renderSalaryRangeFilter = () => {
        const { salaryRangesList } = props
        return (
            <ul className='filter-container'>
                <hr className='hr-line' />
                <h1 className='filter-title'>Salary Range</h1>
                {
                    salaryRangesList.map(eachRange => <li key={eachRange.salaryRangeId}>
                        <input
                            type='radio'
                            name='salary'
                            value={eachRange.salaryRangeId}
                            onChange={onChangeSalary}
                            className='checked-options'
                            id={eachRange.salaryRangeId}
                        />

                        <label htmlFor={eachRange.salaryRangeId} className='filter-label'>{eachRange.label}</label>

                    </li>)
                }

            </ul>
        )

    }

    return (
        <div className='filters-container'>
            {renderEmploymentFilter()}
            {renderSalaryRangeFilter()}
        </div>
    )

}
export default Filtergroup
