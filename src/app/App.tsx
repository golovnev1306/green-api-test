import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './screen/main/Main';
import { WithAuth } from './features/with-auth/WithAuth';
import { Chat } from './screen/chat/Chat';

export const App = () => {
  return (
    <BrowserRouter>
      <WithAuth>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/:chatPhone'} element={<Chat />} />
        </Routes>
      </WithAuth>
    </BrowserRouter>
  );
};
