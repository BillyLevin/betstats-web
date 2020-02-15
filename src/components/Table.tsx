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
import { Select } from './Select';
import { generateKeyDownHandler } from '../utils/events';

type Props = {
    columns: any[];
    data: any[];
    defaultSort?: Array<{ id: string; desc: boolean }>;
    pageSizeOptions?: number[];
    onRowClick?: (
        event:
            | React.MouseEvent<HTMLTableRowElement, MouseEvent>
            | React.KeyboardEvent<HTMLTableRowElement>,
        row: any
    ) => void;
};

const CustomTable = styled.table`
    max-width: 100%;
    border-spacing: 0;
    border: 2px solid ${props => props.theme.colors.primary};

    tr {
        background-color: ${props => props.theme.colors.white};
    }

    tr:nth-child(odd) {
        background-color: ${props => props.theme.colors.primaryLight};
    }

    tr.clickable {
        cursor: pointer;

        &:hover,
        &:focus,
        &:active {
            background-color: ${props => props.theme.colors.primary};
        }

        &:focus {
            outline: 2px solid ${props => props.theme.colors.primaryDark};
        }
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
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.8rem;

    .btn-pagination:first-child {
        margin-right: 0.8rem;
    }

    .btn-pagination:last-child {
        margin-left: 0.8rem;
    }
`;

const PaginationControls = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const PageStatus = styled.span`
    margin: 0 0.8rem;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 400;
`;

const SortBy = styled.div`
    &:focus {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.greyDark};
        outline: 0;
    }
`;

function Table({
    columns,
    data,
    defaultSort,
    pageSizeOptions = [10, 25, 50],
    onRowClick,
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
        setPageSize,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: pageSizeOptions[0],
                ...(defaultSort && { sortBy: defaultSort }),
            },
            disableMultiSort: true,
        },
        useSortBy,
        usePagination
    );

    const clickable = !!onRowClick;

    return (
        <div>
            <CustomTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps()}
                                    aria-sort={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? 'descending'
                                                : 'ascending'
                                            : 'none'
                                    }
                                >
                                    <SortBy
                                        {...column.getSortByToggleProps()}
                                        tabIndex={0}
                                        role="button"
                                        aria-label="Toggle Sort"
                                        onKeyDown={event => {
                                            const handler = generateKeyDownHandler(
                                                [13, 32],
                                                column.toggleSortBy
                                            );

                                            handler(event);
                                        }}
                                    >
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
                                    </SortBy>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                onClick={event => {
                                    if (clickable) {
                                        onRowClick!(event, row);
                                    }
                                }}
                                onKeyDown={event => {
                                    if (clickable) {
                                        const handler = generateKeyDownHandler(
                                            [13, 32],
                                            () => void onRowClick?.(event, row)
                                        );

                                        handler(event);
                                    }
                                }}
                                aria-label={
                                    clickable
                                        ? 'Click to edit this bet'
                                        : undefined
                                }
                                className={clickable ? 'clickable' : undefined}
                                tabIndex={clickable ? 0 : undefined}
                            >
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
                <Select
                    items={pageSizeOptions}
                    onChange={changes => void setPageSize(changes.selectedItem)}
                    label="Items Per Page"
                />
                <PaginationControls>
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
                    <PageStatus>
                        Page {pageIndex + 1} of {pageCount}
                    </PageStatus>
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
                </PaginationControls>
            </Pagination>
        </div>
    );
}

export { Table };
