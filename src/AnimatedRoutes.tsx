import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PokemonDetails, PokemonsList } from './components';

const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route caseSensitive path="/poke-splash" element={<PokemonsList />} />
        <Route caseSensitive path="/poke-splash/:name" element={<PokemonDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
