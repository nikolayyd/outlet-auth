import { useState } from 'react';
import '../styles/Form.css';
export interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const Form = () => {
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('>>>submitted!');
  };

  return (
    <div>
      <div className="container-form">
        <form className="form-auth" onSubmit={handleSubmit}>
          <h1 className='auth-title'>Form component</h1>
          <input
            name="first-name"
            value={firstName}
            className="input-form"
            placeholder="Enter first name.."
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            name="last-name"
            value={lastName}
            className="input-form"
            placeholder="Enter last name.."
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            name="email"
            value={email}
            className="input-form"
            placeholder="Enter email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="input-form"
            placeholder="Enter password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            value={confirmPassword}
            className="input-form"
            placeholder="Confirm password.."
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};
