import column_list from "@/components/views/Owner/Category/category.constant";
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

interface TypeProps {
  data: Record<string, unknown>[] | []
  column: {label: string; id: string}[]
  renderCell: (data: Record<string, unknown>, column: {label: string; id: string}) => React.ReactNode,
  isLoading: boolean;
}

const TableUi = (props: TypeProps) => {
    const {
      data,
      renderCell,
      isLoading
    } = props;

    return (

      <div className="relative">
        {isLoading && (
          <div className="absolute top-0 bottom-0 w-full bg-black/30 rounded-2xl z-10 backdrop-blur-xs flex justify-center items-center min-h-24">
            <Spinner color="primary" />
          </div>
        )}

        <Table aria-label="table for category" fullWidth>
          <TableHeader className="bg-blue-400">
            {column_list.map((c: {label: string; id: string}) => (
              <TableColumn key={c.id} className="bg-blue-400/30 text-gray-800">{c.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"Kategori kosong"}> 
            {data?.map((d) => (
              <TableRow key={`${d._id}`}>
                {column_list.map((c: {label: string; id: string}) => (
                  <TableCell key={c.id}>{renderCell(d, c)}</TableCell>
                ))}
              </TableRow>
            ))}        
          </TableBody>
        </Table>
      </div>
    )
}

export default TableUi;