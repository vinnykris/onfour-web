



var React = require('react');

const NotFoundPage=({location})=>(
    <div>
        <h1>
404 not found<code>{location.pathname}</code>
        </h1>
    </div>
)
export default NotFoundPage;
