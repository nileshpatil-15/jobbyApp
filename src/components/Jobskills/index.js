/* eslint-disable prettier/prettier */
import './index.css'


const Jobskills=(props)=>{
const{skills}=props


return(
    <>
<p className='skills-title'>Skills</p>
<ul className='skills-container'>
{
    skills.map(eachSkills=>(
        <li className='skill-item' key={eachSkills.name}>
        <img className='skill-logo' src={eachSkills.imageUrl} alt={eachSkills.name}/>
        <p>{eachSkills.name}</p>
 
        </li>
    ))
}
</ul>
</>

)
}
export default Jobskills