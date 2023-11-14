import React from 'react';
import { Applicant } from '../hooks/useApplicants';
import { ColumnFiltersState, SortingState, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import ApplicantModal from './ApplicantModal';



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
            placeholder={`Filter...`}
            className="mt-2 p-1 border rounded w-full"
        />
    );
};


const LeaderboardTable = ({ applicants }: Props) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [showApplicantModal, setShowApplicantModal] = React.useState(false)

    const shortenText = (text: string, maxLength: number = 20) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...'
        }
        return text
    }


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
            header: 'Model Accuracy (%)',
            cell: info => <div className='w-full text-center'>{info.getValue()}</div>,
            meta: {
                sortType: 'number',
            }
        }),
        columnHelper.accessor('repo_link', {
            header: 'Repository Link',
            cell: info => <div className='overflow-hidden' data-tooltip-content={info.getValue()} data-tooltip-id={info.cell.id}>
                <a href={info.getValue()} className='overflow-hidden text-primary-color transition hover:underline' target='_blank'>{info.getValue()}</a>
                <Tooltip id={info.cell.id} />
            </div>
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('comment', {
            header: 'Comment',
            cell: info => <div className='' data-tooltip-content={info.getValue()} data-tooltip-id={info.cell.id}> {shortenText(info.getValue(), 20)}
                <Tooltip id={info.cell.id} style={{
                    maxWidth: '400px'
                }} />
            </div>
        }),
        columnHelper.accessor("feedback", {
            header: 'Feedback',
            cell: info => <div className='' data-tooltip-content={info.getValue()} data-tooltip-id={info.cell.id}>
                {shortenText(info.getValue(), 20)}
                <Tooltip id={info.cell.id} style={{
                    maxWidth: '400px'
                }} />
            </div>
        }),
    ];

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
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="p-4 shadow-md h-full w-full rounded-lg overflow-scroll bg-white">
            <table className="text-sm text-left text-gray-500 w-full border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="whitespace-nowrap py-3 px-6 border border-gray-300">
                                    <div>
                                        <div className={`flex flex-row items-center w-full justify-between transition-all group ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <div className='relative flex flex-col justify-center items-center ml-2 w-2'>
                                                <FaSortUp size={24} className={`text-primary-color ${header.column.getIsSorted() === 'asc'
                                                    ? 'opacity-100' : header.column.getIsSorted() !== 'desc' ? 'opacity-30 duration-300 group-hover:opacity-50' : 'opacity-30'
                                                    }`} />
                                                <FaSortDown size={24} className={`absolute text-primary-color ${header.column.getIsSorted() === 'desc' ?
                                                    'opacity-100' : header.column.getIsSorted() === 'asc' ? 'opacity-30 group-hover:opacity-50' : 'opacity-30'
                                                    }`} />
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
                        <tr key={row.id} className="bg-white border-b transition hover:bg-gray-50 cursor-pointer" onClick={() => setShowApplicantModal(true)}> {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className={`px-2 py-2 border-y-2 border-gray ${cell.column.id === 'accuracy' ? 'text-lg font-semibold' : ''}`}>
                                <div className='flex items-center h-10 shrink-0 w-44'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            </td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ApplicantModal isOpen={showApplicantModal} closeModal={() => setShowApplicantModal(false)} />
        </div >

    );
};

export default LeaderboardTable;
