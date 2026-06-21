import { useState } from 'react';
import './Register.css';

interface RegisterProps {
  onSwitch: () => void;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

function Register({ onSwitch }: RegisterProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // TODO: Call registration API
      console.log('Register submitted:', formData);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <div className="register-logo">
            <span className="logo-icon">🍽️</span>
          </div>
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join us and manage your restaurant</p>
        </div>

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                autoFocus
              />
            </div>
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@restaurant.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔐</span>
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {/* Terms Checkbox */}
          <div className={`terms-group ${errors.agreeTerms ? 'has-error' : ''}`}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span>
                I agree to the{' '}
                <a href="/terms" className="terms-link">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="terms-link">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="register-divider">
          <span>or sign up with</span>
        </div>

        {/* Social Register */}
        <div className="social-register">
          <button type="button" className="social-button google">
            <span className="social-icon">G</span>
            Google
          </button>
        </div>

        {/* Sign In Link */}
        <p className="signin-text">
          Already have an account?{' '}
          <button type="button" className="link-button" onClick={onSwitch}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
