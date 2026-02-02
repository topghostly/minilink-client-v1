import { AppSidebar } from "@/components/app-sidebar";
import DashboardTable from "@/components/dashboard-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useMe } from "@/quaries/useMe";
import { useUserLinks, type Link } from "@/quaries/useUserLinks";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateLink } from "@/quaries/useLinkMutations";

export default function DashboardLayout() {
  const { data: user, isLoading } = useMe();
  const { data: links } = useUserLinks();
  const [userLinks, setUserLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (links) {
      setUserLinks(links);
    }
  }, [links]);

  const mostClickedLink =
    userLinks.length > 0
      ? userLinks.reduce((prev, current) =>
          prev.click_counts > current.click_counts ? prev : current,
        )
      : null;

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} isLoading={isLoading} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                {/* <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 px-8">
            <div className="bg-muted/50 rounded-xl">
              <div className="p-8 flex gap-5 flex-col">
                <h2 className="font-medium text-sm">Total number of links</h2>
                <p className="text-6xl font-semibold text-muted-foreground">
                  {userLinks.length}
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl">
              <div className="p-8 flex gap-5 flex-col">
                <h2 className="font-medium text-sm">Total number of clicks</h2>
                <p className="text-6xl font-semibold text-muted-foreground">
                  {userLinks.reduce((acc, link) => acc + link.click_counts, 0)}
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl">
              <div className="p-8 flex gap-5 flex-col">
                <h2 className="font-medium text-sm">
                  Link with major engagement
                </h2>
                <p
                  className="text-4xl font-semibold text-muted-foreground break-all hover:underline hover:text-blue-600 duration-200 cursor-pointer"
                  onClick={() => {
                    window.open(`${mostClickedLink?.original_link}`, "_blank");
                  }}
                >
                  {mostClickedLink ? mostClickedLink.short_link : "N/A"}
                  {/* Add link to the site after adding the domain name  */}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-8 flex justify-start items-center px-8 mt-8">
            <CreateLinkDialog />
          </div>
          <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
            <div className="px-8 flex gap-5 flex-col">
              {userLinks && <DashboardTable userLinks={userLinks} />}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const CreateLinkDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [originalLink, setOriginalLink] = useState("");
  const [isHumanReadable, setIsHumanReadable] = useState(false);
  const createMutation = useCreateLink();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      {
        original_link: originalLink,
        is_human_readable: isHumanReadable,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setOriginalLink("");
          setIsHumanReadable(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="hover:bg-sidebar-ring/20 border rounded-[8px] duration-200 cursor-pointer p-2">
          <Plus size={20} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Enter the original URL to create a shortened link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="original-link">Original Link</Label>
            <Input
              id="original-link"
              value={originalLink}
              onChange={(e) => setOriginalLink(e.target.value)}
              placeholder="https://example.com/very-long-url"
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
