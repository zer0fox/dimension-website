import React, { Component } from 'react';
import Content from '../components/Content';

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <Content
                    title="404"
                    text="Page not found."
                />
            </div>
        );
    }
}

export default PageNotFound;
