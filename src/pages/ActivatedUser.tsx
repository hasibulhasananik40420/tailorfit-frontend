import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivatedUser = () => {
  const [activationStatus, setActivationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    const activateUser = async () => {
      try {
        if (!token) {
          throw new Error("No token provided");
        }

        let response;
        let data;
        if (token) {
          response = await fetch(
            // `http://localhost:5000/api/v1/user/active-user`,
            `https://api.tailorfitapp.com/api/v1/user/active-user`,
            {
              // response = await fetch(
              //   `https://api.tailorfitapp.com/api/v1/user/active-user`,
              //   {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to activate user");
          }
          data = await response.json();
        }

        // console.log('Activation successful, navigating to login...');
        setActivationStatus(data.message);
        navigate("/login");
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    if (token) {
      activateUser();
    }
  }, [token, navigate]);

  return (
    <div>
      {activationStatus ? (
        <p>{activationStatus}</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Activating user...</p>
      )}
    </div>
  );
};

export default ActivatedUser;
