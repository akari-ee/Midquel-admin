import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView } from "@/components/refine-ui/views/list-view";
import { format } from "date-fns";
import { CreateButton } from "@/components/refine-ui/buttons/create";

export type FilmItem = {
  id: string;
  slug: string;
  title: string;
  camera: string;
  lens: string;
  speed: string;
  iso: string;
  aperature: string;
  location: string;
  date: string;
  image: string;
  video: string;
};

export const FilmList = () => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<FilmItem>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
        enableSorting: false,
      }),
      columnHelper.accessor("date", {
        id: "date",
        header: "Date",
        enableSorting: false,
        cell: ({ getValue }) => {
          const date = getValue();
          const formattedDate = format(new Date(date), "yyyy-MM-dd");
          return <div className="max-w-xs truncate">{formattedDate}</div>;
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
      columnHelper.accessor("camera", {
        id: "camera",
        header: "Camera",
        enableSorting: false,
      }),
      columnHelper.accessor("lens", {
        id: "lens",
        header: "Lens",
        enableSorting: false,
      }),
      columnHelper.accessor("speed", {
        id: "speed",
        header: "Speed",
        enableSorting: false,
      }),
      columnHelper.accessor("iso", {
        id: "iso",
        header: "ISO",
        enableSorting: false,
      }),
      columnHelper.accessor("aperature", {
        id: "aperature",
        header: "Aperature",
        enableSorting: false,
      }),
      columnHelper.accessor("location", {
        id: "location",
        header: "Location",
        enableSorting: false,
      }),

      columnHelper.accessor("image", {
        id: "image",
        header: "Image",
        enableSorting: false,
        cell: ({ getValue }) => {
          const url = getValue();
          if (!url) return "-";
          return (
            <img
              src={String(url)}
              alt="thumb"
              className="h-40 object-cover rounded"
            />
          );
        },
      }),
      columnHelper.accessor("video", {
        id: "video",
        header: "Video",
        enableSorting: false,
        cell: ({ getValue }) => {
          const url = getValue();
          if (!url) return "-";
          return (
            <video
              src={String(url)}
              autoPlay
              loop
              muted
              playsInline
              className="h-40 object-cover rounded"
            />
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
      sorters: {
        initial: [
          {
            field: "date",
            order: "desc",
          },
        ],
      },
    },
  });

  return (
    <main className="flex flex-col gap-4">
      <CreateButton />
      <ListView>
        <DataTable table={table} />
      </ListView>
    </main>
  );
};
