import React from 'react';
import PropTypes from 'prop-types';
import IndexPage from './IndexPage';

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    handlerChangePage: PropTypes.func.isRequired,
    totalPage: PropTypes.number.isRequired,
    indexPage: PropTypes.arrayOf(PropTypes.number).isRequired,
    productsPerPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

function Pagination({ currentPage, handlerChangePage, totalPage, productsPerPage, total, indexPage }) {
    const onDownPage = () => {
        if (currentPage > 1) {
            const pageNumber= currentPage - 1
            handlerChangePage(pageNumber);
            console.log("a")
        }
    };
    
    const onUpPage = () => {
        if (currentPage < totalPage) {
            const pageNumber= currentPage + 1
            handlerChangePage(pageNumber);
            console.log("b")
        }
    };
    console.log("total",total)
    console.log("currentPage",currentPage)
    console.log(Math.min((currentPage - 1) * productsPerPage + 1),total)
    console.log("indexPage",indexPage)
    return (
        <nav aria-label="Page navigation example" className="pt-5">
            <ul className="pagination justify-content-center justify-content-lg-end">
                <li className="page-item">
                    <button className="page-link" 
                        onClick={onDownPage} 
                        disabled={currentPage <= 1 }>
                        <span>«</span>
                    </button>
                </li>
                <IndexPage indexPage={indexPage} currentPage={currentPage} totalPage={totalPage} handlerChangePage={handlerChangePage}  />
                <li className="page-item">
                    <button className="page-link" 
                        onClick={onUpPage} 
                        disabled={currentPage >= totalPage}>
                            <span>»</span>
                    </button>
                </li>
            </ul>
            <div className="pagination justify-content-center justify-content-lg-end">
            Showing {Math.min((currentPage - 1) * productsPerPage + 1, total)} - {Math.min(currentPage * productsPerPage, total)} of {total} results
            </div>
        </nav>
    );
}

export default Pagination;
