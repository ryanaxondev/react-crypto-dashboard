import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Coin from '@/pages/Coin';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

import '@/lib/chart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coin />} />
          <Route path="/about" element={<About />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
