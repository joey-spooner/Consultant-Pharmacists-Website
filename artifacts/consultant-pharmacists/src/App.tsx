import { Redirect, Route, Router, Switch } from 'wouter';
import OptionC from './option-c/OptionC';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/"><OptionC /></Route>
        <Route path="/option-c"><OptionC /></Route>
        <Route path="/option-c/"><OptionC /></Route>
        <Route path="/join"><OptionC page="join" /></Route>
        <Route path="/join/"><OptionC page="join" /></Route>
        <Route path="/option-c/contact"><OptionC page="contact" /></Route>
        <Route path="/option-c/contact/"><OptionC page="contact" /></Route>
        <Route path="/option-c/webinars"><OptionC page="webinars" /></Route>
        <Route path="/option-c/webinars/"><OptionC page="webinars" /></Route>
        <Route path="/cv"><OptionC page="cv" /></Route>
        <Route path="/cv/"><OptionC page="cv" /></Route>
        <Route path="/option-c/cv"><OptionC page="cv" /></Route>
        <Route path="/option-c/cv/"><OptionC page="cv" /></Route>
        <Route path="/contact"><Redirect to="/option-c/contact/" replace /></Route>
        <Route path="/contact/"><Redirect to="/option-c/contact/" replace /></Route>
        <Route><Redirect to="/" replace /></Route>
      </Switch>
    </Router>
  );
}
