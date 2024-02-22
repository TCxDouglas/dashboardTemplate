import { LoginView } from '@/views/login/LoginView';

const LoginPage = () => {
  return (
    <>
      <LoginView />
    </>
  );
};

LoginPage.getLayout = (page: React.ReactNode) => {
  return <div>{page}</div>;
};

export default LoginPage;
