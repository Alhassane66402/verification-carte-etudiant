
import StudentVerification from "./components/StudentVerification";

function App() {
  return (
    <div className="relative min-h-screen bg-gray-700 flex items-center justify-center">
      {/* Image de fond */}
      <div
        className="absolute inset-1 bg-center"
        style={{ backgroundImage: "url('/logo_MESRSI.png')" }}
      />
      
      {/* Overlay sombre semi-transparent */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Contenu au-dessus */}
      <div className="relative z-10 w-full max-w-md">
        <StudentVerification />
      </div>
    </div>
  );
}

export default App;
