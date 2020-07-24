



var React = require('react');

const NotFoundPage=({location})=>(
    <div  >
        <br/><br/><br/><br/>
        <h1 className='page-not-found-pad'>
            404 not found<code>{location.pathname}</code>
        </h1>
        <br/><br/><br/><br/>
    </div>
)
export default NotFoundPage;
