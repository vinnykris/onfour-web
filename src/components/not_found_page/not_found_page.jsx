
import { Link } from 'react-router-dom';
import "../not_found_page/not_found_page_style.scss";
import image404 from '../../images/icons/404_icon.png';
var React = require('react');


const NotFoundPage=({location})=>(
    <div className="head"  >
        <img src={image404} className='img404' />
        <div className='text'>
        <h1 className='oops-heading'>
            OOPS! Page not found
        </h1>
        <h3 className='error-text'>
            The Page you are trying to reach does not exist 
            <br/>It's probably our fault but just in case, please check 
            <br/>that the URL you entered is correct
        </h3>
        <a href="/" className="go-back-button">Go Back</a>

        </div>
        
        
        

    </div>
)
export default NotFoundPage;
