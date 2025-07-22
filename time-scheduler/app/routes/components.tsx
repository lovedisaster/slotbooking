import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Table, type Column } from '../components/ui/Table';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Select, type SelectOption } from '../components/ui/Select';

export default function ComponentsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState<string>('');

  // Sample data for table
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Teacher', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Student', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Admin', status: 'Inactive' },
  ];

  const tableColumns: Column[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'error'} size="sm">
          {value}
        </Badge>
      )
    },
  ];

  // Sample options for select
  const selectOptions: SelectOption[] = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
    { value: 'admin', label: 'Admin' },
    { value: 'parent', label: 'Parent' },
  ];

  const pageStyles = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sectionStyles = {
    marginBottom: '3rem',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '1rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const subtitleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '1.5rem',
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const componentGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  };

  const demoStyles = {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    backgroundColor: '#ffffff',
  };

  return (
    <div style={pageStyles}>
      <h1 style={titleStyles}>UI Components Showcase</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        A comprehensive collection of reusable UI components for the School Time Scheduler application.
      </p>

      {/* Button Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Buttons</h2>
        <div style={componentGridStyles}>
          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Variants</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Sizes</h3>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>States</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Inputs</h2>
        <div style={componentGridStyles}>
          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Basic Inputs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
              />
              <Input
                label="Search"
                type="search"
                placeholder="Search..."
                fullWidth
              />
            </div>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Input States</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Success Input"
                variant="success"
                value="Success value"
                fullWidth
              />
              <Input
                label="Error Input"
                variant="error"
                value="Error value"
                error="This field has an error"
                fullWidth
              />
              <Input
                label="Disabled Input"
                value="Disabled value"
                disabled
                fullWidth
              />
            </div>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Input Sizes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Small Input"
                size="sm"
                placeholder="Small input"
                fullWidth
              />
              <Input
                label="Medium Input"
                size="md"
                placeholder="Medium input"
                fullWidth
              />
              <Input
                label="Large Input"
                size="lg"
                placeholder="Large input"
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>

      {/* Select Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Select Dropdowns</h2>
        <div style={componentGridStyles}>
          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Basic Select</h3>
            <Select
              label="Choose Role"
              options={selectOptions}
              value={selectValue}
              onChange={(value) => setSelectValue(value as string)}
              placeholder="Select a role"
              fullWidth
            />
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Searchable Select</h3>
            <Select
              label="Search Users"
              options={selectOptions}
              placeholder="Search and select..."
              searchable
              fullWidth
            />
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Multiple Select</h3>
            <Select
              label="Select Multiple"
              options={selectOptions}
              placeholder="Select multiple roles"
              multiple
              fullWidth
            />
          </div>
        </div>
      </section>

      {/* Badge Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Badges</h2>
        <div style={componentGridStyles}>
          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Badge Variants</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Badge Sizes</h3>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Badge Styles</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge>Normal</Badge>
              <Badge rounded>Rounded</Badge>
              <Badge dot>With Dot</Badge>
              <Badge rounded dot>Rounded Dot</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Card Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Cards</h2>
        <div style={componentGridStyles}>
          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Basic Card</h3>
            <Card>
              <CardHeader>
                <div>
                  <h3>Card Title</h3>
                  <p>Card subtitle</p>
                </div>
              </CardHeader>
              <CardBody>
                <p>This is the card content. You can put any content here.</p>
              </CardBody>
              <CardFooter>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>

          <div style={demoStyles}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Card Variants</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Card variant="elevated">
                <CardBody>
                  <p>Elevated card with shadow</p>
                </CardBody>
              </Card>
              <Card variant="outlined">
                <CardBody>
                  <p>Outlined card with border</p>
                </CardBody>
              </Card>
              <Card variant="filled">
                <CardBody>
                  <p>Filled card with background</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Tables</h2>
        <div style={demoStyles}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Data Table</h3>
          <Table
            data={tableData}
            columns={tableColumns}
            sortable
            hoverable
            variant="striped"
          />
        </div>
      </section>

      {/* Modal Section */}
      <section style={sectionStyles}>
        <h2 style={subtitleStyles}>Modals</h2>
        <div style={demoStyles}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Modal Demo</h3>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Sample Modal"
            footer={
              <>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p>This is a sample modal content. You can put any content here.</p>
            <p>Modals are great for forms, confirmations, and detailed information.</p>
          </Modal>
        </div>
      </section>
    </div>
  );
} 