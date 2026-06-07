"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import StatusBadge from "@/components/status-badge";

export default function ProviderTable({ providers }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);

  const handleDelete = (provider) => {
    setProviderToDelete(provider);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setDeleteDialogOpen(false);
    setProviderToDelete(null);
  };

  return (
    <>
      <div className="rounded-lg border border-border/60 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Provider
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Category
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Rating
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground text-sm"
                >
                  No providers found
                </TableCell>
              </TableRow>
            ) : (
              providers.map((provider) => (
                <TableRow
                  key={provider.id}
                  className="transition-colors hover:bg-muted/20"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={provider.avatar || "/placeholder.svg?height=36&width=36"}
                          alt={provider.name}
                          width={36}
                          height={36}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{provider.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {provider.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{provider.category}</TableCell>
                  <TableCell>
                    <StatusBadge status={provider.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">
                        {provider.rating}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(provider)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Provider</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{providerToDelete?.name}</strong> and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
