"use client";

import { useRouter } from "next/navigation"; // Corrected import
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Example of fetching data client-side
    fetch("/api/path/to/your/data")
      .then((response) => response.text())
      .then((data) => setErrorMessage(data));
  }, []);

  const router = useRouter(); // Using useRouter hook

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>
        {errorMessage ||
          "An error occurred during authentication. Please try again."}
      </p>
      <button onClick={() => router.push("/login")}>Back to Login</button>
    </div>
  );
}
