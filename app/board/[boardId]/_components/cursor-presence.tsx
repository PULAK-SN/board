"use client";

import { memo } from "react";
import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react";
import { Cursor } from "./cursor";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([Key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={Key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#000"}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const CursorPresence = memo(() => {
  return (
    <>
      {/* see others drawing on real time*/}
      <Drafts />
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
