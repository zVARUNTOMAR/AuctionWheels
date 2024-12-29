import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white text-gray-800 shadow-md">
      <Logo></Logo>
      <Search></Search>
      {user ? (
        <div className="flex items-center space-x-4">
          <UserActions user={user}></UserActions>
        </div>
      ) : (
        <LoginButton></LoginButton>
      )}
    </header>
  );
}
