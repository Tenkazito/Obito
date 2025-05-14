import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import onClickAccountFetch from "./activeAccountFetch";

const Enable = () => {
  const [open, setOpen] = useState(false);
  const { profile, updateProfile } = useProfile();

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    onClickAccountFetch(profile.accountid, updateProfile);
    setOpen(false); // Cierra el diálogo después de continuar
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault(); // Evita que el DropdownMenu se cierre
            setOpen(true); // Abre el diálogo
          }}
          className="flex flex-row gap-2 cursor-pointer"
        >
          <ShieldCheck className="h-4 w-4" />
          Enable
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Your account will be enabled and you will be able to use all the features of the application.
            You can disable it at any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Enable;