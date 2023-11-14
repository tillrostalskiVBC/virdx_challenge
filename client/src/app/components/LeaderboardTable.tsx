import React from 'react';
import { Applicant } from '../hooks/useApplicants';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const columnHelper = createColumnHelper<Applicant>();

const columns = [
    columnHelper.accessor('full_name', {
        header: 'Full Name',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('github_name', {
        header: 'GitHub Name',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('accuracy', {
        header: 'Accuracy',
        cell: info => info.getValue()
    }),
];

interface Props {
    applicants: Applicant[];
}

const LeaderboardTable = ({ applicants }: Props) => {
    const table = useReactTable({
        data: applicants,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-4 shadow-md rounded-lg bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="py-3 px-6">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-4 px-6">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderboardTable;
