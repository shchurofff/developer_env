import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#ui";
import { FC } from "react";

interface ProjectCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectCreateModal: FC<ProjectCreateModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-h-[80vh] min-w-2xl">
        <DialogHeader>
          <DialogTitle>Добавление проекта</DialogTitle>
          <DialogDescription>
            В данной форме вы можете добавить всю подробную информацию о
            проекте, над которым работали
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
