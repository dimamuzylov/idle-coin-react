import Game from './game';
import { useGameStore } from './game/store/game';

const App = () => {
  const gameStore = useGameStore();

  return (
    <div className='flex flex-col'>
      <Game />
      <div className='flex flex-col'>
        <button onClick={() => gameStore.start()}>Start</button>
        <button onClick={() => gameStore.finish()}>Stop</button>
        <button
          onClick={() => {
            if (!gameStore.playing) return;
            gameStore.paused ? gameStore.play() : gameStore.pause();
          }}
        >
          {gameStore.paused ? 'Play' : 'Pause'}
        </button>
        <button
          onClick={() => {
            gameStore.finish();
            setTimeout(() => {
              gameStore.start();
            });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
