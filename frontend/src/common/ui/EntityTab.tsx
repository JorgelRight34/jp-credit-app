import { ReactNode } from "react";
import { Tab } from "react-bootstrap";

interface EntityTabLayout {
  children: ReactNode;
  title: string;
  eventKey: string;
}

const EntityTab = ({ title, eventKey, children, ...rest }: EntityTabLayout) => {
  return (
    <Tab.Pane {...rest} className="p-5" eventKey={eventKey} title={title}>
      {children}
    </Tab.Pane>
  );
};

export default EntityTab;
