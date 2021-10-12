import React from 'react';
import PropTypes from 'prop-types';
import { getBundleAssetsFileTypeComponentLink } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { Tabs } from '../../ui/tabs';
import { Treemap } from '../../ui/treemap';
import { MetricsTable } from '../metrics-table';
import { ComponentLink } from '../component-link';
import css from './bundle-assets-totals-table.module.css';

const TreemapPanel = ({ jobs, items, customComponentLink: CustomComponentLink }) => {
  const treemapItems = items.map((row) => ({
    id: row.key,
    label: row.label,
    value: row.runs[0].value,
    data: row,
  }));

  return <Treemap data={treemapItems} />;
};

const Table = ({ jobs, items, customComponentLink: CustomComponentLink }) => {
  const renderRowHeader = (item) => {
    const fileType = ASSETS_SIZES_FILE_TYPE_MAP[item.key];
    const { section, title, params } = getBundleAssetsFileTypeComponentLink(fileType, item.label);

    return (
      <CustomComponentLink section={section} title={title} params={params}>
        {item.label}
      </CustomComponentLink>
    );
  };

  return <MetricsTable runs={jobs} items={items} renderRowHeader={renderRowHeader} showHeaderSum />;
};

export const BundleAssetsTotalsTable = ({ className, jobs, customComponentLink }) => {
  const items = webpack.compareBySection.sizes(jobs);

  return (
    <div className={className}>
      <Tabs>
        <button className={css.tabItem}>Chart</button>
        <button className={css.tabItem}>Table</button>
      </Tabs>
      <TreemapPanel items={items} customComponentLink={customComponentLink} />
      <Table jobs={jobs} items={items} customComponentLink={customComponentLink} />
    </div>
  )
};

BundleAssetsTotalsTable.defaultProps = {
  className: '',
  jobs: [],
  customComponentLink: ComponentLink,
};

BundleAssetsTotalsTable.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  customComponentLink: PropTypes.elementType,
};
