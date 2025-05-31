import { Card, Typography } from "@material-tailwind/react";

function Table({ headers, data, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <Card className="w-full min-w-[600px] overflow-x-auto shadow-md rounded-lg">
        <div className="w-full overflow-x-auto pr-[50px] mt-[20px]">
          <table className="w-full table-auto text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-blue-gray-50">
                {headers.map((head) => (
                  <th
                    key={head.key}
                    className="border-b border-blue-gray-100 px-3 py-2 font-semibold text-blue-gray-700 whitespace-nowrap"
                  >
                    <Typography
                      variant="small"
                      className="text-xs md:text-sm font-medium"
                    >
                      {head.label}
                    </Typography>
                  </th>
                ))}
                <th className="border-b border-blue-gray-100 px-3 py-2 font-semibold text-blue-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "px-3 py-2"
                  : "px-3 py-2 border-b border-blue-gray-50";
                return (
                  <tr key={row.id || index} className="hover:bg-blue-gray-50 transition-colors">
                    {headers.map((head) => (
                      <td key={head.key} className={`${classes} whitespace-nowrap`}>
                        <Typography
                          variant="small"
                          className="text-xs md:text-sm text-blue-gray-800"
                        >
                          {head.key === "staff"
                            ? row[head.key]?.name || row[head.key] || ""
                            : row[head.key] ?? ""}
                        </Typography>
                      </td>
                    ))}
                    <td className={`${classes}`}>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => onEdit && onEdit(row)}
                          className="px-3 py-1 bg-indigo-500 text-white rounded text-xs md:text-sm hover:bg-indigo-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete && onDelete(row)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs md:text-sm hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Table;
