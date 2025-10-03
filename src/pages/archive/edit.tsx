import { Textarea } from "@/components/ui/textarea";
// import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Select components removed (not used for archive schema)

export const ArchiveEdit = () => {
  const navigate = useNavigate();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm({
    refineCoreProps: {
      meta: {
        select: "*",
      },
    },
  });

  function onSubmit(values: Record<string, string>) {
    onFinish(values);
  }

  return (
    <EditView>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField control={form.control} name="slug" rules={{ required: "Slug is required" }} render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} placeholder="unique-slug" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="title" rules={{ required: "Title is required" }} render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} placeholder="Enter title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="tagline" render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} placeholder="Short tagline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="year" render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} placeholder="e.g. 2024" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} placeholder="City, Country" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="info" render={({ field }) => (
            <FormItem>
              <FormLabel>Info</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} placeholder="Description (HTML allowed)" rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="tag" render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} placeholder="tag(s)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="thumbnail_image" render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail Image URL</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="homepage_featured" render={({ field }) => (
            <FormItem>
              <FormLabel>Homepage Featured</FormLabel>
              <FormControl>
                <Input type="checkbox" checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="images" render={({ field }) => (
            <FormItem>
              <FormLabel>Images (JSON)</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} placeholder='[{"url": "..."}]' rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          

          <div className="flex gap-2">
            <Button
              type="submit"
              {...form.saveButtonProps}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </EditView>
  );
};


