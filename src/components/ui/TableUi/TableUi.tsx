import { ISesson } from "@/types/auth";
import { LIMIT_DEFAULT, LIST_LIMIT, LIST_PAYMENT_ORDER, LIST_STATUS_ORDER } from "@/utils/constanta";
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ChangeEvent, useEffect, useMemo } from "react";
import { IoSearch } from "react-icons/io5";


interface TypeProps {
  data: Record<string, unknown>[] | []
  column: {label: string; id: string}[]
  renderCell: (data: Record<string, unknown>, column: {label: string; id: string}) => React.ReactNode,
  isLoading: boolean;

  showCreate?: boolean;
  textCreate?: string;
  openCreate?: () => void;

  placeholderSearch?: string;

  emptyContent: string;

  currentLimit?: string;
  currentPage?: string | number;
  currentStatus?: string;
  currentPayment?: string;
  currentCashierId?: string;
  currentStart?: string;
  currentEnd?: string;

  totalPage?: number;

  showLimit?: boolean;
  onChangeLimit?: (e:ChangeEvent<HTMLSelectElement>) => void;

  showPagination?: boolean;

  showSearch?: boolean;
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void; 

  showStatus?: boolean;
  onChangeStatus?: (e:ChangeEvent<HTMLSelectElement>) => void;

  showCashier?: boolean;
  listCashier?: ISesson[] | [];
  isLoadingDataCashier?: boolean;
  onChangeCashier?: (e:ChangeEvent<HTMLSelectElement>) => void;

  showPayment?: boolean;
  onChangePayment?: (e:ChangeEvent<HTMLSelectElement>) => void;
}

const TableUi = (props: TypeProps) => {
    const {
      data,
      column,
      renderCell,
      isLoading,

      showCreate,
      textCreate = "Tambah",
      openCreate,

      placeholderSearch = "Cari",

      emptyContent,

      currentLimit,
      currentPage,
      currentStatus,
      currentPayment,
      currentCashierId,
      currentStart,
      currentEnd,

      totalPage,

      showLimit,
      onChangeLimit,

      showPagination,
      
      showSearch,
      onChangeSearch,

      showStatus,
      onChangeStatus,

      showCashier,
      listCashier,
      isLoadingDataCashier,
      onChangeCashier,

      showPayment,
      onChangePayment
    } = props;

    
    const topContent = useMemo(() => {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {showSearch && (
              <div className="max-w-100 " >
                <Input placeholder={placeholderSearch} variant="bordered" className="w-full bg-white rounded-2xl" onChange={onChangeSearch} startContent={(
                  <IoSearch />
                )} />
              </div>
            )}
            
            {showCreate && (
              <Button className="bg-blue-500 text-white" onPress={openCreate}>
                {textCreate}
              </Button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {showStatus && (
              <Select
              className="min-w-24 max-w-xs bg-white rounded-2xl"
              variant="bordered"
              items={LIST_STATUS_ORDER}
              selectedKeys={[`${currentStatus}`]}
              startContent={<p className='text-sm font-semibold'>Status: </p>}
              disallowEmptySelection
              selectionMode="single"
              onChange={onChangeStatus}
              >
                {(item) => (
                  <SelectItem key={item.id}>
                    {item.label}
                  </SelectItem>
                )}
              </Select>
            )}
            
            {showPayment && (
              <Select
              className="min-w-24 max-w-xs bg-white rounded-2xl"
              variant="bordered"
              items={LIST_PAYMENT_ORDER}
              selectedKeys={[`${currentPayment}`]}
              startContent={<p className='text-sm font-semibold'>Payment: </p>}
              disallowEmptySelection
              selectionMode="single"
              onChange={onChangePayment}
              >
                {(item) => (
                  <SelectItem key={item.id}>
                    {item.label}
                  </SelectItem>
                ) }
              </Select>
            )}

            {showCashier && (
              <Select
              className="min-w-24 max-w-xs bg-white rounded-2xl"
              variant="bordered"
              items={listCashier}
              selectedKeys={[`${currentCashierId}`]}
              startContent={<p className='text-sm font-semibold'>Cashier: </p>}
              selectionMode="single"
              onChange={onChangeCashier}
              >
                {(item) => (
                  <SelectItem key={item._id}>
                    {item.fullName}
                  </SelectItem>
                ) }
              </Select>
            )}
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">

          </div>
        </div>
      )
    },[onChangeSearch, openCreate, onChangeStatus, onChangePayment, onChangeCashier, currentStatus, currentPayment, listCashier])


    const bottomContent = useMemo(() => {
      return (
        <div className="flex flex-col gap-4 lg:flex-row justify-between">
          {showLimit && (
            <Select
            className="min-w-24 max-w-xs bg-white rounded-2xl"
            variant="bordered"
            items={LIST_LIMIT}
            selectedKeys={[`${currentLimit}`]}
            startContent={<p className='text-sm'>limit:</p>}
            disallowEmptySelection
            selectionMode="single"
            onChange={onChangeLimit}
            >
              {(limit) => (
                <SelectItem key={limit.key}>
                  {limit.label}
                </SelectItem>
              ) }
            </Select>
          )}

          {showPagination && (
            <Pagination variant="bordered"  initialPage={1} total={totalPage || 1} />
          )}
        </div>
      )
    },[LIST_LIMIT, currentLimit, onChangeLimit, totalPage, showLimit, showPagination])

    return (

      <div className="relative">
        {isLoading && (
          <div className="absolute top-0 bottom-0 w-full bg-black/30 rounded-2xl z-10 backdrop-blur-xs flex justify-center items-center min-h-24">
            <Spinner color="primary" />
          </div>
        )}

        <Table aria-label="table for category" fullWidth topContent={topContent} topContentPlacement="outside" bottomContent={bottomContent} bottomContentPlacement="outside">
          <TableHeader className="bg-blue-400">
            {column.map((c: {label: string; id: string}) => (
              <TableColumn key={c.id} className="bg-blue-400/30 text-gray-800">{c.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={emptyContent}> 
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