import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Link } from "@/quaries/useUserLinks";
import { Link as RouterLink } from "react-router-dom";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDeleteLink, useEditLink } from "@/quaries/useLinkMutations";

const DashboardTable = ({ userLinks }: { userLinks: Link[] }) => {
  const id = useId();

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10">
                <Checkbox id={id} aria-label="select-all" />
              </TableHead>
              <TableHead>id</TableHead>
              <TableHead>Original Link</TableHead>
              <TableHead>Short Link</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userLinks.map((item) => (
              <TableRow
                key={item.id}
                className="has-data-[state=checked]:bg-muted/50"
              >
                <TableCell>
                  <Checkbox
                    id={`table-checkbox-${item.id}`}
                    aria-label={`user-checkbox-${item.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <RouterLink
                    target="blank"
                    to={item.original_link}
                    className="hover:text-blue-600 duration-200 hover:underline"
                  >
                    {item.original_link}
                  </RouterLink>
                </TableCell>
                <TableCell>{item.short_link}</TableCell>
                <TableCell>{item.click_counts}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>
                  <LinkActions item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const LinkActions = ({ item }: { item: Link }) => {
  const deleteMutation = useDeleteLink();
  const editMutation = useEditLink();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newOriginalLink, setNewOriginalLink] = useState(item.original_link);
  const [isHumanReadable, setIsHumanReadable] = useState(false);

  const handleDelete = () => {
    deleteMutation.mutate(item.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editMutation.mutate(
      {
        id: item.id,
        original_link: newOriginalLink,
        human_readable: isHumanReadable,
      },
      {
        onSuccess: () => setIsEditDialogOpen(false),
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-[24px] aspect-square hover:bg-sidebar-ring/20 duration-200 cursor-pointer flex items-center justify-center rounded-[4px]">
            <Ellipsis size={14} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Update the original URL, this would create a new short link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="original-link">Original Link</Label>
              <Input
                id="original-link"
                value={newOriginalLink}
                onChange={(e) => setNewOriginalLink(e.target.value)}
                placeholder="https://example.com"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="human-readable"
                checked={isHumanReadable}
                onCheckedChange={(checked) => setIsHumanReadable(!!checked)}
              />
              <Label htmlFor="human-readable">Human-readable link</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editMutation.isPending}>
                {editMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              short link and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardTable;
