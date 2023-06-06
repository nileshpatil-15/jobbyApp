/* eslint-disable prettier/prettier */
import './index.css'


const Jobskills=(props)=>{
const{skills}=props


return(
    <>
<h1 className='skills-title'>Skills</h1>
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