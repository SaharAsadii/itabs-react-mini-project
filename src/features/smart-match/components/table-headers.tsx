import { MAIN_HEADERS, COLUMN_HEADERS } from "../smart-match.constants";

export const TableHeaders = () => {
  return (
    <>
      <div className="grid-table header-level-1">
        {MAIN_HEADERS.map((header, index) => {
          const IconComponent = header.icon;
          return (
            <div key={index} className={header.colspan}>
              <IconComponent size={24} color="#000" variant="Bold" />
              <span>{header.title}</span>
            </div>
          );
        })}
      </div>

      <div className="grid-table header-level-2">
        {COLUMN_HEADERS.map((header, index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
    </>
  );
};
