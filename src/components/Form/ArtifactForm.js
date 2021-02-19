import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ArtifactForm = ({ handleSubmit, handleInputChange, artifact }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control
        required
        name="name"
        type="text"
        placeholder="Name your artifact"
        value={artifact.name}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Button
      variant="primary"
      type="submit"
    >
      Submit
    </Button>
  </Form>
)

export default ArtifactForm
