import InputField from "./InputField";
import Button from "./Button";

const AuthForm = ({ formData, handleChange, handleSubmit, buttonText, error }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      {error && <p className="text-red-500">{error}</p>}
      <InputField type="text" name="name" placeholder="Name" onChange={handleChange} />
      <InputField type="email" name="email" placeholder="Email" onChange={handleChange} />
      <InputField type="password" name="password" placeholder="Password" onChange={handleChange} />
      <Button text={buttonText} type="submit" variant="primary" />
    </form>
  );
};

export default AuthForm;
