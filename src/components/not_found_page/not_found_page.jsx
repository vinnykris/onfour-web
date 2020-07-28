import "../not_found_page/not_found_page_style.scss";
import history from "../../history";
var React = require('react');


const NotFoundPage= () => {

    const goHome = () => {
        history.push("/");
    };

    return (
    <div className="not-found-page"  >
        <div className="not-found-page-container">
            <img src="https://onfour-media.s3.amazonaws.com/website+component/404image.png" className='not-found-page-img404' />
            <div className='not-found-page-text'>
                <h1 className='not-found-page-oops-heading'>
                    OOPS! Page not found
                </h1>
                <h3 className='not-found-page-oops-error-text'>
                    The Page you are trying to reach does not exist. It's probably our fault but just in case, please check that the URL you entered is correct
                </h3>
                <div className="not-found-page-button-wrapper">
                    <button className="not-found-page-go-back-button" onClick={goHome}>Go Home</button>
                </div>
                {/* <a href="/" className="go-back-button">Go Back</a> */}
            </div>
        </div>
    </div>
    );
};
export default NotFoundPage;
