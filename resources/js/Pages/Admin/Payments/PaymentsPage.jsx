import OrderCodeGenerator from "@/lib/OrderCodeGenerator";
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

const PaymentsList = ({ payments }) => {
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
    columnHelper.accessor(row => row, {
      id: 'orderCode',
      header: 'Order Code',
      cell: ({ getValue }) => {
        const row = getValue();
        return (
          <div className="whitespace-nowrap overflow-hidden text-blue-600 hover:underline cursor-pointer">
            <OrderCodeGenerator createdAt={row.created_at} ticketId={row.order_id} />
          </div>
        );
      },
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: ({ getValue }) => (
        <div className="whitespace-nowrap overflow-hidden">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('payment_method', {
      header: 'Payment Method',
      cell: ({ getValue }) => (
        <div className="whitespace-nowrap overflow-hidden">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => (
        <div className="whitespace-nowrap overflow-hidden">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('created_at', {
      header: 'Date',
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return (
          <div className="whitespace-nowrap overflow-hidden">
            {date.toLocaleDateString('id-ID', options)}
          </div>
        );
      },
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

export default PaymentsList;
