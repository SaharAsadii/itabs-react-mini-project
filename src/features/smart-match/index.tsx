import {
  LoadingState,
  SmartMatchHeader,
  TableHeaders,
  DataRow,
} from "./components";
import { useSmartMatchData } from "./hooks/use-smart-match-data";
import { useSmartMatchState } from "./hooks/use-smart-match-state";
import "./smart-match.styles.scss";

export const SmartMatch = () => {
  const { data, loading, error } = useSmartMatchData();
  const {
    smartMatchEnabled,
    setSmartMatchEnabled,
    selectedMatchId,
    handleItemClick,
  } = useSmartMatchState();

  const listData = data ? Object.values(data.data.list) : [];

  return (
    <div className="smart-match-container">
      <LoadingState loading={loading} error={error} hasData={!!data}>
        <SmartMatchHeader
          smartMatchEnabled={smartMatchEnabled}
          onSmartMatchToggle={setSmartMatchEnabled}
        />

        <div className="table-wrapper">
          <TableHeaders />

          {listData.map((listItem, index) => (
            <DataRow
              key={`${listItem.size_type}-${listItem.cabin.company.name}-${index}`}
              listItem={listItem}
              index={index}
              smartMatchEnabled={smartMatchEnabled}
              selectedMatchId={selectedMatchId}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      </LoadingState>
    </div>
  );
};
