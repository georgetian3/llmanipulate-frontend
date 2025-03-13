import { TaskRead } from "@/api";
import { Centered } from "@/components/common";
import api from "@/lib/apis";
import { Spinner } from "@heroui/react";
import React, { Key, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,

  User,

} from "@heroui/react";
import { DeleteIcon, PlusIcon, SearchIcon, ViewIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { getTranslation } from "@/components/utils";
import { useRouter } from "next/navigation";



function TaskRow({ task }: { task: TaskRead }) {
  return (
    <TableRow>
      <TableCell>{task.id}</TableCell>
      <TableCell>{JSON.stringify(task.config)}</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  )
}


const columns = [
  {name: "id", label: "ID"},
  {name: "name", label: "Name"},
  {name: "actions", label: "Actions"},
]

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<TaskRead[] | undefined>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [filterValue, setFilterValue] = useState("")
  const items = useMemo(() => {
    return tasks ? tasks.filter(task => getTranslation(task.config.name).toLowerCase().includes(filterValue)) : undefined
  }, [tasks, filterValue])

  async function getTasks() {
    setLoading(true)
    setTasks(await api.getTasks())
    setLoading(false)
  }

  async function deleteTask() {
    
  }

  useEffect(() => {
    (async () => {
      await getTasks()
    })()
  }, [])

  if (loading) {
    return (
      <Centered>
        <Spinner size="lg" />
      </Centered>
    )
  }


  function renderCell(task: TaskRead, column: Key) {
    console.log("Column", column)
    switch (column) {
      case "id":
        return (
          <div>
            {task.id}
          </div>
        )
      case "name":
        return (
          <div>
            {getTranslation(task.config.name)}
          </div>
        )

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button isIconOnly color="primary" onPress={() => router.push(`/tasks/${task.id}`)}>
              <ViewIcon />
            </Button>
            <Button isIconOnly color="danger">
              <DeleteIcon />
            </Button>
          </div>
        );
      default:
        return "";
    }
  }



  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(value) => setFilterValue(value ?? "")}
        />
        <div className="flex gap-3">
          <Button color="primary" endContent={<PlusIcon />}>
            Add New
          </Button>
        </div>
      </div>

    </div>
  )



  return (
    <Table
      isHeaderSticky
      classNames={{ base: "max-h-[80vh] m-4" }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.name} align={column.name === "actions" ? "center" : "start"}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )


}

