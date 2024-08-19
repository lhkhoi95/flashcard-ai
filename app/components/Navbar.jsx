"use client";

import { cn } from "@/app/lib/utils";
import { MenuIcon, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Dialog, DialogClose } from "@/app/components/ui/dialog";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/app/components/ui/navigation-menu";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { GoPlus } from "react-icons/go";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { RectangleSkeleton } from "./Skeletons";
import { LOGO_IMAGE_URL } from "../lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const buttonGroupsDesktop = ButtonGroupDesktop({ user, isLoaded });
  const buttonGroupsMobile = ButtonGroupsMobile({ user, isLoaded });

  return (
    <div className="fixed z-[50] mt-4 flex w-full min-w-full items-center justify-center">
      <div className="relative flex w-[95%] justify-between rounded-full border border-white border-opacity-20 bg-white bg-opacity-10 p-2 shadow-lg backdrop-blur-lg backdrop-filter dark:border-zinc-900 dark:bg-black xl:w-[1200px]">
        <Dialog>
          <SheetTrigger className="p-2 transition min-[825px]:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex flex-col items-center">
                <Link href="/">
                  <h3 className="flex flex-row items-center text-xl font-medium">
                    <Image
                      src={LOGO_IMAGE_URL}
                      alt="logo"
                      width="512"
                      height="512"
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="ml-3">Discent AI</span>
                  </h3>
                </Link>
              </SheetTitle>
              <SheetDescription>Create and study flashcards</SheetDescription>
            </SheetHeader>
            <div className="z-[99] mt-[1rem] flex flex-col space-y-3">
              {buttonGroupsMobile}
            </div>
          </SheetContent>
        </Dialog>
        <NavigationMenu>
          <NavigationMenuList className="max-[825px]:hidden">
            <Link href="/">
              <h3 className="flex flex-row items-center text-xl font-medium">
                <Image
                  src={LOGO_IMAGE_URL}
                  alt="logo"
                  width="512"
                  height="512"
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-3">Discent AI</span>
              </h3>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        {buttonGroupsDesktop}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export function ButtonGroupDesktop({ user, isLoaded }) {
  if (!isLoaded) {
    return <RectangleSkeleton classes="w-12 md:w-56 rounded-full" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden items-center justify-center gap-4 md:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/flashcards/create">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <GoPlus className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new flashcard set using AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Link href="/flashcards/sets">
            <Button variant="outline" className="rounded-full">
              Library
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="" className="rounded-full">
              Upgrade
            </Button>
          </Link>
        </div>

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "size-10",
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 max-[825px]:hidden">
      <Link href="/contact">
        <Button variant="outline" className="rounded-full">
          Contact
        </Button>
      </Link>
      <Link href="/sign-in">
        <Button variant="outline" className="rounded-full">
          Login
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="rounded-full">Sign Up</Button>
      </Link>
    </div>
  );
}

export function ButtonGroupsMobile({ user, isLoaded }) {
  if (!user) {
    return (
      <>
        <DialogClose asChild>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Home
            </Button>
          </Link>
        </DialogClose>
        <DialogClose asChild>
          <Link href="/contact">
            <Button variant="outline" className="w-full">
              Contact
            </Button>
          </Link>
        </DialogClose>
        <DialogClose asChild>
          <Link href="/sign-in">
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
        </DialogClose>
        <DialogClose asChild>
          <Link href="/sign-up">
            <Button className="w-full">Sign Up</Button>
          </Link>
        </DialogClose>
      </>
    );
  }

  return (
    <>
      <DialogClose asChild>
        <Link href="/flashcards/create" className="mb-4">
          <Button variant="outline" className="w-full">
            Home
          </Button>
        </Link>
      </DialogClose>
      <DialogClose asChild>
        <Link href="/flashcards/create">
          <Button variant="secondary" className="w-full">
            Create Flashcards
          </Button>
        </Link>
      </DialogClose>
      <DialogClose asChild>
        <Link href="/flashcards/sets">
          <Button variant="outline" className="w-full">
            Library
          </Button>
        </Link>
      </DialogClose>
      <DialogClose asChild>
        <Link href="/pricing">
          <Button className="w-full">Upgrade</Button>
        </Link>
      </DialogClose>
    </>
  );
}
