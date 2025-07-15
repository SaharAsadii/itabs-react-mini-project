import { useState, useCallback } from "react";

export const useSmartMatchState = () => {
  const [smartMatchEnabled, setSmartMatchEnabled] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const handleItemClick = useCallback(
    (e: React.MouseEvent, itemId: string | null) => {
      e.stopPropagation();
      if (itemId) {
        setSelectedMatchId((currentId) =>
          currentId === itemId ? null : itemId
        );
      }
    },
    []
  );

  return {
    smartMatchEnabled,
    setSmartMatchEnabled,
    selectedMatchId,
    setSelectedMatchId,
    handleItemClick,
  };
};
