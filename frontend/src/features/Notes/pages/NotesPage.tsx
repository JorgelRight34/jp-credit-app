import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import useNotes from "../hooks/useNotes";
import NotesDataTable from "../components/NotesDataTable";
import Modal from "../../../common/Modal";
import NoteForm from "../components/NoteForm";
import { useState } from "react";
import NoteSearchInput from "../components/NoteSearchInput";

const NotesPage = () => {
  const [notes, fetchNotes] = useNotes();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EntityLayout title="Notas" onAddNew={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="notes" title="Todos" className="p-3">
            <div className="row mb-3">
              <NoteSearchInput />
            </div>
            <NotesDataTable notes={notes} navigateCallback={fetchNotes} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="Nueva Nota"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <NoteForm />
      </Modal>
    </>
  );
};

export default NotesPage;
