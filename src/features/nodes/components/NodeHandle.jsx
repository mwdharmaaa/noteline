import { Handle } from "@xyflow/react";
const NodeHandle = ({
  type,
  position,
  id,
  isConnectable = true
}) => {
  return <Handle
    type={type}
    position={position}
    id={id}
    isConnectable={isConnectable}
    className="!w-2 !h-2 !bg-zinc-300 !border !border-zinc-950 hover:!bg-white hover:!scale-125 transition-all duration-150 !rounded-none shadow-sm"
  />;
};
export {
  NodeHandle
};
