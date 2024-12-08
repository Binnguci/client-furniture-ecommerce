import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserProvider} from "./context/user.context.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
        <UserProvider>
            <App/>
        </UserProvider>
        </Provider>,
    </StrictMode>
    ,
)
