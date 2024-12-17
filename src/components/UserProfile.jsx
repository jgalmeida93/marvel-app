import { logout } from "../services/auth";

export function UserProfile({ user }) {
  return (
    <div>
      <h2>Welcome, {user.displayName}!</h2>
      <img
        src={user.photoURL}
        alt="Profile"
        style={{ width: 50, borderRadius: "50%" }}
      />
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
