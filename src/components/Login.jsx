import React, { useState } from 'react';
import './LoginPage.css';
import { registerUser, loginUser } from '../service/Firebase'; // Importer les fonctions nécessaires
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [hovered, setHovered] = useState(false);

  // États pour gérer les entrées utilisateur
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numero, setNumero] = useState('');
  const [role, setRole] = useState('user'); 
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialiser le hook navigate

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setHovered(false);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        // Appeler la fonction loginUser pour vérifier les identifiants
        const user = await loginUser(email, password);
        if (user) {
          // Vérifier le rôle de l'utilisateur
          if (user.role === 'user') {
            navigate('/user'); // Utiliser navigate pour rediriger vers la page utilisateur
          } else if (user.role === 'admin') {
            navigate('/admin'); // Utiliser navigate pour rediriger vers la page admin
          } else {
            setErrorMessage('Le rôle de l\'utilisateur est inconnu.');
          }
        }
      } catch (error) {
        // Afficher un message d'erreur en fonction du problème
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('Email incorrect.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Mot de passe incorrect.');
        } else {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
        }
      }
    } else {
      try {
        await registerUser(firstName, lastName, email, password, numero, role);
        setIsLogin(true);
      } catch (error) {
        setErrorMessage('Erreur lors de l\'inscription.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        {!isLogin && (
          <>
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Numero</label>
              <input
                type="text"
                placeholder="Numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p
          className={`toggle-link ${hovered ? 'hovered' : ''}`}
          onClick={toggleMode}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
