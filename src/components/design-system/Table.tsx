import React from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  hoverable?: boolean;
}

export function Table({ columns, data, onRowClick, hoverable = true }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#dde1e6]">
      <table className="w-full">
        <thead className="bg-[#f4f4f4]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left border-b border-[#dde1e6]"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-[#697077]">
                Ingen data funnet
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-[#dde1e6] last:border-b-0 transition-colors
                  ${hoverable ? 'hover:bg-[#f4f4f4] cursor-pointer' : ''}
                  ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-[14px]">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
