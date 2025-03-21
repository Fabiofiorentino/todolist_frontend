import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import taskService from "../services/taskService";
import ButtonComponent from "./Button";

interface TaskModalProps {
  show: boolean;
  handleClose: () => void;
  task?: any;
  refreshTasks: () => void;
}

const TaskModal = ({
  show,
  handleClose,
  task,
  refreshTasks,
}: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSave = async () => {
    if (task) {
      await taskService.updateTask(task.id, { title, description });
    } else {
      await taskService.createTask({ title, description });
    }
    setTitle("");
    setDescription("");
    refreshTasks();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-primary">
          {task ? "Editar Tarefa" : "Nova Tarefa"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label className="fw-semibold">Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Digite o título da tarefa..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-semibold">Descrição</Form.Label>
            <Form.Control
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Descreva sua tarefa..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonComponent
          text="Cancelar"
          variant="outline-secondary"
          onClick={handleClose}
        />
        <ButtonComponent
          text="Salvar"
          variant="primary"
          onClick={handleSave}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
