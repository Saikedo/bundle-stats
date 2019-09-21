import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { FiltersDropdown } from '../../ui/filters-dropdown';
import { SortDropdown } from '../../ui/sort-dropdown';
import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';
import { FILTER_CHANGED } from './bundle-packages.constants';
import css from './bundle-packages.module.css';

const RUN_TITLE_CURRENT = 'Current';
const RUN_TITLE_BASELINE = 'Baseline';

const addRunLabel = (run, index, runs) => {
  const internalBuildNumber = get(run, 'meta.internalBuildNumber');

  const name = `Job #${internalBuildNumber || (runs.length - index)}`;
  const label = internalBuildNumber ? (
    <JobName
      title={index === 0 ? RUN_TITLE_CURRENT : RUN_TITLE_BASELINE}
      internalBuildNumber={internalBuildNumber}
    />
  ) : name;

  return {
    ...run,
    name,
    label,
  };
};

export const BundlePackages = (props) => {
  const {
    className,
    runs,
    items,
    updateFilters,
    totalRowCount,
    filters,
    sortItems,
    sort,
    updateSort,
  } = props;

  const labeledRuns = runs.map(addRunLabel);

  return (
    <section className={cx(css.root, className)}>
      <header className={css.header}>
        <SortDropdown
          className={css.dropdown}
          items={sortItems}
          {...sort}
          onChange={updateSort}
        />

        {/* @TODO: get default values from parent state */}
        <FiltersDropdown
          className={css.dropdown}
          filters={{
            [FILTER_CHANGED]: {
              label: 'Changed',
              defaultValue: filters.changed,
              disabled: runs.length <= 1,
            },
          }}
          label={`Filters (${items.length}/${totalRowCount})`}
          onChange={updateFilters}
        />
      </header>
      <main>
        <MetricsTable
          runs={labeledRuns}
          items={items}
        />
      </main>
    </section>
  );
};

BundlePackages.defaultProps = {
  className: '',
  totalRowCount: 0,
};

BundlePackages.propTypes = {
  className: PropTypes.string,
  runs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    runs: PropTypes.arrayOf(PropTypes.shape({
      displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
  })).isRequired,
  updateFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,
  sortItems: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      label: PropTypes.string,
      defaultDirection: PropTypes.bool,
    }),
  }).isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
};