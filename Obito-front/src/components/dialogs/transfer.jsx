import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const Transfer = ({ open, onOpenChange, formData, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            The money will be transferred to the other user account. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            <strong>User ID:</strong> {formData?.accountTo || "N/A"}
          </p>
          <p>
            <strong>Amount:</strong> ${formData?.amount?.toFixed(2) || "0.00"}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!formData}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Transfer;