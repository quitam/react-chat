import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './components/GlobalStyles';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </ChatContextProvider>
    </AuthContextProvider>,
);
