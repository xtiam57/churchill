import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Sidebar, Title, Wrapper } from 'components';
import { useHymnals } from 'hooks';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { PDFDocument } from './PDFDocument';

export default function ExportPage() {
  const { hymnals, books } = useHymnals();
  const [book, setBook] = useState('Apéndice');

  const handleBookChange = ({ target }) => {
    const { value } = target;
    setBook(value);
  };

  return (
    <Wrapper>
      <Sidebar>
        <Title>Exportar</Title>

        <Form.Control
          size="lg"
          as="select"
          value={book}
          onChange={handleBookChange}
        >
          <option value="ALL">Todos los himnarios</option>
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </Form.Control>

        {hymnals.length && (
          <PDFDownloadLink
            document={<PDFDocument hymnals={hymnals} book={book} />}
            fileName={`${book}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        )}
      </Sidebar>

      <PDFViewer className="w-100 border-0">
        <PDFDocument hymnals={hymnals} book={book} />
      </PDFViewer>
    </Wrapper>
  );
}
