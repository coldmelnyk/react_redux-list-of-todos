import { Dispatch, SetStateAction } from 'react';
import { Filter } from '../../App';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';

type Props = {
  filterType: Filter;
  query: string;
  onFilter: Dispatch<SetStateAction<Filter>>;
  onQuery: Dispatch<SetStateAction<string>>;
  onResetQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterType,
  query,
  onFilter,
  onQuery,
  onResetQuery,
}) => {
  const dispatch = useDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={event => {
              onFilter(event.target.value as Filter);
              dispatch(filterSlice.actions.toggleFilter(event.target.value));
            }}
          >
            <option
              onClick={() =>
                dispatch(filterSlice.actions.toggleFilter(Filter.All))
              }
              value={Filter.All}
            >
              All
            </option>
            <option
              onClick={() =>
                dispatch(filterSlice.actions.toggleFilter(Filter.Active))
              }
              value={Filter.Active}
            >
              Active
            </option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={text => {
            onQuery(text.target.value);
            dispatch(filterSlice.actions.settingQuery(text.target.value));
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={onResetQuery}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
