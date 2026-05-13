import React, { useState } from 'react';
import { login } from '../authService';
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

// --- Componente de Login ---

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            navigate({ to: '/' });
        } catch (error) {
            alert('Credenciales incorrectas');
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
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-light text-blue-600 mb-2">AsoWheel</h1>
                    <p className="text-gray-500 font-light text-sm">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Campo Email */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-xl">mail</span>
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full bg-white/80 border border-gray-300 rounded-full py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all"
                        />
                    </div>

                    <div className="flex justify-end px-2">
                        <a href="#" className="text-xs text-blue-600 hover:underline font-medium transition-colors">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Botón de Enviar (mismo estilo que "Girar Ruleta") */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-4 px-6 py-3.5 bg-white/80 backdrop-blur-sm border border-orange-500/50 rounded-full text-orange-600 font-bold text-lg shadow-lg flex justify-center items-center gap-2 transition-all duration-300
              ${isLoading ? 'opacity-70 cursor-wait' : 'hover:bg-white hover:scale-[1.02] active:scale-95'}`}
                    >
                        {isLoading ? (
                            <span className="material-symbols-outlined animate-spin">autorenew</span>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 font-light">
                        ¿No tienes cuenta? <a href="/register" className="text-blue-600 font-medium hover:underline">Registrarse</a>
                    </p>
                </div>
            </div>
        </div>
    );
}