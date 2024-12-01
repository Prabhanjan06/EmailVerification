import { useState } from "react";

const EmailVerification = () => {
  const [email, setEmail] = useState("");

  const verifyEmailWithApi = async (email) => {
    const apiKey = ""; // Replace with your actual API key
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    try {
      console.log("Email being verified:", email);
      const response = await fetch(url);
      const data = await response.json();

      console.log("Full Response Data:", data);

      if (data.deliverability === "DELIVERABLE") {
        alert("Success: The email is valid and deliverable.");
      } else {
        alert("Not valid: The email does not exist or is undeliverable.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("Error occurred while verifying the email.");
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={() => verifyEmailWithApi(email)}>Verify Email</button>
    </div>
  );
};

export default EmailVerification;
