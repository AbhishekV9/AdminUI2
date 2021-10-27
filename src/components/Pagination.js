

function Pagination(props){

    const {pages,currentPage,pagination}=props;

    return(
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
    )
}

export default Pagination;