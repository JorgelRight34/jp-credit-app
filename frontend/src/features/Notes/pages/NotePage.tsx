import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../layouts/EntityLayout";
import useNote from "../hooks/useNote";
import { useParams } from "react-router";
import NotFound from "../../../pages/NotFound";
import Modal from "../../../common/ui/Modal";
import NoteForm from "../components/NoteForm";
import { useState } from "react";
import NoteInfo from "../components/NoteInfo";
import LoanInfo from "../../Loans/components/LoanInfo";

const NotePage = () => {
  const { id } = useParams();
  const { note, isError, isLoading } = useNote(id || "");
  const [showModal, setShowModal] = useState(false);

  if (isError) return <NotFound />;
  if (isLoading) return <>...</>;

  return (
    <>
      <EntityLayout
        title={`Note #${note.id}`}
        onEdit={() => setShowModal(true)}
      >
        <Tabs>
          <Tab eventKey="info" title="Information" className="p-3">
            <NoteInfo note={note} />
          </Tab>
        </Tabs>
        <Tabs>
          <Tab eventKey="loan" title="Loan" className="p-3">
            <LoanInfo loan={note.loan} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Edit Note"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <NoteForm edit={note} defaultValues={note} />
      </Modal>
    </>
  );
};

export default NotePage;
