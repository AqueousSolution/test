import React from 'react'

const SideBar = () => {


/*     const filterContent = (e) =>{
        const stateCopy = {...selectedFilter};
        const changedValue = true
        Object.keys(stateCopy).forEach(key => stateCopy[key] = false)
        stateCopy[e.target.value] = changedValue
        setSelectedFilter(stateCopy)
    } */

    return ( 
        <nav className='sidebar'>
            <div className="sidebar-top">
                <h3>Equals Contact List</h3>
                <p>List of all contacts</p>
            </div>
            <div className="sidebar-middle">
               <div className="sidebar-middle__tags">
                   
               </div>
            </div>

        </nav>
     );
}
 
export default SideBar;