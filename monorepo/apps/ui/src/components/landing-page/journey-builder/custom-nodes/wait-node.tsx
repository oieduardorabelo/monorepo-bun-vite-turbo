import { Handle, Position } from "@xyflow/react";

import type { NodeData } from "../types";

const WaitNode = ({ data }: { data: NodeData }) => {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">{data.label}</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default WaitNode;
