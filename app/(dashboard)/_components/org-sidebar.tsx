"use client";
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div
      className="hidden lg:flex flex-col space-y-6 w-[260px]
      pl-5 pt-5"
    >
      <Link href="./">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />

          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              justifyContent: "space-between",
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-4" />
            Team boards
          </Link>
        </Button>

        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-4" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
