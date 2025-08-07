import { useNavigate } from "react-router-dom";
import { UseTestGuard } from "@/components/context/testGuard.context";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProtectedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const ProtectedLink: React.FC<ProtectedLinkProps> = ({
  to,
  children,
  className,
}) => {
  const navigate = useNavigate();
  const { isDoingTest } = UseTestGuard();
  const [showDialog, setShowDialog] = useState(false);
  const [pendingTo, setPendingTo] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (isDoingTest) {
      setPendingTo(to);
      setShowDialog(true);
    } else {
      navigate(to);
    }
  };

  const handleConfirmLeave = () => {
    if (pendingTo) {
      navigate(pendingTo);
      setShowDialog(false);
    }
  };

  return (
    <>
      <a href={to} onClick={handleClick} className={className}>
        {children}
      </a>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to leave the test?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            If you leave this page, your test progress will be lost. Do you
            still want to continue?
          </p>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Stay in
            </Button>
            <Button variant="destructive" onClick={handleConfirmLeave}>
              Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProtectedLink;
