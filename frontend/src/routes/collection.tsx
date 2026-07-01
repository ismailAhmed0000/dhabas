import { createFileRoute } from "@tanstack/react-router";

import { CollectionCatalog } from "../components/CollectionCatalog";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/collection")({
  component: CollectionPage,
  head: () => ({
    meta: [
      { title: "Collection | Islandvoguemv" },
      {
        name: "description",
        content:
          "Shop all in-stock branded handbags. Filter by style, tag, and price to find your perfect bag.",
      },
      { property: "og:title", content: "Collection | Islandvoguemv" },
      {
        property: "og:description",
        content:
          "Shop all in-stock branded handbags. Filter by style, tag, and price to find your perfect bag.",
      },
    ],
  }),
});

function CollectionPage() {
  return (
    <SiteLayout>
      <CollectionCatalog />
    </SiteLayout>
  );
}
