import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
    FaSortDown,
    FaSortUp,
    FaSort,
    FaAngleDoubleRight,
    FaAngleDoubleLeft,
    FaAngleLeft,
    FaAngleRight,
} from 'react-icons/fa';
import styled from 'styled-components';
import { Button } from './Button';

type Props = {
    columns: any[];
    data: any[];
    defaultSort?: Array<{ id: string; desc: boolean }>;
    pageSizeOptions?: number[];
};

const CustomTable = styled.table`
    max-width: 100%;
    border-spacing: 0;
    border: 2px solid ${props => props.theme.colors.primary};

    tr:nth-child(odd) {
        background-color: ${props => props.theme.colors.primaryLight};
    }

    tr {
        background-color: ${props => props.theme.colors.white};
    }

    th,
    td {
        text-align: center;
        min-width: 12rem;
    }

    td,
    th div {
        padding: 0.8rem 1.6rem;
    }

    th,
    tfoot td {
        background-color: ${props => props.theme.colors.greyDark};
        color: ${props => props.theme.colors.primary};
        letter-spacing: 1px;
        font-weight: 700;
    }

    th {
        font-size: 1.4rem;
        text-transform: uppercase;

        div {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            span:first-child {
                margin-left: auto;
                margin-right: auto;
            }
        }
    }

    td {
        color: ${props => props.theme.colors.greyDark};
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8rem;

    .btn-pagination:not(:last-child) {
        margin-right: 0.8rem;
    }
`;

function Table({
    columns,
    data,
    defaultSort,
    pageSizeOptions = [10, 25, 50],
}: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        footerGroups,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        gotoPage,
        pageCount,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: pageSizeOptions[0],
                ...(defaultSort && { sortBy: defaultSort }),
            },
        },
        useSortBy,
        usePagination
    );

    return (
        <div>
            <CustomTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    <div>
                                        <span>{column.render('Header')}</span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FaSortDown />
                                            ) : (
                                                <FaSortUp />
                                            )
                                        ) : (
                                            <FaSort />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map((group: any) => (
                        <tr {...group.getFooterGroupProps()}>
                            {group.headers.map((column: any) => (
                                <td {...column.getFooterProps()}>
                                    {column.render('Footer')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </CustomTable>
            <Pagination>
                <Button
                    className="btn-pagination"
                    onClick={() => void gotoPage(0)}
                    disabled={!canPreviousPage}
                    aria-label="Go to first page"
                >
                    <FaAngleDoubleLeft />
                </Button>
                <Button
                    className="btn-pagination"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    aria-label="Go to previous page"
                >
                    <FaAngleLeft />
                </Button>
                <Button
                    className="btn-pagination"
                    onClick={nextPage}
                    disabled={!canNextPage}
                    aria-label="Go to next page"
                >
                    <FaAngleRight />
                </Button>
                <Button
                    className="btn-pagination"
                    onClick={() => void gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    aria-label="Go to last page"
                >
                    <FaAngleDoubleRight />
                </Button>
            </Pagination>
        </div>
    );
}

export { Table };
