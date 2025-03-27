import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import useNote from "../hooks/useNote";
import { useParams } from "react-router";
import NotFound from "../../../pages/NotFound";
import Modal from "../../../common/Modal";
import NoteForm from "../components/NoteForm";
import { useState } from "react";

const NotePage = () => {
  const { id } = useParams();
  const [note, error] = useNote(id || "");
  const [showModal, setShowModal] = useState(false);

  if (error) return <NotFound />;
  if (!note) return <></>;

  return (
    <>
      <EntityLayout
        title={`Note #${note.id}`}
        onEdit={() => setShowModal(true)}
      >
        <Tabs>
          <Tab eventKey="info" title="Information"></Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Edit Note"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <NoteForm defaultValues={note} />
      </Modal>
    </>
  );
};

export default NotePage;
