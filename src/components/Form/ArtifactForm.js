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
    <Form.Group controlId="category">
      <Form.Label>Category</Form.Label>
      <Form.Control
        required
        name="category"
        as="select"
        value={artifact.category}
        onChange={handleInputChange}
      >
        <option value="1">Armor</option>
        <option value="2">Potion</option>
        <option value="3">Ring</option>
        <option value="4">Rod</option>
        <option value="5">Scroll</option>
        <option value="6">Staff</option>
        <option value="7">Wand</option>
        <option value="8">Weapon</option>
        <option value="9">Wondrous Item</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="rarity">
      <Form.Label>Rarity</Form.Label>
      <Form.Control
        required
        name="rarity"
        as="select"
        value={artifact.rarity}
        onChange={handleInputChange}
      >
        <option value="1">Common</option>
        <option value="2">Uncommon</option>
        <option value="3">Rare</option>
        <option value="4">Very Rare</option>
        <option value="5">Legendary</option>
        <option value="6">Artifact</option>
        <option value="7">Unknown Rarity</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="attunement">
      <Form.Check
        type="checkbox"
        name="attunement"
        label="Requires Attunement"
        value={artifact.attunement}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        required
        name="description"
        as="textarea"
        rows={3}
        placeholder="Artifact Description"
        value={artifact.description}
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
