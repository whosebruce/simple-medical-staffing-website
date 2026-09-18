import { pageGraph, type PageSchemaOptions } from "@/lib/schema";

// Emits the page's JSON-LD graph. Rendered once per page inside the page
// component so the WebPage node always matches the page's own metadata.
export function StructuredData(options: PageSchemaOptions) {
  const graph = pageGraph(options);
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output; "<" is escaped so the payload cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
