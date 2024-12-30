"use client";

import { Dropdown } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { HiCog, HiUser } from "react-icons/hi";
import { User } from "next-auth";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useParamsStore } from "../hooks/useParamStore";

type Props = {
  user: User;
};

const UserActions = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") router.push("/");
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined });
    if (pathname !== "/") router.push("/");
  }
  return (
    <Dropdown inline label={`Welcome ${user.name}`} className="text-sm">
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Auctions won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ redirectTo: "/" })}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default UserActions;
