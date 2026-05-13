import React, { useState } from 'react';
import { register } from '../authService';
import { useNavigate } from '@tanstack/react-router';
// --- Componentes de Estilo y Layout (Reutilizados del App.jsx) ---

const FestiveBackground = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: 'linear-gradient(45deg, #FFBB80, #FF952B, #8CF5FF, #1C7EFF, #FFAC75, #FF852B)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
    }}
  />
);

const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes modalPop {
      0% { transform: scale(0.85); opacity: 0; }
      60% { transform: scale(1.03); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
  `}</style>
);

const Header = () => (
  <header className="absolute top-0 left-0 p-4 z-20">
    <div className="flex items-center gap-2 sm:scale-40 md:scale-70 lg:scale-80">
      <img src="https://asohp.cr/public/images/asohp-logo-nav.png" alt="AsoHp" />
    </div>
  </header>
);

// --- Componente de Registro ---

export default function Register() {
  // Estados para el formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estados para la lógica de la interfaz
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Manejador del envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden. Inténtalo de nuevo.');
    return;
  }

  if (password.length < 6) {
    setError('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  setIsLoading(true);
  try {
    await register(username, password);
    setIsSuccess(true);
  } catch (error) {
    setError('Error al registrar. El correo ya existe o hubo un problema.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen relative" style={{ fontFamily: 'var(--app-font)' }}>
      <GlobalStyles />
      <FestiveBackground />
      <Header />

      {/* Contenedor principal tipo tarjeta (Glassmorphism) */}
      <div 
        className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50 w-[90%] max-w-[420px] z-10 relative"
        style={{ animation: 'modalPop 600ms cubic-bezier(.2,.8,.2,1)' }}
      >
        {isSuccess ? (
          // --- Pantalla de Éxito ---
          <div className="text-center py-6" style={{ animation: 'modalPop 400ms ease-out' }}>
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_6px_18px_rgba(6,95,70,0.15)]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Registro Exitoso!</h2>
            <p className="text-gray-600 mb-8 font-light">Tu cuenta ha sido creada correctamente.</p>
            <a href="/login" className="w-full px-6 py-3.5 bg-white/80 backdrop-blur-sm border border-orange-500/50 rounded-full text-orange-600 font-bold text-lg shadow-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-300">

              Ir a Iniciar Sesión
            </a>

          </div>
        ) : (
          // --- Formulario de Registro ---
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light text-blue-600 mb-2">Crear Cuenta</h1>
              <p className="text-gray-500 font-light text-sm">Regístrate para gestionar AsoWheel</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Campo Usuario */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 text-xl">person</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(''); // Limpia el error al escribir
                  }}
                  disabled={isLoading}
                  className="w-full bg-white/80 border border-gray-300 rounded-full py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Campo Contraseña */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 text-xl">lock</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  disabled={isLoading}
                  className="w-full bg-white/80 border border-gray-300 rounded-full py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Campo Confirmar Contraseña */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 text-xl">password</span>
                </div>
                <input
                  type="password"
                  required
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  disabled={isLoading}
                  className="w-full bg-white/80 border border-gray-300 rounded-full py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all"
                />
              </div>

              {/* Mensaje de Error (alerta estilo sutil) */}
              {error && (
                <div className="bg-red-50/80 border border-red-200 text-red-600 text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2" style={{ animation: 'modalPop 300ms ease-out' }}>
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Botón de Enviar */}
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 px-6 py-3.5 bg-white/80 backdrop-blur-sm border border-orange-500/50 rounded-full text-orange-600 font-bold text-lg shadow-lg flex justify-center items-center gap-2 transition-all duration-300
                  ${isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-white hover:scale-[1.02] active:scale-95'}`}
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin">autorenew</span>
                ) : (
                  'Registrarse'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 font-light">
                ¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 font-medium hover:underline">Iniciar Sesión</a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}