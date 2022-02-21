import React, {useEffect} from 'react'
import success from '../../assets/success-alert.svg'
import error from '../../assets/danger-alert.svg'
import close from '../../assets/close.svg'

const DisplayToast = ({ showNotification, notificationType, notificationMessage, setNotificationProps}) => {

useEffect(()=>{
    if(showNotification){
        setTimeout(()=>setNotificationProps({notificationType:notificationType ,notificationMessage: notificationMessage, showNotification: false }),4000)
    }
    //eslint-disable-next-line
},[showNotification])

    return ( 
        
        <div className={showNotification ? 'notification' : 'notification inactive'}>
            <img src={notificationType === 'error' ? error : success } alt="notification-icon" className="notification-icon" />
            <div>
                <p className='notification-title'>{notificationType === 'error' ? 'Request Failed' : 'Success'}</p>
                <p className='notification-description'> {notificationMessage} </p>
            </div>
            <img src={close} alt="close" className="notification-close"/>
        </div>
     );
}
 
export default DisplayToast;