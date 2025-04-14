import type React from "react";
import { useDnD } from "./dnd-context";
import type { NodeType } from "./types";

const Sidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div
        className="dndnode action"
        onDragStart={(event) => onDragStart(event, "action")}
        draggable>
        Action Node
      </div>
      <div
        className="dndnode segment"
        onDragStart={(event) => onDragStart(event, "segment")}
        draggable>
        Segment Node
      </div>
      <div className="dndnode smart" onDragStart={(event) => onDragStart(event, "smart")} draggable>
        Smart Segment Node
      </div>
      <div className="dndnode email" onDragStart={(event) => onDragStart(event, "email")} draggable>
        Email Node
      </div>
      <div className="dndnode wait" onDragStart={(event) => onDragStart(event, "wait")} draggable>
        Wait Node
      </div>
    </aside>
  );
};

export default Sidebar;
