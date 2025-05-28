import { Card, Typography } from "@material-tailwind/react";

function Table({ headers, data }) {
  return (
    <div className="w-full flex-1 overflow-x-auto">
      <Card className="w-[full] flex-1 min-w-0 max-w-full overflow-x-auto shadow-none">
        <table className="w-full min-w-0 table-auto text-left">
          <thead>
            <tr>
              {headers.map((head) => (
                <th
                  key={head.key}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-lg font-bold"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70 text-lg font-bold"
                  >
                    {head.label}
                  </Typography>
                </th>
              ))}
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-lg font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={row.id || index}>
                  {headers.map((head) => (
                    <td key={head.key} className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {head.key === "staff"
                          ? row[head.key]?.name || row[head.key] || ""
                          : row[head.key] ?? ""}
                      </Typography>
                    </td>
                  ))}
                  <td className={classes}>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors text-sm font-medium">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default Table;