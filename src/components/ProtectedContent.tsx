import { useAuth } from "../context/AuthContext";

export default function ProtectedContent() {
  const { isLoggedIn, login, logout } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center py-8">
        <p className="text-white mb-4">
          You must be logged in to view this content.
        </p>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={login}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center py-8">
      <h2 className="text-2xl text-white mb-4">Protected Content</h2>
      <p className="text-gray-300 mb-4">
        This content is only visible to logged-in users.
      </p>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
}
