export function generateStaticParams() {
  return [{ id: "preview" }];
}

export default async function AdminGroupDetailPage({ params }) {
  const { id } = await params;
  return <>Admin Group Detail and Action Page ({id})</>;
}
