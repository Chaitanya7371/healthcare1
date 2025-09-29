import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

type LoginStep = "login" | "forgot-password" | "verify-code" | "reset-password";

export default function Index() {
  const [step, setStep] = useState<LoginStep>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

  const WomanSilhouette = () => (
    <div className="absolute left-10 top-24 w-64 h-96">
      <svg viewBox="0 0 200 300" className="w-full h-full">
        <path
          d="M100 50 C120 50, 130 70, 130 90 C130 110, 120 130, 110 140 C105 145, 100 150, 95 155 L95 200 C95 210, 105 220, 115 230 C125 240, 130 250, 125 260 L120 270 C115 280, 110 290, 105 300 L95 300 C90 290, 85 280, 80 270 L75 260 C70 250, 75 240, 85 230 C95 220, 105 210, 105 200 L105 155 C100 150, 95 145, 90 140 C80 130, 70 110, 70 90 C70 70, 80 50, 100 50 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          className="opacity-60"
        />
        {/* Hair flowing */}
        <path
          d="M100 50 C90 45, 85 55, 90 65 C95 75, 100 85, 105 95"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          className="opacity-40"
        />
        <path
          d="M110 55 C115 50, 120 60, 115 70 C110 80, 105 90, 100 100"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          className="opacity-40"
        />
      </svg>
    </div>
  );

  const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    showPasswordToggle = false,
    onTogglePassword,
    isPassword = false
  }: {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    showPasswordToggle?: boolean;
    onTogglePassword?: () => void;
    isPassword?: boolean;
  }) => (
    <div className="relative w-full">
      <div className="relative">
        <input
          type={showPasswordToggle && !showPassword ? "password" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-input"
          placeholder=""
        />
        <label className="form-label">{label}</label>
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_160_3614)">
                <path d="M3 3L21 21" stroke="#505A66" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5845 10.5869C10.2092 10.9619 9.99823 11.4707 9.99805 12.0012C9.99786 12.5317 10.2084 13.0406 10.5835 13.4159C10.9585 13.7912 11.4672 14.0021 11.9977 14.0023C12.5283 14.0025 13.0372 13.7919 13.4125 13.4169" stroke="#505A66" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C16 5 19.333 7.333 22 12C21.222 13.361 20.388 14.524 19.497 15.488M17.357 17.349C15.726 18.449 13.942 19 12 19C8 19 4.667 16.667 2 12C3.369 9.605 4.913 7.825 6.632 6.659" stroke="#505A66" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_160_3614">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </div>
      {isPassword && value && (
        <div className="password-dots">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="password-dot" />
          ))}
        </div>
      )}
      {placeholder && !value && (
        <div className="form-placeholder">
          {placeholder}
        </div>
      )}
      {value && (
        <div className="absolute left-4 top-7 text-sm font-medium" style={{ color: '#1A1A1A', fontFamily: 'Poppins' }}>
          {type === "password" && !showPassword ? "" : value}
        </div>
      )}
    </div>
  );

  const Button = ({
    children,
    onClick,
    disabled = false,
    variant = "primary"
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary";
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={variant === "primary" ? "btn-primary" : "btn-secondary"}
    >
      {children}
    </button>
  );

  const VerificationInput = ({
    value,
    onChange,
    index
  }: {
    value: string;
    onChange: (value: string, index: number) => void;
    index: number;
  }) => (
    <div className="relative">
      <input
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value, index)}
        className="w-12 h-12 text-center text-sm font-semibold bg-white focus:outline-none border-b"
        style={{ borderBottomColor: value ? '#3679F2' : '#E6EAEE', borderBottomWidth: value ? '2px' : '1px' }}
      />
      {value && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #3679F2 0%, #69D6EE 100%)' }}></div>
      )}
    </div>
  );

  const LoginForm = () => (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <h1 className="text-[42px] font-bold leading-[110%] mb-2" style={{ color: '#21272A', fontFamily: 'Roboto' }}>
          Welcome Back!
        </h1>
        <p className="text-sm leading-5 font-inter" style={{ color: '#6A747E' }}>
          Please sign in to continue
        </p>
      </div>

      <form className="space-y-6">
        <InputField
          label="Email/Phone Number"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter email"
        />

        <div className="space-y-4">
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter password"
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
            isPassword={!showPassword && password.length > 0}
          />
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep("forgot-password")}
              className="text-sm font-medium leading-5 hover:underline font-inter"
              style={{ color: '#000' }}
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <Button
          onClick={() => console.log("Login clicked")}
          disabled={!email || !password}
        >
          Log In
        </Button>
      </form>
    </div>
  );

  const ForgotPasswordForm = () => (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <button
          onClick={() => setStep("login")}
          className="flex items-center gap-2 text-gray-500 text-sm mb-6 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2 font-roboto">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 font-inter">
          We'll send you a code to verify your account access.
        </p>
      </div>

      <form className="space-y-6">
        <InputField
          label="Email/Phone Number"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Johnsimth@gmail.com"
        />

        <Button onClick={() => setStep("verify-code")}>
          Send Code
        </Button>
      </form>
    </div>
  );

  const VerifyCodeForm = () => (
    <div className="w-full max-w-lg">
      <div className="mb-8">
        <button
          onClick={() => setStep("forgot-password")}
          className="flex items-center gap-2 text-gray-500 text-sm mb-6 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2 font-roboto">
          Verify Account Access
        </h1>
        <p className="text-sm text-gray-500 font-inter">
          Please enter the code sent to your number in order to verify your account.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-brand-primary p-4 rounded-lg">
          <div className="flex justify-center gap-4">
            {verificationCode.map((digit, index) => (
              <VerificationInput
                key={index}
                value={digit}
                index={index}
                onChange={(value, idx) => {
                  const newCode = [...verificationCode];
                  newCode[idx] = value;
                  setVerificationCode(newCode);
                }}
              />
            ))}
          </div>
        </div>

        <Button 
          onClick={() => setStep("reset-password")}
          disabled={verificationCode.some(digit => !digit)}
        >
          Confirm Code
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-500">Didn't get a code? </span>
          <button className="text-brand-primary hover:underline">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );

  const ResetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-roboto">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-500 font-inter">
            You are all set! Enter a new password.
          </p>
        </div>

        <form className="space-y-6">
          <InputField
            label="Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter password"
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Enter password"
          />

          <Button 
            onClick={() => console.log("Password reset")}
            disabled={!newPassword || !confirmPassword}
          >
            Reset Password
          </Button>
        </form>
      </div>
    );
  };

  const renderForm = () => {
    switch (step) {
      case "login":
        return <LoginForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      case "verify-code":
        return <VerifyCodeForm />;
      case "reset-password":
        return <ResetPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex">
      {/* Left Side - Blue Section with Branding */}
      <div className="hidden lg:flex lg:w-[788px] bg-brand-primary relative overflow-hidden">
        {/* Background pattern/texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-600"></div>
        
        {/* Woman silhouette */}
        <WomanSilhouette />
        
        {/* CWCNFP Branding */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <h2 className="text-white text-4xl font-semibold text-center tracking-wider font-poppins">
            CWCNFP
          </h2>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {renderForm()}
        </div>
      </div>

      {/* Mobile header for branding */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-brand-primary py-4 z-10">
        <h2 className="text-white text-2xl font-semibold text-center tracking-wider font-poppins">
          CWCNFP
        </h2>
      </div>

      {/* Mobile spacing */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
}
