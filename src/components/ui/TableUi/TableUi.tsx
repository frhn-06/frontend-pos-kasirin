import { Button, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useMemo } from "react";
import { IoSearch } from "react-icons/io5";


interface TypeProps {
  data: Record<string, unknown>[] | []
  column: {label: string; id: string}[]
  renderCell: (data: Record<string, unknown>, column: {label: string; id: string}) => React.ReactNode,
  isLoading: boolean;

  isCreate?: boolean;
  textCreate?: string;
  openCreate: () => void;

  isSearch?: boolean,
  placeholderSearch?: string;
}

const TableUi = (props: TypeProps) => {
    const {
      data,
      column,
      renderCell,
      isLoading,

      isCreate,
      textCreate = "Tambah",
      openCreate,

      isSearch,
      placeholderSearch = "Cari"
    } = props;


    const topContent = useMemo(() => {
      return (
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {isSearch && (
            <div className="max-w-90 " >
              <Input placeholder={placeholderSearch} variant="bordered" className="w-full bg-white rounded-2xl" startContent={(
                <IoSearch />
              )} />
            </div>
          )}
          
          {isCreate && (
            <Button className="bg-blue-500 text-white" onPress={openCreate}>
              {textCreate}
            </Button>
          )}
        </div>
      )
    },[])

    return (

      <div className="relative">
        {isLoading && (
          <div className="absolute top-0 bottom-0 w-full bg-black/30 rounded-2xl z-10 backdrop-blur-xs flex justify-center items-center min-h-24">
            <Spinner color="primary" />
          </div>
        )}

        <Table aria-label="table for category" fullWidth topContent={topContent} topContentPlacement="outside">
          <TableHeader className="bg-blue-400">
            {column.map((c: {label: string; id: string}) => (
              <TableColumn key={c.id} className="bg-blue-400/30 text-gray-800">{c.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"Kategori kosong"}> 
            {data?.map((d) => (
              <TableRow key={`${d._id}`}>
                {column.map((c: {label: string; id: string}) => (
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