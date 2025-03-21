"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Badge,
  Dropdown,
  Row,
  Col,
  Card,
  Nav,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import taskService from "../../services/taskService";
import authService from "../../services/authService";
import TaskModal from "@/src/components/TaskModal";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import Navbar from "@/src/components/Navbar";
import ButtonComponent from "@/src/components/Button";

const Tasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (!authService.getToken()) {
      router.push("/login");
    } else {
      fetchTasks();
    }
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks(
        filter !== null ? { status: filter } : {}
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      await taskService.deleteTask(id);
      setSelectedTask(null);
      fetchTasks();
    }
  };

  const handleToggleStatus = async (task: any) => {
    await taskService.updateTask(task.id, { status: !task.status });
    fetchTasks();
  };

  const columns = [
    {
      name: "Título",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => (row.status ? "Concluída" : "Pendente"),
      cell: (row: any) => (
        <span
          className={`status-badge ${row.status ? "completed" : "pending"}`}
        >
          {row.status ? "Concluída" : "Pendente"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row: any) => (
        <div className="action-buttons">
          <ButtonComponent
            icon={<FaEdit color="blue"/>}
            className="border-0 bg-transparent p-0"
            size="sm"
            onClick={() => handleEdit(row)}
          />
          <ButtonComponent
            icon={<FaTrash color="red" />}
            className="border-0 bg-transparent p-0"
            size="sm"
            onClick={() => handleDelete(row.id)}
          />
          <ButtonComponent
            icon={row.status ? <FaTimes  color="gray"/> : <FaCheck color="green"/>}
            className="border-0 bg-transparent p-0"
            size="sm"
            onClick={() => handleToggleStatus(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <Container fluid className="task-container">
      <h2 className="title">Gerenciar Tarefas</h2>
      <p className="quote"></p>
      <div className="task-controls">
        <ButtonComponent
          text="Nova Tarefa"
          icon={<FaPlus />}
          variant="primary"
          onClick={handleNewTask}
          color="white"
        />

        <Dropdown>
          <Dropdown.Toggle variant="secondary">Filtrar</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter(null)}>Todas</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter(false)}>
              Pendente
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter(true)}>
              Concluída
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <DataTable
        columns={columns}
        data={tasks}
        pagination
        striped
        className="task-table"
      />

      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        task={selectedTask}
        refreshTasks={fetchTasks}
      />
    </Container>
  );
};

export default Tasks;
