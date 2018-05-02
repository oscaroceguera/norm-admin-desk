import React from 'react'
import PropTypes from 'prop-types'

import withLoading from '../withLoading'

import Icon from '../Icon'
import Loading from '../Progress'

import styles from './list.css'

const SchemaListItem = ({ schema: { uuid, name, version, description }, onClick, getPdf }) => (
  <div>
    <div className={styles.item} onClick={onClick(uuid)}>
      <p>{name}</p>
      <div>
        <b>Versión: </b> <label>{version}</label> <br />
        <b>Descripción: </b> <br />
        <label>{description}</label>
      </div>
    </div>
    <div onClick={getPdf(name, uuid)} style={{ border: '1px solid black', cursor: 'pointer' }}>
      DOWNLOAD PDF
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

// TODO: cmponente loading download
// TODO: componente de error
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
    {downloading && (
      <div
        style={{
          zIndex: 99999,
          background: 'rgba(0,0,0, 0.5)',
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <p style={{color: 'white', fontSize: '1.5em'}}>DESCARGANDO PDF</p>
      </div>
    )}
    <div className={styles.addSchema} onClick={addSchema}>
      <Icon name='plus' width='50px' />
    </div>
  </div>
)

Schemas.propTypes = {
  schemas: PropTypes.arrayOf(SchemaListItem.propTypes.schema).isRequired,
  schemaDetail: PropTypes.func.isRequired,
  addSchema: PropTypes.func.isRequired,
  getPdf: PropTypes.func.isRequired
}

export default withLoading(Schemas)
