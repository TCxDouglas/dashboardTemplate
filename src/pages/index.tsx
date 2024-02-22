import { LoginView } from '@/views/login/LoginView';

const HomePage = () => {
  return <LoginView />;
};

HomePage.getLayout = (page: React.ReactNode) => {
  return <div>{page}</div>;
};

export default HomePage;
