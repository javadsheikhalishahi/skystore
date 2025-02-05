import { SignOutUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import FileUploader from "./FileUploader";
import Search from "./Search";
import { Button } from "./ui/button";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader accountId={accountId} ownerId={userId} />
        <form
          action={async () => {
            "use server";
            await SignOutUser();
          }}
        >
          <Button
            type="submit"
            className="sign-out-button"
            aria-label="Sign out"
            title="Sign out"
          >
            <Image
              src="/assets/icons/logout-svgrepo-com.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
