import { useShow } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilmItem } from "./list";
import { format } from "date-fns";

export const FilmShow = () => {
  const { result: record } = useShow<FilmItem>({});

  return (
    <ShowView>
      <Card>
        <CardHeader>
          <CardTitle>{record?.title}</CardTitle>
          <CardDescription>Film ID: {record?.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Thumbnail Image</h4>
            {record?.image && (
              <img
                src={record?.image}
                alt="Thumbnail"
                className="h-96 w-96 object-cover rounded"
              />
            )}
            {record?.video && (
              <video
                src={record?.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-96 w-96 object-cover rounded"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Title</h4>
              <p className="text-sm text-muted-foreground">
                {record?.title || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Slug</h4>
              <p className="text-sm text-muted-foreground">
                {record?.slug || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Location</h4>
              <p className="text-sm text-muted-foreground">
                {record?.location || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Date</h4>
              <p className="text-sm text-muted-foreground">
                {record?.date
                  ? format(new Date(record?.date), "yyyy-MM-dd")
                  : "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Camera</h4>
              <p className="text-sm text-muted-foreground">
                {record?.camera || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Lens</h4>
              <p className="text-sm text-muted-foreground">
                {record?.lens || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Speed</h4>
              <p className="text-sm text-muted-foreground">
                {record?.speed || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">ISO</h4>
              <p className="text-sm text-muted-foreground">
                {record?.iso || "-"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Aperature</h4>
              <p className="text-sm text-muted-foreground">
                {record?.aperature || "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
};
