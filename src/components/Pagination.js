

function Pagination(props){

    const {pages,currentPage,pagination}=props;

    return(
        <nav className="d-flex justify-content-center">
            <ul className="pagination">
                        {
                            pages.map((page)=>{
                                return <li className={
                                    page===currentPage ? "page-item active" : "page-item"
                                }
                                > 
                                <p className="page-link" onClick={()=>pagination(page)}>
                                    {page}
                                </p>

                                </li>
                            })
                        }                  
            </ul>
        </nav>
    )
}

export default Pagination;