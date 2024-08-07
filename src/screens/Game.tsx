import GameContextProvider from '../context/game/GameContextProvider';
import Game from '../game';

const GameScreen = () => {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
};

export default GameScreen;
