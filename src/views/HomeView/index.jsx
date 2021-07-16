import SideBar from "../SideBar";
import Header from "../HeaderView";
import ContentCard from "./ContentCard";
import contentData from "../../store/contentData";

const HomeView = () => {
    return ( 
        <div className="main">
            <SideBar />
            <section className='home'>
                <Header />
                {
                    contentData.map(data =>(
                        <ContentCard 
                            key={data.id}
                            votes={data.votes}
                            title={data.title}
                            description={data.description}
                            comments={data.comments}
                            tag={data.tag}/>
                    ))
                }
            </section>
        </div>
     );
}
 
export default HomeView;