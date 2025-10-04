import { useShow } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArchiveItem } from "./list";

export const ArchiveShow = () => {
  const { result: record } = useShow<ArchiveItem>({
    meta: {
      select: "*",
    },
  });

  return (
    <ShowView>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
                <Badge>
                  Featured: {record?.homepage_featured ? "Yes" : "No"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Archive ID: {record?.id}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Thumbnail Image</h4>
                <img src={record?.thumbnail_image || ""} alt="Thumbnail" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Images</h4>
                <div className="flex overflow-x-scroll gap-4">
                  {(record?.images as string[])?.map((image) => (
                    <img
                      src={image}
                      alt="Image"
                      className="h-40 w-40 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Info</h4>
              <div className="prose prose-sm max-w-none">
                {record?.info ? (
                  <div dangerouslySetInnerHTML={{ __html: record.info }} />
                ) : (
                  <p className="text-muted-foreground">No info available</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Slug</h4>
                <p className="text-sm text-muted-foreground">
                  {record?.slug || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Year</h4>
                <p className="text-sm text-muted-foreground">
                  {record?.year || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">
                  {record?.location || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Tag</h4>
                <p className="text-sm text-muted-foreground">
                  {record?.tag || "-"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Tagline</h4>
                <p className="text-sm text-muted-foreground">
                  {record?.tagline || "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
