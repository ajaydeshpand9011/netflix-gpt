/* Component */
import Body from "./components/Body";

/* Redux */
import { Provider } from "react-redux";
import appStore from './utils/appStore';

export default function App() {
  return (
    <Provider store={appStore}>
      <Body/>
    </Provider>
  )
}