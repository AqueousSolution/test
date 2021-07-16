const Header = () => {
    return ( 
        <header className="header">
                <div className="header-left">
                   <p> 6 Suggestions </p>
                   <p>Sort by :</p>
                   <select>
                       <option>Most Upvotes</option>
                       <option>Lowest Upvotes</option>
                   </select>
                </div>
                <div className="header-right">
                    <button>+ Add feedback</button>
                </div>
        </header>
     );
}
 
export default Header;