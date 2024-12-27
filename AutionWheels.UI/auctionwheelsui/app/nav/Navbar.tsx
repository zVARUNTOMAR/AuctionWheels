import { AiOutlineCar } from "react-icons/ai";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white text-gray-800 shadow-md">
      <div className="flex items-center gap-2 text-2xl font-semibold text-red-500">
        <AiOutlineCar size={30}></AiOutlineCar>
        <div>Auction Wheels</div>
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}
