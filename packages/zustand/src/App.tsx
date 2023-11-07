import { useBearStore } from '@/store/bear';
function App() {
  const bears = useBearStore.use.bears();
  const { increase, reset } = useBearStore.use.actions();

  return (
    <>
      <h1>Vite + React</h1>
      <div>bears: {bears}</div>
      <div style={{ display: 'flex', gap: '6px', marginTop: 16 }}>
        <button onClick={() => increase()}>+</button>
        <button onClick={() => reset()}>reset</button>
      </div>
    </>
  );
}

export default App;
