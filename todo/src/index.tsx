import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorkerRegistration.unregister();

