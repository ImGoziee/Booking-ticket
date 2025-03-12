import {
  AuthenticatedLayout,
  React,
  useState,
  Head,
  Header,
  TanStackTable,
  createColumnHelper,
  Pencil,
  Trash2
} from '@/Pages/Admin/import';
import UsersForm from './UsersForm'
import DeleteModal from '@/Components/Admin/DeleteModal';

const UsersPage = ({ users }) => {

  const columnHelper = createColumnHelper()
  const [globalFilter, setGlobalFilter] = useState('');
  const [formType, setFormType] = useState('add');

  const [selectedUser, setSelectedUser] = useState(null);
  const getOne = users.find(user => user.id === selectedUser);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormType('edit');
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedUser(id);
    setIsDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setFormType('add');
    setIsFormOpen(true);
  };

  const columns = [
    columnHelper.accessor('index', {
      header: () => <div className="text-center w-full">#</div>,
      cell: ({ row, table }) => {
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
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('role', {
      header: () => <div className="text-center w-full">Role</div>,
      cell: ({ getValue }) => (
        <div className="flex justify-center">
          <p className={`${getValue() === 'admin' ? 'bg-blue-500 text-white' : 'bg-yellow-200 text-zinc-700'} w-[60px] text-center capitalize py-1 rounded-md`}>
            {getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Action',
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
        className: '!justify-center'
      }
    }),
  ]

  return (
    <>
      <AuthenticatedLayout>
        <Head title="Users" />
        <Header
          title='Users Management'
          searchValue={globalFilter}
          onSearchChange={setGlobalFilter}
        />
        <section className='bg-white mt-4 py-4 px-4 rounded-xl shadow-md'>
          <TanStackTable
            data={users}
            columns={columns}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            handleBtn={handleAddNew}
          />
        </section>
        <UsersForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          formType={formType}
          userData={getOne}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          id={selectedUser}
          deleteUrl="admin.users.destroy"
        />
      </AuthenticatedLayout>
    </>
  )
}

export default UsersPage