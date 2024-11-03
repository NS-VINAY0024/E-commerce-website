const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <div>Welcome, {user.name}!</div>
    </div>
  );
};
