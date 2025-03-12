import DeleteModal from "@/Components/Admin/DeleteModal";
import RupiahFormatter from "@/lib/RupiahFormatter";
import {
    AuthenticatedLayout,
    React,
    useState,
    Head,
    Header,
    TanStackTable,
    createColumnHelper,
    Pencil,
    Trash2,
} from "@/Pages/Admin/import";
import TicketsForm from "./TicketsForm";

const EventsTicket = ({ event, tickets }) => {
    const columnHelper = createColumnHelper();
    const [globalFilter, setGlobalFilter] = useState("");
    const [formType, setFormType] = useState("add");

    const [isFormOpen, setIsFormOpen] = useState(false);
    // delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [selectedData, setSelectedData] = useState(null);
    const getOne = tickets.find((data) => data.id === selectedData);

    const handleEdit = (id) => {
        setSelectedData(id);
        setFormType("edit");
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setSelectedData(id);
        setIsDeleteModalOpen(true);
    };

    const handleAddNew = () => {
        setSelectedData(null);
        setFormType("add");
        setIsFormOpen(true);
    };

    const columns = [
        columnHelper.accessor("index", {
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
        columnHelper.accessor("category", {
            header: () => <div className="text-center w-full">Category</div>,
            cell: ({ getValue }) => (
                <div className="text-center whitespace-nowrap font-bold text-black">
                    {getValue()}
                </div>
            ),
        }),
        columnHelper.accessor("ticket_price", {
            header: "Ticket Price",
            cell: ({ getValue }) => (
                <div className="">
                    <RupiahFormatter value={getValue()} />
                </div>
            ),
        }),
        columnHelper.accessor("ticket_quantity", {
            header: () => <div className="text-center w-full">Quantity</div>,
            cell: ({ getValue }) => (
                <div className="flex w-full justify-center text-black underline">
                    {getValue()}
                </div>
            ),
        }),
        columnHelper.accessor("ticket_sold", {
            header: "Ticket_Sold",
            cell: ({ row, getValue }) => {
                const quantity = row.original.ticket_quantity;
                const sold = getValue();

                const percentage =
                    quantity === 0
                        ? 100
                        : Number(((sold / quantity) * 100).toFixed(1));

                return (
                    <div className="flex gap-1 items-center">
                        <h1 className="relative w-[80px] text-center capitalize py-1 rounded-md bg-red-300 text-white overflow-hidden">
                            <span className="relative z-20">
                                {sold === null ? 0 : sold}
                            </span>
                            <div
                                className="absolute top-0 h-full bg-red-500"
                                style={{ width: `${percentage}%` }}
                            />
                        </h1>
                        <span className="text-[9px] font-semibold text-gray-800">
                            {percentage}%
                        </span>
                    </div>
                );
            },
        }),
        columnHelper.accessor("id", {
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-1.5 justify-center">
                    <button
                        onClick={() => handleEdit(row.original.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.id)}
                        className="p-1.5 text-red-600 hover:bg-red-100   rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            meta: {
                className: "!justify-center",
            },
        }),
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Events Tickets" />
            <Header
                navigation={{
                    text: "Events Management",
                    current: `Tickets - ${event.name}`,
                    url: route("admin.events.index"),
                }}
                searchValue={globalFilter}
                onSearchChange={setGlobalFilter}
            />
            <section className="my-6">
                <div className="bg-white py-4 px-4 rounded-xl shadow-md w-full">
                    <TanStackTable
                        data={tickets}
                        columns={columns}
                        globalFilter={globalFilter}
                        onGlobalFilterChange={setGlobalFilter}
                        handleBtn={handleAddNew}
                    />
                </div>
            </section>
            <TicketsForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                formType={formType}
                getData={getOne}
                getEventID={event.id}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                id={{
                    event: event.id,
                    ticket: selectedData,
                }}
                deleteUrl="admin.events.ticket.destroy"
            />
        </AuthenticatedLayout>
    );
};

export default EventsTicket;
