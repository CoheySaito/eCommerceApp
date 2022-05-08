import React from 'react';
import { Helmet } from 'react-helmet';

type MetaProps = {
  title: string;
  description: string;
  keywords: string;
};

const Meta: React.FC<Partial<MetaProps>> = ({
  title,
  description,
  keywords,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keyword" content={keywords} />
  </Helmet>
);

Meta.defaultProps = {
  title: 'Welcome To Proshop',
  description: 'We sell the products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics',
};
export default Meta;
