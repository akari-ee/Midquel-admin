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

export const ArchiveShow = () => {
  const { result: record } = useShow({
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
                <Badge
                  variant={
                    record?.status === "published" ? "default" : "secondary"
                  }
                >
                  {record?.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ID: {record?.id}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-4">Content</h4>
              <div className="prose prose-sm max-w-none">
                {record?.info ? (
                  <div dangerouslySetInnerHTML={{ __html: record.info }} />
                ) : (
                  <p className="text-muted-foreground">No content available</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Slug</h4>
                <p className="text-sm text-muted-foreground">{record?.slug || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Year</h4>
                <p className="text-sm text-muted-foreground">{record?.year || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">{record?.location || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Tag</h4>
                <p className="text-sm text-muted-foreground">{record?.tag || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Homepage Featured</h4>
                <p className="text-sm text-muted-foreground">{record?.homepage_featured ? "Yes" : "No"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};


