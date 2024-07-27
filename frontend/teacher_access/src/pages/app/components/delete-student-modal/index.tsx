import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface DeleteStudentModalProps {
  deleteStudentModal: boolean;
  setDeleteStudentModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteStudentModal = ({
  deleteStudentModal,
  setDeleteStudentModal,
}: DeleteStudentModalProps) => {
  return (
    <Dialog open={deleteStudentModal} onOpenChange={setDeleteStudentModal}>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete? You cannot go back any further,
              the decision is permanent
            </DialogDescription>
          </DialogHeader>
          <main className="flex gap-2 justify-end">
            <Button
              variant={"outline"}
              onClick={() => setDeleteStudentModal(false)}
            >
              Cancel
            </Button>
            <Button>Confirm</Button>
          </main>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
