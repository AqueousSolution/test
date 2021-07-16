const ContentCard = ({votes,title,description,tag,comments}) => {
    return ( 
        <div className='content'>
            <div className="content-votes">
                <p>{votes}</p>
            </div>
            <div className="content-info">
                <p className="content-info__title">{title}</p>
                <p className="content-info__description">{description}</p>
                <p className="content-info__tag">{tag}</p>
            </div>
            <div className="content-comment">
                <p className="content-comment__number">{comments}</p>
            </div>
        </div>
     );
}
 
export default ContentCard;