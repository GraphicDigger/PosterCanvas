import { AppRouter } from './app/router';
import { Providers } from './app/providers';

const App = () => {
  return (
    <AppRouter />
  );
};

export default Providers(App);

