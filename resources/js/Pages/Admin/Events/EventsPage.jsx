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
import DeleteModal from "@/Components/Admin/DeleteModal";

import { CalendarArrowUp } from "lucide-react";
import EventsForm from "./EventsForm";
import { router } from "@inertiajs/react";

const EventsPage = ({ events }) => {
  // const [eventStatus, setEventStatus] = useState('ready');
  const columnHelper = createColumnHelper();
  const [globalFilter, setGlobalFilter] = useState("");
  const [formType, setFormType] = useState("add");

  const [isFormOpen, setIsFormOpen] = useState(false);
  // delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const getOne = events.find((data) => data.id === selectedData);

  const handleDetail = (id) => {
    router.get(route('admin.events.ticket.index', id));
  };

  const handleEdit = (id) => {
    setSelectedData(id);
    setFormType('edit');
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedData(id);
    setIsDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedData(null);
    setFormType('add');
    setIsFormOpen(true);
  };

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
    columnHelper.accessor('name', {
      header: 'Name',
      cell: ({ getValue }) => (
        <div className="whitespace-nowrap overflow-hidden">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('date', {
      header: () => <div className="text-center w-full">Date</div>,
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('id-ID', options);
        const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.');

        return (
          <div className="whitespace-nowrap font-bold text-black">
            {`${formattedDate} - ${formattedTime}`}
          </div>
        );
      },
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: ({ getValue }) => (
        <div className="whitespace-nowrap overflow-hidden">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ getValue }) => (
        <div className="whitespace-nowrap overflow-hidden max-w-[40rem] truncate">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-1.5 justify-center">
          <button
            onClick={() => handleDetail(row.original.id)}
            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
          >
            <CalendarArrowUp size={16} />
          </button>
          <button
            onClick={() => handleEdit(row.original.id)}
            className="p-1.5 text-yellow-600 hover:bg-blue-100 rounded"
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
        className: '!justify-center'
      }
    }),
  ]

  // const filteredEvents = eventStatus === 'all' 
  //   ? events 
  //   : events.filter(event => event.status === eventStatus);

  // const handleStatusChange = (status) => {
  //   setEventStatus(status);
  // };

  return (
    <AuthenticatedLayout>
      <Head title="Events" />
      <Header
        title="Events Management"
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
      />
      {/* <div className="mt-6 pl-2.5">
        <button 
          onClick={() => handleStatusChange('ready')} 
          className={`duration-200 px-6 py-1.5 rounded-t-2xl font-medium ${eventStatus === 'ready' ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          Ready
        </button>
        <button 
          onClick={() => handleStatusChange('soldout')} 
          className={`duration-200 px-6 py-1.5 rounded-t-2xl font-medium ${eventStatus === 'soldout' ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          Soldout
        </button>
      </div> */}
      <section className="mt-6 relative z-10 bg-white py-4 px-4 rounded-xl shadow-[0px_2px_7px_3px_rgba(0,_0,_0,_0.1)] mb-6">
        <TanStackTable
          data={events}
          columns={columns}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          handleBtn={handleAddNew}
        />
      </section>
      <EventsForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType={formType}
        getData={getOne}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={selectedData}
        deleteUrl="admin.events.destroy"
      />
    </AuthenticatedLayout>
  );
};

export default EventsPage;
