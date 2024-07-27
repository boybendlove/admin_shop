import React from 'react';
import PropTypes from 'prop-types';

IndexPage.propTypes = {
    indexPage: PropTypes.arrayOf(PropTypes.number).isRequired,
    handlerChangePage: PropTypes.func.isRequired,
    pagination: PropTypes.object,
};

function IndexPage({ indexPage, handlerChangePage, pagination,currentPage }) {
    console.log("page",currentPage)
    // if (!pagination || !pagination.currentPage) {
    //     return null;
    // }

    const  page  = currentPage;

    console.log("page",page)
    console.log("indexPage",indexPage)
    const onIndexPage = (value) => {
        console.log(value)
        handlerChangePage(value);
    };

    return (
        <ul className="pagination">
            {indexPage.map(value => (
                <li className={value === page ? 'page-item active' : 'page-item'} key={value}>
                    <button className="page-link" onClick={() => onIndexPage(value)}>{value}</button>
                </li>
            ))}
        </ul>
    );
}

export default IndexPage;
