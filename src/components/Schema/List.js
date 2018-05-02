import React from 'react'
import PropTypes from 'prop-types'

import withLoading from '../withLoading'

import Icon from '../Icon'
import Downloading from '../Progress/Downloading'

import styles from './list.css'

const SchemaListItem = ({ schema: { uuid, name, version, description }, onClick, getPdf }) => (
  <div className={styles.itemContainer}>
    <div className={styles.item} onClick={onClick(uuid)}>
      <p>{name}</p>
      <div>
        <b>Versión: </b> <label>{version}</label> <br />
        <b>Descripción: </b> <br />
        <label>{description}</label>
      </div>
    </div>
    <div className={styles.getPdf} onClick={getPdf(name, uuid)}>
      descargar pdf
    </div>
  </div>
)

SchemaListItem.propTypes = {
  schema: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired
}

const SchemasList = ({ schemas, schemaDetail, getPdf }) => (
  schemas.map(schema => (
    <SchemaListItem
      key={schema.uuid}
      schema={schema}
      onClick={schemaDetail}
      getPdf={getPdf}
    />
  ))
)

SchemasList.propTypes = {
  schemas: PropTypes.arrayOf(SchemaListItem.propTypes.schema).isRequired,
  schemaDetail: PropTypes.func.isRequired
}

const NoItemsMsg = () => (
  <p className={styles.zeroItemsMsg}>
    ¡Aún no hay esquemas registrados!
  </p>
)

const Schemas = ({ schemas, schemaDetail, addSchema, getPdf, downloading, downloadingFail }) => (
  <div className={styles.container}>
    {schemas.length === 0 && <NoItemsMsg />}
    <div className={styles.items}>
      <SchemasList
        schemas={schemas}
        schemaDetail={schemaDetail}
        getPdf={getPdf}
        downloading={downloading}
        downloadingFail={downloadingFail}
      />
    </div>
    {downloading && <Downloading />}
    <div className={styles.addSchema} onClick={addSchema}>
      <Icon name='plus' width='50px' />
    </div>
  </div>
)

Schemas.propTypes = {
  schemas: PropTypes.arrayOf(SchemaListItem.propTypes.schema).isRequired,
  schemaDetail: PropTypes.func.isRequired,
  addSchema: PropTypes.func.isRequired,
  getPdf: PropTypes.func.isRequired,
  downloading: PropTypes.bool,
  downloadingFail: PropTypes.string
}

export default withLoading(Schemas)
