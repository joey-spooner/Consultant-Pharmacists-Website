import { Redirect, Route, Router, Switch } from 'wouter';
import SitePage from './site/SitePage';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/"><SitePage /></Route>
        {(['webinars', 'contact', 'cv', 'join', 'terms'] as const).flatMap(page =>
          [`/${page}`, `/${page}/`].map(path => (
            <Route key={path} path={path}><SitePage page={page} /></Route>
          )),
        )}
        {['', 'webinars', 'contact', 'cv', 'terms'].flatMap(page =>
          [`/option-c${page ? `/${page}` : ''}`, `/option-c/${page ? `${page}/` : ''}`].map(path => (
            <Route key={path} path={path}><Redirect to={page ? `/${page}/` : '/'} replace /></Route>
          )),
        )}
        <Route><Redirect to="/" replace /></Route>
      </Switch>
    </Router>
  );
}
