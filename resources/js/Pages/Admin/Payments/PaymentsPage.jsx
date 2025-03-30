import {
  AuthenticatedLayout,
  React,
  useState,
  Head,
  Header,
  TanStackTable,
  createColumnHelper,
  Trash2,
} from "@/Pages/Admin/import";

const EventsPage = ({ payments }) => {
  const columnHelper = createColumnHelper();
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    columnHelper.accessor('index', {
      header: () => <div className="text-center w-full">#</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center text-black">
            {row.index + 1}
          </div>
        );
      },
      enableSorting: false,
    }),
    columnHelper.accessor('id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-1.5 justify-center">
          <button
            className="p-1.5 text-[#f2f2f2] rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      meta: {
        className: '!justify-center'
      }
    }),
  ]

  return (
    <AuthenticatedLayout>
      <Head title="Payments" />
      <Header
        title="List of payments"
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
      />
      <section className="mt-6 relative z-10 bg-white py-4 px-4 rounded-xl shadow-[0px_2px_7px_3px_rgba(0,_0,_0,_0.1)] mb-6">
        <TanStackTable
          data={payments}
          columns={columns}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          canAdd={false}
        />
      </section>
    </AuthenticatedLayout>
  );
};

export default EventsPage;
