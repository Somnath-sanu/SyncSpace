import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import ActionButton from "./ActionButton";


const ActiveCollaborators = () => {
  const others = useOthers();
  
  

  const collaborators = others.map((other) => other.info);

  return (
    <ul className="hidden items-center justify-end -space-x-3 overflow-hidden sm:flex">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <ActionButton content={name} side="bottom">
            <Image
              src={avatar}
              alt={name}
              width={100}
              height={100}
              className="ring-dark-100 pointer-events-none inline-block size-8 rounded-full outline-none ring-2"
              style={{ border: `3px solid ${color}` }}
            />
          </ActionButton>
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
