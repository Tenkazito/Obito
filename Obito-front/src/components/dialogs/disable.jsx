import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ShieldMinus } from "lucide-react";
import { useState } from "react";

const Disable = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    // Lógica para habilitar la cuenta
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
          <ShieldMinus className="h-4 w-4" /> Disable
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Your account will be disables and you will not be able to use any of the features of the application.
            You can enable it at any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleContinue}>
            Disable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Disable;