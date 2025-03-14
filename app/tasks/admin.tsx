import { TaskRead } from "@/api";
import { CenteredSpinner } from "@/components/common";
import api from "@/lib/apis";
import React, { Key, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@heroui/react";
import { DeleteIcon, PlusIcon, SearchIcon, ViewIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { getTranslation } from "@/components/utils";
import { useRouter } from "next/navigation";




const columns = [
  { name: "id", label: "ID" },
  { name: "name", label: "Name" },
  { name: "loginRequired", label: "Login Required" },
  { name: "actions", label: "Actions" },
]

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<TaskRead[] | undefined>([])
  const [loading, setLoading] = useState(true)
  const [filterValue, setFilterValue] = useState("")
  const [deleteTaskId, setDeleteTaskId] = useState("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter()
  const items = useMemo(() => {
    return tasks ? tasks.filter(task => getTranslation(task.config.name).toLowerCase().includes(filterValue)) : undefined
  }, [tasks, filterValue])

  async function getTasks() {
    setLoading(true)
    setTasks(await api.getTasks())
    setLoading(false)
  }

  async function deleteTask() {
    await api.deleteTask(deleteTaskId)
    setDeleteTaskId("")
    await getTasks()
  }

  useEffect(() => {
    (async () => {
      await getTasks()
    })()
  }, [])

  if (loading) {
    return (
      <CenteredSpinner />
    )
  }


  function renderCell(task: TaskRead, column: Key) {
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
      case "loginRequired":
        return (
        <div>
          {task.config.login_required
            ? <Chip color="success">Yes</Chip>
            : <Chip color="danger">No</Chip>
          }
        </div>
        )
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button isIconOnly color="primary" onPress={() => router.push(`/tasks/${task.id}`)}>
              <ViewIcon />
            </Button>
            <Button
              isIconOnly
              color="danger"
              onPress={() => {
                setDeleteTaskId(task.id!)
                onOpen()
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      default:
        return ""
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
          <Button color="primary" endContent={<PlusIcon />} onPress={() => router.push("/tasks/create")}>
            Create
          </Button>
        </div>
      </div>

    </div>
  )

  return (
    <div>
      <Table
        isHeaderSticky
        classNames={{ base: "h-[calc(100vh-6rem)] pt-4" }}
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
        <TableBody emptyContent={"No tasks found"} items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                Are you sure you want to delete this task?
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    await deleteTask()
                    onClose()
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )

}

