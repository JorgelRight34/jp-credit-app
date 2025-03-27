import { Tab, Tabs } from "react-bootstrap";
import EntityLayout from "../../../common/EntityLayout";
import useNotes from "../hooks/useNotes";
import NotesDataTable from "../components/NotesDataTable";
import Modal from "../../../common/Modal";
import NoteForm from "../components/NoteForm";
import { useState } from "react";
import NoteSearchInput from "../components/NoteSearchInput";

const NotesPage = () => {
  const [notes] = useNotes();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <EntityLayout title="Notes" onAddNew={() => setShowModal(true)}>
        <Tabs>
          <Tab eventKey="notes" title="All" className="p-3">
            <div className="row mb-3">
              <NoteSearchInput />
            </div>
            <NotesDataTable notes={notes} />
          </Tab>
        </Tabs>
      </EntityLayout>
      <Modal
        title="New note"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <NoteForm />
      </Modal>
    </>
  );
};

export default NotesPage;
