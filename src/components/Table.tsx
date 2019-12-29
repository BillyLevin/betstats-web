import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa';
import styled from 'styled-components';

type Props = {
    columns: any[];
    data: any[];
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

function Table({ columns, data }: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        footerGroups,
    } = useTable({ columns, data }, useSortBy);

    return (
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
                {rows.map((row: any) => {
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
    );
}

export { Table };
