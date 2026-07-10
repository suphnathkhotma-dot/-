import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import Home from './pages/home';
import Play from './pages/play';
import About from './pages/about';
import HowToPlay from './pages/how-to-play';
import NotFound from '@/pages/not-found';
import { SettingsProvider } from './hooks/use-settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/play" component={Play} />
      <Route path="/about" component={About} />
      <Route path="/how-to-play" component={HowToPlay} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
