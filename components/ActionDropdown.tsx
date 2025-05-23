"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.action";
import { constructDownloadUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useState } from "react";
import { FileDetails, ShareInput } from "./ActionsModalContent";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const [emails, setEmails] = useState<string[]>([]);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setAction(null);
    setName(file.name);
  };

  const handleActions = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoverUser = async (email: string) => {
     const updatedEmails = emails.filter((e) => e !== email)
     
     const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
     });

     if(success) setEmails(updatedEmails);
     closeAllModals();
  }

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-black pb-1 font-semibold">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && (<FileDetails file={file} />)}
          {value === "share" && (<ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoverUser} />)}
          {value === "delete" && (
            <p className="text-center text-light-100 font-medium">
              Are you sure, You want to delete{` `}
              <span className="font-semibold text-red2">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "share", "delete"].includes(value) && (
          <DialogFooter className="flex pt-2 flex-col gap-3 md:flex-row">
            <Button onClick={handleActions} className="button-submit-modal">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src="/assets/icons/tube-spinner.svg"
                  alt="loading"
                  width={24}
                  height={24}
                  className="animate-spin ml-2"
                />
              )}
            </Button>
            <Button onClick={closeAllModals} className="cancel-button-modals">
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (open) setIsDropdownOpen(false);
      }}
    >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="Dots"
            width={25}
            height={25}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-2xl flex-1">
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="dropdown-item-shad"
              onClick={() => {
                setAction(actionItem);
                setIsDropdownOpen(false);

                if (
                  ["rename", "details", "share", "download", "delete"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={25}
                    height={25}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={25}
                    height={25}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
