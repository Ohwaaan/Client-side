import Header from './Header';
import HomePageView from '../views/HomePageView';

// Render Home page view by the corresponding View component
const HomePageContainer = () => {
  return (
    <div>
      <Header />
      <HomePageView />
    </div>
    
  );
};

export default HomePageContainer;