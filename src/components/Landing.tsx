import back from '../assets/back.jpg';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
        <div className="flex flex-col items-center mb-8">
          <img
            src={back}
            alt="back"
            className="w-48 h-auto mb-6 rounded shadow-md"
          />
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Mairie de Mbouda
          </h1>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Region:</p>
                <p className="text-gray-800">L'ouest</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Department:</p>
                <p className="text-gray-800">Bamboutos</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Superficie</p>
                <p className="text-gray-800">437km²</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Address:</p>
                <p className="text-gray-800">Mairie de Mbouda</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Phone:</p>
                <p className="text-gray-800">+237 677 72 08 62</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Email:</p>
                <p className="text-gray-800">communembouda@yahoo</p>
              </div>
            </div>
          </div>
          {/* Login Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Se Connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;