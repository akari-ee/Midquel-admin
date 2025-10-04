import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";

export type ArchiveItem = {
  id: string;
  slug: string;
  title: string;
  homepage_featured: boolean;
  tagline: string | null;
  year: string | null;
  location: string | null;
  info: string | null;
  tag: string | null;
  thumbnail_image: string | null;
  images: unknown;
};

export const ArchiveList = () => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<ArchiveItem>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
        enableSorting: true,
      }),
      columnHelper.accessor("thumbnail_image", {
        id: "thumbnail",
        header: "Thumbnail",
        enableSorting: false,
        cell: ({ getValue }) => {
          const url = getValue();
          if (!url) return "-";
          return (
            <img
              src={String(url)}
              alt="thumb"
              className="h-40 w-40 object-cover rounded"
            />
          );
        },
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: "Title",
        enableSorting: true,
      }),
      columnHelper.accessor("slug", {
        id: "slug",
        header: "Slug",
        enableSorting: true,
      }),
      columnHelper.accessor("info", {
        id: "info",
        header: "Info",
        enableSorting: false,
        cell: ({ getValue }) => {
          const content = getValue();
          if (!content) return "-";
          return (
            <div className="max-w-xs truncate">{content.slice(0, 80)}...</div>
          );
        },
      }),
      columnHelper.accessor("year", {
        id: "year",
        header: "Year",
        enableSorting: true,
      }),
      columnHelper.accessor("location", {
        id: "location",
        header: "Location",
        enableSorting: true,
      }),
      columnHelper.accessor("tag", {
        id: "tag",
        header: "Tag",
        enableSorting: true,
      }),
      columnHelper.accessor("homepage_featured", {
        id: "homepage_featured",
        header: "Featured",
        enableSorting: true,
        cell: ({ getValue }) => {
          const featured = Boolean(getValue());
          return (
            <Badge variant={featured ? "default" : "secondary"}>
              {featured ? "Yes" : "No"}
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <EditButton recordItemId={row.original.id} size="sm" />
            <ShowButton recordItemId={row.original.id} size="sm" />
            <DeleteButton recordItemId={row.original.id} size="sm" />
          </div>
        ),
        enableSorting: false,
        size: 290,
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      syncWithLocation: true,
      meta: {
        select: "*",
      },
      sorters: {
        initial: [
          {
            field: "year", // 정렬 기준 필드
            order: "desc", // "asc" 또는 "desc"
          },
        ],
      },
    },
  });

  return (
    <ListView>
      <DataTable table={table} />
    </ListView>
  );
};
