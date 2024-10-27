import prismadb from "@/lib/prisma";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeId } = await params
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId, 
    },
  });

  return (
    <div>
      Active Store: {store?.name}
    </div>
  );
};

export default DashboardPage;