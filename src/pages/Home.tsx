import { useUser } from "@/hooks/auth/useUser";

export default function Home() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Home</h1>
      <div className="mt-4">
        <p>Welcome {user.email}!</p>
        <p>User ID: {user.id}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
}
