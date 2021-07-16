import {useState} from 'react'

const SideBar = () => {

    const [selectedFilter, setSelectedFilter] = useState({
        all: true,
        ui: false,
        ux: false,
        bug: false,
        enhancement: false,
        feature: false
    })

    const filterContent = (e) =>{
        const stateCopy = {...selectedFilter};
        const changedValue = true
        Object.keys(stateCopy).forEach(key => stateCopy[key] = false)
        stateCopy[e.target.value] = changedValue
        setSelectedFilter(stateCopy)
    }

    return ( 
        <nav className='sidebar'>
            <div className="sidebar-top">
                <h3>Front End Mentor</h3>
                <p>Feedback Board</p>
            </div>
            <div className="sidebar-middle">
               <div className="sidebar-middle__tags">
                    <button className={selectedFilter.all ? 'sidebar-middle__tag active' : 'sidebar-middle__tag'} onClick={filterContent} value='all'>All</button>
                    <button className={selectedFilter.ui ? 'sidebar-middle__tag active' : 'sidebar-middle__tag'} onClick={filterContent} value='ui'>UI</button>
                    <button className={selectedFilter.ux ? 'sidebar-middle__tag active' : 'sidebar-middle__tag'} onClick={filterContent} value='ux'>UX</button>
                    <button className={selectedFilter.enhancement ? 'sidebar-middle__tag active' : 'sidebar-middle__tag'} onClick={filterContent} value='enhancement'>Enhancement</button>
                    <button className={selectedFilter.bug ? 'sidebar-middle__tag active' : 'sidebar-middle__tag'} onClick={filterContent} value='bug'>Bug</button>
                    <button className={selectedFilter.feature ? 'sidebar-middle__tag active' : 'sidebar-middle__tag'} onClick={filterContent} value='feature'>Future</button>
              
               </div>
            </div>
            <div className="sidebar-bottom">
                <div className="sidebar-bottom__header">
                    <h3>Roadmap</h3>
                    <a href='#'>View</a>
                </div>
                <div className="sidebar-bottom__item">
                    <p>Planned</p>
                    <p><span className='indicator teal'></span>2</p>
                </div>
                <div className="sidebar-bottom__item">
                    <p>In Progress</p>
                    <p><span className='indicator purple'></span>3</p>
                </div>
                <div className="sidebar-bottom__item">
                    <p>Live</p>
                    <p><span className='indicator blue'></span>1</p>
                </div>
            </div>
        </nav>
     );
}
 
export default SideBar;