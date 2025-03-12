import React from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import TextInput from "../TextInput";
import {
    ChevronUp,
    ChevronDown,
    Search,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

const TanStackTable = ({
    data,
    columns,
    globalFilter,
    onGlobalFilterChange,
    handleBtn,
}) => {
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-3">
                <div>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) =>
                            table.setPageSize(Number(e.target.value))
                        }
                        className="pl-3 pr-5 py-1.5 text-sm font-semibold cursor-pointer rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {[5, 10, 15, 20, 30, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleBtn}
                    className="bg-blue-600 hover:bg-blue-500 duration-150 text-white text-sm px-4 py-2 rounded-lg"
                >
                    Add New
                </button>
            </div>
            {/* Search
            <div className="mb-4 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <TextInput
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div> */}

            {/* Table */}
            <div className={`rounded-lg border bg-[white] overflow-x-auto max-w-full scroll-theme-x`}>
                <table className="w-full text-sm">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="border-b bg-gray-50"
                            >
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={` px-4 py-3 font-medium cursor-pointer `}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div
                                            className={` flex items-center gap-1 ${header.column.columnDef.meta
                                                ?.className || ""
                                                } `}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() &&
                                                (header.column.getIsSorted() ===
                                                    "asc" ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-b">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3 text-zinc-700">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 px-2 flex items-center justify-between">
                <div className="text-sm">
                    Showing{" "}
                    {table.getState().pagination.pageSize *
                        table.getState().pagination.pageIndex +
                        1}{" "}
                    to{" "}
                    {Math.min(
                        table.getState().pagination.pageSize *
                        (table.getState().pagination.pageIndex + 1),
                        table.getFilteredRowModel().rows.length
                    )}{" "}
                    of {table.getFilteredRowModel().rows.length} entries
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-md bg-blue-700 text-white disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-md bg-blue-700 text-white disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TanStackTable;
