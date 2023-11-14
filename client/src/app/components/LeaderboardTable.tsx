import React from 'react';
import { Applicant } from '../hooks/useApplicants';
import { ColumnFiltersState, SortingState, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa6";



const columnHelper = createColumnHelper<Applicant>();


interface Props {
    applicants: Applicant[];
}

const Filter = ({ column, table }: { column: any, table: any }) => {
    const firstValue = ""
    return (
        <input
            type="text"
            defaultValue={firstValue}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search ${column.id}`}
            className="mt-2 p-1 border rounded w-full"
        />
    );
};


const LeaderboardTable = ({ applicants }: Props) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState('')


    const columns = [
        columnHelper.accessor('full_name', {
            header: 'Name',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('github_name', {
            header: 'GitHub Name',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('accuracy', {
            header: 'Model Accuracy',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('repo_link', {
            header: 'Repo Link',
            cell: info => <div className='w-28'>
                <a href={info.getValue()} className='text-primary-color transition hover:underline' target='_blank'>{info.getValue()}</a>
            </div>
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('comment', {
            header: 'Comment',
            cell: info => <div className=''> {info.getValue()}
            </div>
        }),
        columnHelper.accessor("feedback", {
            header: 'Feedback',
            cell: info => <div className=''>
                {info.getValue()}
            </div>
        }),
    ];

    const getSortIcon = (column: any) => {
        if (column.getIsSorted() === 'asc') {
            return <FaSortUp size={24} className="text-primary-color" />;
        }
        if (column.getIsSorted() === 'desc') {
            return <FaSortDown size={24} className="text-primary-color" />;
        }
        return (
            null
        );
    };

    const table = useReactTable({
        data: applicants,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="p-4 shadow-md h-full w-full rounded-lg overflow-scroll bg-white">
            <table className="text-sm text-left text-gray-500 w-full border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="py-3 px-6 border border-gray-300">
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        <div className='flex flex-row items-center transition'>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <div className='flex flex-col justify-center items-center ml-2 w-2'>
                                                {getSortIcon(header.column)}
                                            </div>
                                        </div>
                                        {header.column.getCanFilter() ? (
                                            <div>
                                                <Filter column={header.column} table={table} />
                                            </div>
                                        ) : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="bg-white border-b transition hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className={`py-4 px-6 border border-gray-300 ${cell.column.id === 'accuracy' ? 'text-lg font-semibold' : ''}`}>
                                    <div className='flex items-center h-10 overflow-hidden'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default LeaderboardTable;
